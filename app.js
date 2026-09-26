/**
 * Bíblia pra você — Controlador Principal em JavaScript Puro (Vanilla JS)
 * Gerencia paginação do Códice, animação 3D realista de virar páginas,
 * áudio sintético de papel, planos de leitura, destaques, notas de margem e busca.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "codex_lumina_state_v1";
  const VERSES_PER_PAGE = 6;

  // Estado persistente da aplicação
  const defaultState = {
    currentView: "reader",
    bookId: "genesis",
    chapter: 1,
    spreadIndex: 0,
    spreadMode: "spread", // 'spread' (2 páginas) ou 'single' (1 página)
    theme: "paper", // 'paper' | 'sepia' | 'dark'
    fontSizeScale: 0, // -2 a +3
    soundEnabled: true,
    activePlanId: "aliancas-redencao",
    selectedPlanDetailId: "aliancas-redencao",
    completedPlanDays: {
      "aliancas-redencao": [1],
      "saltos-sabedoria": [],
      "ensinamentos-cristo": []
    },
    planReflections: {}, // { "planId:day": "texto da meditação" }
    customPlans: [],
    highlights: {
      "genesis:1:1": "hl-amber",
      "genesis:1:3": "hl-rubric",
      "salmos:23:1": "hl-olive",
      "joao:1:1": "hl-amber"
    },
    notes: {
      "genesis:1:1": "A criação começa com a soberania da Palavra de Deus ordenando o caos.",
      "salmos:23:1": "Confiança diária na provisão e no cuidado pastoral do Senhor."
    },
    bookmarks: ["genesis:1", "salmos:23"],
    selectedVerseKey: null,
    notesFilter: "all",
    streakDays: 3
  };

  let state = loadState();
  let isAnimatingTurn = false;
  let audioCtx = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(defaultState);
      const parsed = JSON.parse(raw);
      return Object.assign({}, structuredClone(defaultState), parsed);
    } catch (_e) {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_e) {
      // Ignorar caso armazenamento local esteja restrito
    }
  }

  // =========================================================================
  // SINTETIZADOR DE SOM DE VIRAR PÁGINA DE PAPEL (Web Audio API Puro)
  // =========================================================================
  function playPageTurnSound() {
    if (!state.soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const duration = 0.22;
      const sampleRate = audioCtx.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        const envelope = Math.sin(t * Math.PI) * Math.pow(1 - t, 1.4);
        data[i] = (Math.random() * 2 - 1) * envelope * 0.08;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1100, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(650, audioCtx.currentTime + duration);
      filter.Q.value = 1.6;

      noise.connect(filter);
      filter.connect(audioCtx.destination);
      noise.start();
    } catch (_err) {
      // Silencioso caso o navegador bloqueie áudio
    }
  }

  // =========================================================================
  // HELPERS DO CORPUS BÍBLICO E PLANOS
  // =========================================================================
  function getAllPlans() {
    return [...window.DEFAULT_READING_PLANS, ...(state.customPlans || [])];
  }

  function getBook(bookId) {
    return window.BIBLE_BOOKS.find((b) => b.id === bookId) || window.BIBLE_BOOKS[0];
  }

  function getChapterNumbers(book) {
    return Object.keys(book.chapters).map(Number).sort((a, b) => a - b);
  }

  function getChapterData(bookId, chapterNum) {
    const book = getBook(bookId);
    const chNums = getChapterNumbers(book);
    const validCh = book.chapters[chapterNum] ? chapterNum : chNums[0];
    return {
      book,
      chapterNum: validCh,
      data: book.chapters[validCh]
    };
  }

  // Determina se o Códice deve operar em modo de 1 página (Celular, Tablet Retrato ou opção manual)
  function isEffectiveSinglePage() {
    return window.innerWidth <= 860 || state.spreadMode === "single";
  }

  // Divide os versículos do capítulo em páginas calibradas para o Códice
  function paginateChapter(bookId, chapterNum) {
    const { book, chapterNum: validCh, data } = getChapterData(bookId, chapterNum);
    const verses = data.verses || [];
    const pages = [];

    for (let i = 0; i < verses.length; i += VERSES_PER_PAGE) {
      const slice = verses.slice(i, i + VERSES_PER_PAGE).map((text, idx) => ({
        verseNumber: i + idx + 1,
        text
      }));
      const startVerse = slice[0].verseNumber;
      const endVerse = slice[slice.length - 1].verseNumber;

      const pageMarginalia = (data.marginalia || []).filter(
        (m) => m.verse >= startVerse && m.verse <= endVerse
      );

      pages.push({
        book,
        chapterNum: validCh,
        chapterTitle: data.title,
        chapterSubtitle: data.subtitle,
        isFirstPageOfChapter: i === 0,
        pageNumberInChapter: pages.length + 1,
        verses: slice,
        marginalia: pageMarginalia
      });
    }

    // Caso o número de páginas seja ímpar no modo Livro Aberto (2 páginas),
    // adiciona uma folha de colofão/meditação litúrgica no verso direito
    if (!isEffectiveSinglePage() && pages.length % 2 !== 0) {
      pages.push({
        book,
        chapterNum: validCh,
        chapterTitle: data.title,
        chapterSubtitle: data.subtitle,
        isColophonPage: true,
        pageNumberInChapter: pages.length + 1,
        verses: [],
        marginalia: data.marginalia || []
      });
    }

    return pages;
  }

  function getTotalSpreads(pages) {
    if (isEffectiveSinglePage()) return pages.length;
    return Math.ceil(pages.length / 2);
  }

  // Localiza capítulo seguinte ou anterior no cânon disponível
  function getAdjacentChapterTarget(direction) {
    const books = window.BIBLE_BOOKS;
    const currentBookIdx = books.findIndex((b) => b.id === state.bookId);
    if (currentBookIdx === -1) return null;

    const currentBook = books[currentBookIdx];
    const chNums = getChapterNumbers(currentBook);
    const currentChIdx = chNums.indexOf(Number(state.chapter));

    if (direction === "next") {
      if (currentChIdx < chNums.length - 1) {
        return { bookId: currentBook.id, chapter: chNums[currentChIdx + 1], spreadIndex: 0 };
      }
      if (currentBookIdx < books.length - 1) {
        const nextBook = books[currentBookIdx + 1];
        const nextChNums = getChapterNumbers(nextBook);
        return { bookId: nextBook.id, chapter: nextChNums[0], spreadIndex: 0 };
      }
      return null;
    } else {
      if (currentChIdx > 0) {
        const prevCh = chNums[currentChIdx - 1];
        const prevPages = paginateChapter(currentBook.id, prevCh);
        return {
          bookId: currentBook.id,
          chapter: prevCh,
          spreadIndex: Math.max(0, getTotalSpreads(prevPages) - 1)
        };
      }
      if (currentBookIdx > 0) {
        const prevBook = books[currentBookIdx - 1];
        const prevChNums = getChapterNumbers(prevBook);
        const lastCh = prevChNums[prevChNums.length - 1];
        const prevPages = paginateChapter(prevBook.id, lastCh);
        return {
          bookId: prevBook.id,
          chapter: lastCh,
          spreadIndex: Math.max(0, getTotalSpreads(prevPages) - 1)
        };
      }
      return null;
    }
  }

  // =========================================================================
  // RENDERIZAÇÃO DE UMA FOLHA DO CÓDICE
  // =========================================================================
  function renderBookPageHTML(pageObj, side, totalPagesInChapter) {
    if (!pageObj) {
      return `<div class="page-running-header"><span>Bíblia pra você</span><span>Folha em Branco</span></div>`;
    }

    const { book, chapterNum, chapterTitle, chapterSubtitle, isFirstPageOfChapter, isColophonPage, pageNumberInChapter, verses, marginalia } = pageObj;

    const headerHTML = `
      <header class="page-running-header">
        <span>${book.testament} · ${book.category}</span>
        <span class="tabular-nums">${book.name} ${chapterNum}</span>
      </header>
    `;

    if (isColophonPage) {
      const allMarginaliaHTML = (marginalia || [])
        .map(
          (m) => `
          <div class="marginalia-entry">
            <strong>v.${m.verse} · ${m.title}:</strong> ${m.note}
            <span class="marginalia-ref">(${m.ref})</span>
          </div>
        `
        )
        .join("");

      return `
        <div>
          ${headerHTML}
          <div class="chapter-heading-block">
            <div class="chapter-kicker">Síntese &amp; Marginalia do Capítulo</div>
            <h3 class="chapter-main-title" style="font-size: 1.5rem;">${book.name} ${chapterNum} — ${chapterTitle}</h3>
            <p class="chapter-subtitle">${book.introduction}</p>
          </div>
          <div class="page-marginalia" style="border-top: none; margin-top: 0.5rem;">
            ${allMarginaliaHTML || `<p class="marginalia-entry">Medite em silêncio sobre as palavras lidas neste capítulo antes de virar para o próximo texto bíblico.</p>`}
          </div>
        </div>
        <footer class="page-footer-bar">
          <span>Notas de Estudo &amp; Referências Cruzadas</span>
          <span class="tabular-nums">Folha ${pageNumberInChapter} de ${totalPagesInChapter}</span>
        </footer>
      `;
    }

    const chapterHeadingHTML = isFirstPageOfChapter
      ? `
        <div class="chapter-heading-block">
          <div class="chapter-kicker">CAPÍTULO ${chapterNum} · ${book.abbrev.toUpperCase()}</div>
          <h2 class="chapter-main-title">${chapterTitle}</h2>
          <p class="chapter-subtitle">${chapterSubtitle}</p>
        </div>
      `
      : "";

    const versesHTML = verses
      .map((v) => {
        const verseKey = `${book.id}:${chapterNum}:${v.verseNumber}`;
        const hlClass = state.highlights[verseKey] || "";
        const hasNote = Boolean(state.notes[verseKey]);
        const firstVerseClass = v.verseNumber === 1 ? "is-first-verse" : "";

        return `
          <div class="verse-item ${firstVerseClass} ${hlClass}" data-verse-key="${verseKey}" data-verse-num="${v.verseNumber}">
            <span class="verse-num tabular-nums">${v.verseNumber}</span>
            <span class="verse-text">${escapeHTML(v.text)}</span>
            ${hasNote ? `<span class="verse-note-indicator" title="${escapeHTML(state.notes[verseKey])}">[Nota]</span>` : ""}
          </div>
        `;
      })
      .join("");

    const marginaliaHTML =
      marginalia && marginalia.length > 0
        ? `
        <aside class="page-marginalia" aria-label="Notas de Margem">
          ${marginalia
            .map(
              (m) => `
              <div class="marginalia-entry">
                <strong>v.${m.verse} ${m.title}:</strong> ${m.note}
                <span class="marginalia-ref">${m.ref}</span>
              </div>
            `
            )
            .join("")}
        </aside>
      `
        : "";

    const cornerHTML =
      side === "both"
        ? `
          <div class="page-corner-Zone page-corner-left" data-turn-action="prev" title="Virar para a página anterior"></div>
          <div class="page-corner-Zone page-corner-right" data-turn-action="next" title="Virar para a próxima página"></div>
        `
        : side === "left"
          ? `<div class="page-corner-Zone page-corner-left" data-turn-action="prev" title="Virar para a página anterior"></div>`
          : `<div class="page-corner-Zone page-corner-right" data-turn-action="next" title="Virar para a próxima página"></div>`;

    const footerHint =
      window.innerWidth <= 860
        ? "Toque num versículo para destacar · Deslize para virar"
        : "Clique em qualquer versículo para destacar ou anotar";

    return `
      <div>
        ${headerHTML}
        ${chapterHeadingHTML}
        <div class="verses-flow">
          ${versesHTML}
        </div>
        ${marginaliaHTML}
      </div>
      <footer class="page-footer-bar">
        <span>${footerHint}</span>
        <span class="tabular-nums">Folha ${pageNumberInChapter} de ${totalPagesInChapter}</span>
      </footer>
      ${cornerHTML}
    `;
  }

  // =========================================================================
  // RENDERIZAÇÃO DO CÓDICE E ANIMAÇÃO 3D DE VIRAR PÁGINA
  // =========================================================================
  function getSpreadPagesForState(bookId, chapter, spreadIndex) {
    const pages = paginateChapter(bookId, chapter);
    const totalSpreads = getTotalSpreads(pages);
    const clampedSpread = Math.min(Math.max(0, spreadIndex), Math.max(0, totalSpreads - 1));

    if (isEffectiveSinglePage()) {
      return {
        pages,
        totalSpreads,
        spreadIndex: clampedSpread,
        leftPage: pages[clampedSpread],
        rightPage: null
      };
    }

    return {
      pages,
      totalSpreads,
      spreadIndex: clampedSpread,
      leftPage: pages[clampedSpread * 2],
      rightPage: pages[clampedSpread * 2 + 1]
    };
  }

  function renderCodexStatic() {
    const codexSpreadEl = document.getElementById("codexSpread");
    const pageLeftEl = document.getElementById("pageLeftContent");
    const pageRightEl = document.getElementById("pageRightContent");
    const singleActive = isEffectiveSinglePage();

    codexSpreadEl.classList.toggle("single-page-mode", singleActive);

    const { pages, totalSpreads, spreadIndex, leftPage, rightPage } = getSpreadPagesForState(
      state.bookId,
      state.chapter,
      state.spreadIndex
    );
    state.spreadIndex = spreadIndex;

    pageLeftEl.innerHTML = renderBookPageHTML(
      leftPage,
      singleActive ? "both" : "left",
      pages.length
    );
    if (!singleActive) {
      pageRightEl.innerHTML = renderBookPageHTML(rightPage, "right", pages.length);
    } else {
      pageRightEl.innerHTML = "";
    }

    updateReaderChrome(pages, totalSpreads, spreadIndex);
    bindPageInteractions();
  }

  function turnPageWith3DAnimation(direction) {
    if (isAnimatingTurn) return;

    const singleActive = isEffectiveSinglePage();
    const currentSpreadInfo = getSpreadPagesForState(state.bookId, state.chapter, state.spreadIndex);
    let targetState = null;

    if (direction === "next") {
      if (state.spreadIndex < currentSpreadInfo.totalSpreads - 1) {
        targetState = {
          bookId: state.bookId,
          chapter: state.chapter,
          spreadIndex: state.spreadIndex + 1
        };
      } else {
        targetState = getAdjacentChapterTarget("next");
      }
    } else {
      if (state.spreadIndex > 0) {
        targetState = {
          bookId: state.bookId,
          chapter: state.chapter,
          spreadIndex: state.spreadIndex - 1
        };
      } else {
        targetState = getAdjacentChapterTarget("prev");
      }
    }

    if (!targetState) return;

    const nextSpreadInfo = getSpreadPagesForState(
      targetState.bookId,
      targetState.chapter,
      targetState.spreadIndex
    );

    const turningLeaf = document.getElementById("turningLeaf");
    const leafFront = document.getElementById("leafFrontContent");
    const leafBack = document.getElementById("leafBackContent");
    const pageLeftEl = document.getElementById("pageLeftContent");
    const pageRightEl = document.getElementById("pageRightContent");

    isAnimatingTurn = true;
    playPageTurnSound();

    turningLeaf.classList.remove(
      "is-turning-next",
      "is-turning-prev",
      "is-turning-next-single",
      "is-turning-prev-single"
    );

    if (singleActive) {
      // Animação 3D calibrada para 1 Página (Celular, Tablet Retrato ou 1 Página Desktop)
      if (direction === "next") {
        leafFront.innerHTML = renderBookPageHTML(
          currentSpreadInfo.leftPage,
          "both",
          currentSpreadInfo.pages.length
        );
        leafBack.innerHTML = "";
        pageLeftEl.innerHTML = renderBookPageHTML(
          nextSpreadInfo.leftPage,
          "both",
          nextSpreadInfo.pages.length
        );
        turningLeaf.classList.add("is-turning-next-single");
      } else {
        leafFront.innerHTML = renderBookPageHTML(
          nextSpreadInfo.leftPage,
          "both",
          nextSpreadInfo.pages.length
        );
        leafBack.innerHTML = "";
        turningLeaf.classList.add("is-turning-prev-single");
      }
    } else {
      // Animação 3D de Livro Aberto (2 Páginas em Desktop e Tablet Paisagem)
      if (direction === "next") {
        leafFront.innerHTML = renderBookPageHTML(
          currentSpreadInfo.rightPage,
          "right",
          currentSpreadInfo.pages.length
        );
        leafBack.innerHTML = renderBookPageHTML(
          nextSpreadInfo.leftPage,
          "left",
          nextSpreadInfo.pages.length
        );
        pageRightEl.innerHTML = renderBookPageHTML(
          nextSpreadInfo.rightPage,
          "right",
          nextSpreadInfo.pages.length
        );
        turningLeaf.classList.add("is-turning-next");
      } else {
        leafBack.innerHTML = renderBookPageHTML(
          currentSpreadInfo.leftPage,
          "left",
          currentSpreadInfo.pages.length
        );
        leafFront.innerHTML = renderBookPageHTML(
          nextSpreadInfo.rightPage,
          "right",
          nextSpreadInfo.pages.length
        );
        pageLeftEl.innerHTML = renderBookPageHTML(
          nextSpreadInfo.leftPage,
          "left",
          nextSpreadInfo.pages.length
        );
        turningLeaf.classList.add("is-turning-prev");
      }
    }

    const animDuration = singleActive ? 620 : 680;
    setTimeout(() => {
      state.bookId = targetState.bookId;
      state.chapter = targetState.chapter;
      state.spreadIndex = targetState.spreadIndex;
      saveState();

      turningLeaf.classList.remove(
        "is-turning-next",
        "is-turning-prev",
        "is-turning-next-single",
        "is-turning-prev-single"
      );
      renderSelectors();
      renderCodexStatic();
      renderActivePlanBanner();
      isAnimatingTurn = false;
    }, animDuration);
  }

  function updateReaderChrome(pages, totalSpreads, spreadIndex) {
    const { book, chapterNum } = getChapterData(state.bookId, state.chapter);
    const singleActive = isEffectiveSinglePage();

    document.getElementById("metaTestament").textContent = book.testament;
    document.getElementById("metaCategory").textContent = book.category;

    // Atualiza Fita Marcadora
    const bookmarkKey = `${book.id}:${chapterNum}`;
    const ribbonBtn = document.getElementById("codexRibbonBtn");
    const isBookmarked = state.bookmarks.includes(bookmarkKey);
    ribbonBtn.classList.toggle("bookmarked", isBookmarked);
    ribbonBtn.title = isBookmarked
      ? `Capítulo marcado (${book.name} ${chapterNum}) — Clique para remover`
      : `Marcar ${book.name} ${chapterNum} com a fita litúrgica`;

    // Atualiza barra de paginação inferior adaptada ao dispositivo
    const paginationLabel = document.getElementById("spreadPaginationLabel");
    const isTouchViewport = window.innerWidth <= 860;
    if (singleActive) {
      const gestureHint = isTouchViewport ? "Deslize para folhear" : "Use ← → para virar";
      paginationLabel.textContent = `${book.name} ${chapterNum} · Folha ${spreadIndex + 1} de ${pages.length} · ${gestureHint}`;
    } else {
      const leftNum = spreadIndex * 2 + 1;
      const rightNum = Math.min(spreadIndex * 2 + 2, pages.length);
      paginationLabel.textContent = `${book.name} ${chapterNum} · Folhas ${leftNum}–${rightNum} de ${pages.length} · Use ← → para folhear`;
    }

    const progressPercent = Math.round(((spreadIndex + 1) / Math.max(1, totalSpreads)) * 100);
    document.getElementById("chapterProgressFill").style.width = `${progressPercent}%`;

    const hasPrev = spreadIndex > 0 || Boolean(getAdjacentChapterTarget("prev"));
    const hasNext = spreadIndex < totalSpreads - 1 || Boolean(getAdjacentChapterTarget("next"));
    document.getElementById("prevPageBtn").disabled = !hasPrev;
    document.getElementById("nextPageBtn").disabled = !hasNext;
  }

  function bindPageInteractions() {
    // Clique em versículos para abrir o inspetor de destaque e nota
    document.querySelectorAll("#codexSpread .verse-item").forEach((el) => {
      el.addEventListener("click", () => {
        const verseKey = el.getAttribute("data-verse-key");
        openVerseInspector(verseKey);
      });
    });

    // Clique nos cantos de página para virar com animação 3D
    document.querySelectorAll("#codexSpread [data-turn-action]").forEach((corner) => {
      corner.addEventListener("click", (e) => {
        e.stopPropagation();
        const dir = corner.getAttribute("data-turn-action");
        turnPageWith3DAnimation(dir);
      });
    });
  }

  // =========================================================================
  // INSPETOR DE VERSÍCULOS (Destaques em 4 Cores e Notas de Margem)
  // =========================================================================
  function openVerseInspector(verseKey) {
    state.selectedVerseKey = verseKey;
    const [bookId, chStr, vStr] = verseKey.split(":");
    const { book, data } = getChapterData(bookId, Number(chStr));
    const verseText = (data.verses || [])[Number(vStr) - 1] || "";

    document.getElementById("inspectorVerseRef").textContent = `${book.name} ${chStr}:${vStr}`;
    document.getElementById("inspectorVersePreview").textContent = `"${verseText}"`;
    document.getElementById("inspectorNoteInput").value = state.notes[verseKey] || "";

    const bar = document.getElementById("verseInspectorBar");
    bar.classList.add("open");
  }

  function closeVerseInspector() {
    state.selectedVerseKey = null;
    document.getElementById("verseInspectorBar").classList.remove("open");
  }

  // =========================================================================
  // BANNER DO PLANO DE LEITURA ATIVO E PAINEL DE PLANOS
  // =========================================================================
  function getActivePlan() {
    const allPlans = getAllPlans();
    return allPlans.find((p) => p.id === state.activePlanId) || allPlans[0];
  }

  function getNextUncompletedDay(plan) {
    const completed = state.completedPlanDays[plan.id] || [];
    for (const r of plan.readings) {
      if (!completed.includes(r.day)) return r;
    }
    return plan.readings[plan.readings.length - 1];
  }

  function renderActivePlanBanner() {
    const plan = getActivePlan();
    const completed = state.completedPlanDays[plan.id] || [];
    const currentReading = getNextUncompletedDay(plan);
    const total = plan.readings.length;
    const pct = Math.round((completed.length / Math.max(1, total)) * 100);
    const book = getBook(currentReading.bookId);

    document.getElementById("bannerPlanKicker").textContent =
      `Plano Ativo: ${plan.title} · Dia ${currentReading.day} de ${total}`;
    document.getElementById("bannerPlanTitle").textContent =
      `${book.name} ${currentReading.chapter} — ${currentReading.title}`;
    document.getElementById("bannerPlanProgressText").textContent =
      `${completed.length}/${total} leituras (${pct}%)`;

    const isDone = completed.includes(currentReading.day);
    const completeBtn = document.getElementById("bannerCompleteDayBtn");
    completeBtn.textContent = isDone
      ? `Dia ${currentReading.day} Concluído ✓`
      : `Concluir Leitura do Dia ${currentReading.day} ✓`;
  }

  function renderPlansView() {
    const allPlans = getAllPlans();
    const catalogEl = document.getElementById("plansCatalogList");
    const detailEl = document.getElementById("planDetailPane");

    // Calcula estatísticas globais
    let totalCompletedReadings = 0;
    Object.values(state.completedPlanDays).forEach((arr) => {
      if (Array.isArray(arr)) totalCompletedReadings += arr.length;
    });
    document.getElementById("globalPlanStats").textContent =
      `Leituras Concluídas: ${totalCompletedReadings} · Sequência Atual: ${state.streakDays} dias`;

    catalogEl.innerHTML = allPlans
      .map((plan) => {
        const completed = state.completedPlanDays[plan.id] || [];
        const pct = Math.round((completed.length / Math.max(1, plan.readings.length)) * 100);
        const isSelected = plan.id === state.selectedPlanDetailId;
        const isActive = plan.id === state.activePlanId;

        return `
          <article class="plan-card ${isSelected ? "selected" : ""}" data-plan-id="${plan.id}">
            <div class="metadata-inline">
              <span>${escapeHTML(plan.category)}</span>
              <span aria-hidden="true">·</span>
              <span class="tabular-nums">${escapeHTML(plan.durationLabel)}</span>
              <span aria-hidden="true">·</span>
              <span>${isActive ? "Plano Ativo" : `${pct}% concluído`}</span>
            </div>
            <h3 class="plan-card-title">${escapeHTML(plan.title)}</h3>
            <p class="plan-card-desc">${escapeHTML(plan.description)}</p>
            <div class="progress-track" style="width: 100%;">
              <div class="progress-fill" style="width: ${pct}%;"></div>
            </div>
          </article>
        `;
      })
      .join("");

    catalogEl.querySelectorAll(".plan-card").forEach((card) => {
      card.addEventListener("click", () => {
        state.selectedPlanDetailId = card.getAttribute("data-plan-id");
        saveState();
        renderPlansView();
      });
    });

    const selectedPlan =
      allPlans.find((p) => p.id === state.selectedPlanDetailId) || allPlans[0];
    const completedDays = state.completedPlanDays[selectedPlan.id] || [];
    const pctSelected = Math.round(
      (completedDays.length / Math.max(1, selectedPlan.readings.length)) * 100
    );

    const daysHTML = selectedPlan.readings
      .map((r) => {
        const book = getBook(r.bookId);
        const isDayDone = completedDays.includes(r.day);
        const reflectionKey = `${selectedPlan.id}:${r.day}`;
        const savedReflection = state.planReflections[reflectionKey] || "";

        return `
          <div class="reading-day-row">
            <button
              type="button"
              class="day-check-btn ${isDayDone ? "completed" : ""}"
              data-toggle-plan="${selectedPlan.id}"
              data-toggle-day="${r.day}"
              title="Marcar ou desmarcar leitura do Dia ${r.day}"
            >
              ${isDayDone ? "✓" : r.day}
            </button>
            <div>
              <div class="metadata-inline">
                <span class="tabular-nums">Dia ${r.day}</span>
                <span aria-hidden="true">·</span>
                <span>${book.name} ${r.chapter}</span>
              </div>
              <h4 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; margin: 0.15rem 0;">
                ${escapeHTML(r.title)}
              </h4>
              <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                ${escapeHTML(r.meditation)}
              </p>
              <div style="display: flex; gap: 0.5rem;">
                <input
                  type="text"
                  class="inspector-input"
                  style="font-size: 0.8rem; padding: 0.35rem 0.65rem;"
                  placeholder="Anotar meditação do Dia ${r.day}..."
                  value="${escapeHTML(savedReflection)}"
                  data-reflection-input="${reflectionKey}"
                />
              </div>
            </div>
            <button
              type="button"
              class="btn-secondary-quiet"
              data-open-passage-book="${r.bookId}"
              data-open-passage-ch="${r.chapter}"
              data-activate-plan="${selectedPlan.id}"
            >
              Abrir no Códice →
            </button>
          </div>
        `;
      })
      .join("");

    detailEl.innerHTML = `
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-hairline); margin-bottom: 1rem; flex-wrap: wrap;">
        <div>
          <div class="editorial-kicker">${escapeHTML(selectedPlan.category)} · ${escapeHTML(selectedPlan.dailyMinutes)}</div>
          <h2 class="chapter-main-title">${escapeHTML(selectedPlan.title)}</h2>
          <p style="font-size: 0.92rem; color: var(--text-secondary); margin-top: 0.35rem; max-width: 62ch;">
            ${escapeHTML(selectedPlan.description)}
          </p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
          <span class="metadata-inline tabular-nums">${completedDays.length} de ${selectedPlan.readings.length} dias (${pctSelected}%)</span>
          ${
            state.activePlanId === selectedPlan.id
              ? `<span class="btn-secondary-quiet" style="border-color: var(--accent-rubric); color: var(--accent-rubric);">Plano Ativo no Leitor</span>`
              : `<button type="button" class="btn-primary-rubric" id="setPlanActiveBtn">Tornar Este Plano Ativo</button>`
          }
        </div>
      </div>
      <div>
        ${daysHTML}
      </div>
    `;

    const setPlanActiveBtn = document.getElementById("setPlanActiveBtn");
    if (setPlanActiveBtn) {
      setPlanActiveBtn.addEventListener("click", () => {
        state.activePlanId = selectedPlan.id;
        saveState();
        renderActivePlanBanner();
        renderPlansView();
      });
    }

    detailEl.querySelectorAll("[data-toggle-day]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const planId = btn.getAttribute("data-toggle-plan");
        const dayNum = Number(btn.getAttribute("data-toggle-day"));
        togglePlanDayCompletion(planId, dayNum);
      });
    });

    detailEl.querySelectorAll("[data-open-passage-book]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bookId = btn.getAttribute("data-open-passage-book");
        const ch = Number(btn.getAttribute("data-open-passage-ch"));
        const planId = btn.getAttribute("data-activate-plan");
        state.activePlanId = planId;
        navigateToPassage(bookId, ch);
      });
    });

    detailEl.querySelectorAll("[data-reflection-input]").forEach((input) => {
      input.addEventListener("change", () => {
        const key = input.getAttribute("data-reflection-input");
        state.planReflections[key] = input.value.trim();
        saveState();
      });
    });
  }

  function togglePlanDayCompletion(planId, dayNum) {
    if (!state.completedPlanDays[planId]) {
      state.completedPlanDays[planId] = [];
    }
    const list = state.completedPlanDays[planId];
    const idx = list.indexOf(dayNum);
    if (idx === -1) {
      list.push(dayNum);
      state.streakDays = (state.streakDays || 1) + 1;
    } else {
      list.splice(idx, 1);
    }
    saveState();
    renderActivePlanBanner();
    renderPlansView();
  }

  // =========================================================================
  // MARCADORES, DESTAQUES E NOTAS DE ESTUDO
  // =========================================================================
  function renderNotesArchiveView() {
    const container = document.getElementById("notesArchiveContainer");
    const items = [];

    // Fitas marcadoras de capítulos
    if (state.notesFilter === "all" || state.notesFilter === "bookmarks") {
      state.bookmarks.forEach((bmKey) => {
        const [bookId, chStr] = bmKey.split(":");
        const { book, chapterNum, data } = getChapterData(bookId, Number(chStr));
        items.push({
          type: "bookmark",
          bookId,
          chapter: chapterNum,
          title: `${book.name} ${chapterNum} — ${data.title}`,
          kicker: "Fita Marcadora de Capítulo",
          text: data.subtitle,
          note: null,
          key: bmKey
        });
      });
    }

    // Versículos destacados ou anotados
    const verseKeys = new Set([
      ...Object.keys(state.highlights),
      ...Object.keys(state.notes)
    ]);

    verseKeys.forEach((vKey) => {
      const hasNote = Boolean(state.notes[vKey]);
      if (state.notesFilter === "bookmarks") return;
      if (state.notesFilter === "notes" && !hasNote) return;

      const [bookId, chStr, vStr] = vKey.split(":");
      const { book, chapterNum, data } = getChapterData(bookId, Number(chStr));
      const verseText = (data.verses || [])[Number(vStr) - 1] || "";

      items.push({
        type: "verse",
        bookId,
        chapter: chapterNum,
        verse: Number(vStr),
        title: `${book.name} ${chapterNum}:${vStr}`,
        kicker: hasNote ? "Nota de Margem & Destaque" : "Versículo Destacado",
        text: `"${verseText}"`,
        note: state.notes[vKey] || null,
        key: vKey
      });
    });

    if (items.length === 0) {
      container.innerHTML = `
        <div class="archive-entry-card">
          <div class="editorial-kicker">Scriptorium Vazio</div>
          <h3 class="plan-card-title">Nenhum registro encontrado neste filtro</h3>
          <p class="plan-card-desc">
            Durante a leitura no Códice, clique em qualquer versículo para sublinhar com cores litúrgicas ou escrever uma nota de margem.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
        <article class="archive-entry-card">
          <div class="metadata-inline">
            <span>${escapeHTML(item.kicker)}</span>
          </div>
          <h3 class="plan-card-title" style="margin: 0;">${escapeHTML(item.title)}</h3>
          <p style="font-size: 0.94rem; line-height: 1.6; color: var(--text-primary);">
            ${escapeHTML(item.text)}
          </p>
          ${
            item.note
              ? `<p style="font-size: 0.85rem; padding: 0.6rem 0.75rem; background-color: var(--bg-elevated); border-left: 2px solid var(--accent-gold); color: var(--text-secondary);">
                  <strong>Nota Pessoal:</strong> ${escapeHTML(item.note)}
                </p>`
              : ""
          }
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 0.5rem;">
            <button
              type="button"
              class="btn-secondary-quiet"
              data-jump-book="${item.bookId}"
              data-jump-ch="${item.chapter}"
            >
              Abrir Passagem →
            </button>
            <button
              type="button"
              class="btn-secondary-quiet"
              data-delete-entry-type="${item.type}"
              data-delete-entry-key="${item.key}"
            >
              Remover
            </button>
          </div>
        </article>
      `
      )
      .join("");

    container.querySelectorAll("[data-jump-book]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigateToPassage(
          btn.getAttribute("data-jump-book"),
          Number(btn.getAttribute("data-jump-ch"))
        );
      });
    });

    container.querySelectorAll("[data-delete-entry-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-delete-entry-type");
        const key = btn.getAttribute("data-delete-entry-key");
        if (type === "bookmark") {
          state.bookmarks = state.bookmarks.filter((k) => k !== key);
        } else {
          delete state.highlights[key];
          delete state.notes[key];
        }
        saveState();
        renderNotesArchiveView();
        renderCodexStatic();
      });
    });
  }

  // =========================================================================
  // BUSCA BÍBLICA (CONCORDÂNCIA INSTANTÂNEA)
  // =========================================================================
  function executeBibleSearch(rawQuery) {
    const query = (rawQuery || "").trim().toLowerCase();
    const resultsContainer = document.getElementById("searchResultsContainer");
    const countLabel = document.getElementById("searchCountLabel");

    if (!query) {
      countLabel.textContent = "Mostrando passagens fundamentais das Escrituras";
    }

    const matches = [];
    window.BIBLE_BOOKS.forEach((book) => {
      Object.entries(book.chapters).forEach(([chKey, chData]) => {
        (chData.verses || []).forEach((verseText, idx) => {
          const haystack = `${book.name} ${chData.title} ${verseText}`.toLowerCase();
          if (!query || haystack.includes(query)) {
            matches.push({
              book,
              chapter: Number(chKey),
              verseNumber: idx + 1,
              chapterTitle: chData.title,
              text: verseText
            });
          }
        });
      });
    });

    const displayMatches = matches.slice(0, 24);
    countLabel.textContent = query
      ? `${matches.length} versículo(s) encontrado(s) para "${rawQuery.trim()}"`
      : `Exibindo ${displayMatches.length} versículos em destaque`;

    resultsContainer.innerHTML = displayMatches
      .map(
        (m) => `
        <article class="archive-entry-card">
          <div class="metadata-inline">
            <span>${m.book.testament}</span>
            <span aria-hidden="true">·</span>
            <span>${m.book.category}</span>
          </div>
          <h3 class="plan-card-title" style="margin: 0;">
            ${m.book.name} ${m.chapter}:${m.verseNumber}
          </h3>
          <p style="font-size: 0.94rem; line-height: 1.6; color: var(--text-primary);">
            "${escapeHTML(m.text)}"
          </p>
          <div style="margin-top: auto; padding-top: 0.5rem;">
            <button
              type="button"
              class="btn-secondary-quiet"
              data-search-open-book="${m.book.id}"
              data-search-open-ch="${m.chapter}"
              data-search-open-verse="${m.verseNumber}"
            >
              Ler no Códice Aberto →
            </button>
          </div>
        </article>
      `
      )
      .join("");

    resultsContainer.querySelectorAll("[data-search-open-book]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bookId = btn.getAttribute("data-search-open-book");
        const ch = Number(btn.getAttribute("data-search-open-ch"));
        const verseNum = Number(btn.getAttribute("data-search-open-verse"));
        const pageIndex = Math.floor((verseNum - 1) / VERSES_PER_PAGE);
        const spreadIdx = isEffectiveSinglePage() ? pageIndex : Math.floor(pageIndex / 2);
        navigateToPassage(bookId, ch, spreadIdx);
      });
    });
  }

  // =========================================================================
  // SELETORES, NAVEGAÇÃO ENTRE VIEWS E TEMAS
  // =========================================================================
  function renderSelectors() {
    const bookSelect = document.getElementById("bookSelect");
    const chapterSelect = document.getElementById("chapterSelect");

    bookSelect.innerHTML = window.BIBLE_BOOKS.map(
      (b) => `<option value="${b.id}" ${b.id === state.bookId ? "selected" : ""}>${b.name} (${b.abbrev})</option>`
    ).join("");

    const currentBook = getBook(state.bookId);
    const chNums = getChapterNumbers(currentBook);
    if (!chNums.includes(Number(state.chapter))) {
      state.chapter = chNums[0];
    }

    chapterSelect.innerHTML = chNums
      .map((num) => `<option value="${num}" ${num === Number(state.chapter) ? "selected" : ""}>Cap. ${num}</option>`)
      .join("");
  }

  function switchView(viewName) {
    state.currentView = viewName;
    saveState();

    document.querySelectorAll(".nav-link[data-view], .mobile-nav-item[data-view]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-view") === viewName);
    });

    document.querySelectorAll(".view-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `view-${viewName}`);
    });

    if (viewName === "plans") renderPlansView();
    if (viewName === "notes") renderNotesArchiveView();
    if (viewName === "search") {
      const q = document.getElementById("bibleSearchInput").value;
      executeBibleSearch(q);
    }

    if (window.innerWidth <= 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function navigateToPassage(bookId, chapter, targetSpreadIndex = 0) {
    state.bookId = bookId;
    state.chapter = chapter;
    state.spreadIndex = targetSpreadIndex;
    saveState();
    renderSelectors();
    switchView("reader");
    renderCodexStatic();
    renderActivePlanBanner();
  }

  function applyThemeAndTypography() {
    document.documentElement.setAttribute("data-theme", state.theme);
    const themeLabels = {
      paper: "Papel Alabastro",
      sepia: "Pergaminho Sépia",
      dark: "Scriptorium Noturno"
    };
    document.getElementById("themeCycleBtn").textContent = themeLabels[state.theme] || "Papel Alabastro";

    const baseRem = 1.0625 + state.fontSizeScale * 0.075;
    document.documentElement.style.setProperty("--verse-font-size", `${baseRem.toFixed(3)}rem`);

    document.getElementById("modeSpreadBtn").classList.toggle("active", state.spreadMode === "spread");
    document.getElementById("modeSingleBtn").classList.toggle("active", state.spreadMode === "single");
    document.getElementById("soundToggleBtn").textContent = state.soundEnabled ? "Som: Ativo" : "Som: Mudo";
  }

  function escapeHTML(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // =========================================================================
  // INICIALIZAÇÃO DE EVENTOS
  // =========================================================================
  function initEvents() {
    // Navegação da Top Bar (Desktop/Tablet) e Bottom Bar (Celular)
    document.querySelectorAll(".nav-link[data-view], .mobile-nav-item[data-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchView(btn.getAttribute("data-view"));
      });
    });

    document.getElementById("brandHomeLink").addEventListener("click", (e) => {
      e.preventDefault();
      switchView("reader");
    });

    // Alternar Tema
    document.getElementById("themeCycleBtn").addEventListener("click", () => {
      const order = ["paper", "sepia", "dark"];
      const nextIdx = (order.indexOf(state.theme) + 1) % order.length;
      state.theme = order[nextIdx];
      saveState();
      applyThemeAndTypography();
    });

    // Botão "Leitura de Hoje" na Top Bar
    document.getElementById("todayReadingBtn").addEventListener("click", () => {
      const plan = getActivePlan();
      const nextReading = getNextUncompletedDay(plan);
      navigateToPassage(nextReading.bookId, nextReading.chapter, 0);
    });

    // Seletores de Livro e Capítulo
    document.getElementById("bookSelect").addEventListener("change", (e) => {
      const newBookId = e.target.value;
      const book = getBook(newBookId);
      const firstCh = getChapterNumbers(book)[0];
      navigateToPassage(newBookId, firstCh, 0);
    });

    document.getElementById("chapterSelect").addEventListener("change", (e) => {
      navigateToPassage(state.bookId, Number(e.target.value), 0);
    });

    // Modo Livro Aberto (2 Páginas) vs 1 Página
    document.getElementById("modeSpreadBtn").addEventListener("click", () => {
      state.spreadMode = "spread";
      state.spreadIndex = 0;
      saveState();
      applyThemeAndTypography();
      renderCodexStatic();
    });

    document.getElementById("modeSingleBtn").addEventListener("click", () => {
      state.spreadMode = "single";
      state.spreadIndex = 0;
      saveState();
      applyThemeAndTypography();
      renderCodexStatic();
    });

    // Tamanho da Fonte
    document.getElementById("fontDecreaseBtn").addEventListener("click", () => {
      state.fontSizeScale = Math.max(-2, state.fontSizeScale - 1);
      saveState();
      applyThemeAndTypography();
    });

    document.getElementById("fontIncreaseBtn").addEventListener("click", () => {
      state.fontSizeScale = Math.min(3, state.fontSizeScale + 1);
      saveState();
      applyThemeAndTypography();
    });

    // Som de virar página
    document.getElementById("soundToggleBtn").addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      saveState();
      applyThemeAndTypography();
      if (state.soundEnabled) playPageTurnSound();
    });

    // Botões de Virar Página (Animação 3D)
    document.getElementById("nextPageBtn").addEventListener("click", () => {
      turnPageWith3DAnimation("next");
    });

    document.getElementById("prevPageBtn").addEventListener("click", () => {
      turnPageWith3DAnimation("prev");
    });

    // Setas do Teclado para Virar Página
    window.addEventListener("keydown", (e) => {
      if (state.currentView !== "reader") return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        turnPageWith3DAnimation("next");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        turnPageWith3DAnimation("prev");
      }
    });

    // Gestos de Deslize (Touch Swipe) para Celular e Tablet
    let touchStartX = 0;
    let touchStartY = 0;
    const codexStageEl = document.getElementById("codexStage");

    codexStageEl.addEventListener(
      "touchstart",
      (e) => {
        if (!e.changedTouches || !e.changedTouches[0]) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    codexStageEl.addEventListener(
      "touchend",
      (e) => {
        if (!e.changedTouches || !e.changedTouches[0]) return;
        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const deltaY = e.changedTouches[0].screenY - touchStartY;

        if (Math.abs(deltaX) > 48 && Math.abs(deltaY) < 65) {
          if (deltaX < 0) {
            turnPageWith3DAnimation("next");
          } else {
            turnPageWith3DAnimation("prev");
          }
        }
      },
      { passive: true }
    );

    // Adaptação automática ao redimensionar ou girar a tela (Retrato <-> Paisagem)
    let wasSinglePage = isEffectiveSinglePage();
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nowSinglePage = isEffectiveSinglePage();
        if (nowSinglePage !== wasSinglePage) {
          // Preserva a página atual ao alternar entre 1 página e 2 páginas
          if (nowSinglePage) {
            state.spreadIndex = state.spreadIndex * 2;
          } else {
            state.spreadIndex = Math.floor(state.spreadIndex / 2);
          }
          wasSinglePage = nowSinglePage;
        }
        renderCodexStatic();
      }, 120);
    });

    // Fita Marcadora do Códice
    document.getElementById("codexRibbonBtn").addEventListener("click", () => {
      const bmKey = `${state.bookId}:${state.chapter}`;
      const idx = state.bookmarks.indexOf(bmKey);
      if (idx === -1) {
        state.bookmarks.push(bmKey);
      } else {
        state.bookmarks.splice(idx, 1);
      }
      saveState();
      renderCodexStatic();
    });

    // Ações do Banner do Plano Ativo no Leitor
    document.getElementById("bannerOpenPlanDayBtn").addEventListener("click", () => {
      const plan = getActivePlan();
      const nextReading = getNextUncompletedDay(plan);
      navigateToPassage(nextReading.bookId, nextReading.chapter, 0);
    });

    document.getElementById("bannerCompleteDayBtn").addEventListener("click", () => {
      const plan = getActivePlan();
      const currentReading = getNextUncompletedDay(plan);
      if (!state.completedPlanDays[plan.id]) {
        state.completedPlanDays[plan.id] = [];
      }
      if (!state.completedPlanDays[plan.id].includes(currentReading.day)) {
        state.completedPlanDays[plan.id].push(currentReading.day);
        state.streakDays = (state.streakDays || 1) + 1;
        saveState();
      }
      renderActivePlanBanner();
      const nextReading = getNextUncompletedDay(plan);
      if (
        nextReading.bookId !== state.bookId ||
        Number(nextReading.chapter) !== Number(state.chapter)
      ) {
        navigateToPassage(nextReading.bookId, nextReading.chapter, 0);
      }
    });

    // Inspetor de Versículos (Cores e Notas)
    document.querySelectorAll(".color-swatch[data-color]").forEach((swatch) => {
      swatch.addEventListener("click", () => {
        if (!state.selectedVerseKey) return;
        const colorClass = swatch.getAttribute("data-color");
        state.highlights[state.selectedVerseKey] = colorClass;
        saveState();
        renderCodexStatic();
      });
    });

    document.getElementById("clearHighlightBtn").addEventListener("click", () => {
      if (!state.selectedVerseKey) return;
      delete state.highlights[state.selectedVerseKey];
      saveState();
      renderCodexStatic();
    });

    document.getElementById("closeInspectorBtn").addEventListener("click", () => {
      closeVerseInspector();
    });

    document.getElementById("saveVerseNoteBtn").addEventListener("click", () => {
      if (!state.selectedVerseKey) return;
      const val = document.getElementById("inspectorNoteInput").value.trim();
      if (val) {
        state.notes[state.selectedVerseKey] = val;
      } else {
        delete state.notes[state.selectedVerseKey];
      }
      saveState();
      renderCodexStatic();
      closeVerseInspector();
    });

    // Filtros de Notas e Marcadores
    document.querySelectorAll("#notesFilterControl .segmented-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.notesFilter = btn.getAttribute("data-filter");
        document.querySelectorAll("#notesFilterControl .segmented-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });
        renderNotesArchiveView();
      });
    });

    // Busca Bíblica
    document.getElementById("executeSearchBtn").addEventListener("click", () => {
      executeBibleSearch(document.getElementById("bibleSearchInput").value);
    });

    document.getElementById("bibleSearchInput").addEventListener("input", (e) => {
      executeBibleSearch(e.target.value);
    });

    document.querySelectorAll(".quick-search-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const term = chip.getAttribute("data-term");
        document.getElementById("bibleSearchInput").value = term;
        executeBibleSearch(term);
      });
    });

    // Modal de Plano Personalizado
    const modal = document.getElementById("customPlanModal");
    document.getElementById("openCustomPlanModalBtn").addEventListener("click", () => {
      modal.classList.add("open");
    });

    document.getElementById("closeCustomPlanModalBtn").addEventListener("click", () => {
      modal.classList.remove("open");
    });

    document.getElementById("customPlanForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("customPlanTitle").value.trim();
      const category = document.getElementById("customPlanCategory").value;
      const meditationGoal =
        document.getElementById("customPlanMeditation").value.trim() ||
        "Meditar nas Escrituras com atenção, reverência e aplicação prática.";

      if (!title) return;

      // Seleciona capítulos de acordo com a ênfase escolhida
      const readings = [];
      let dayCounter = 1;
      window.BIBLE_BOOKS.forEach((b) => {
        const matchesFilter =
          category === "Todo o Cânon Selecionado" ||
          (category === "Poéticos e Sabedoria" && b.category === "Poéticos e Sabedoria") ||
          (category === "Evangelhos e Epístolas" && b.testament === "Novo Testamento") ||
          (category === "Pentateuco e Profetas" && b.testament === "Antigo Testamento");

        if (matchesFilter) {
          Object.entries(b.chapters).forEach(([chNum, chObj]) => {
            readings.push({
              day: dayCounter++,
              bookId: b.id,
              chapter: Number(chNum),
              title: chObj.title,
              meditation: meditationGoal
            });
          });
        }
      });

      const newPlan = {
        id: `custom-${Date.now()}`,
        title,
        category,
        durationLabel: `${readings.length} Dias`,
        dailyMinutes: "10 min / dia",
        description: meditationGoal,
        readings
      };

      state.customPlans.push(newPlan);
      state.activePlanId = newPlan.id;
      state.selectedPlanDetailId = newPlan.id;
      state.completedPlanDays[newPlan.id] = [];
      saveState();

      modal.classList.remove("open");
      document.getElementById("customPlanForm").reset();
      renderActivePlanBanner();
      renderPlansView();
    });
  }

  // Inicialização Geral
  function bootstrap() {
    applyThemeAndTypography();
    renderSelectors();
    renderActivePlanBanner();
    renderCodexStatic();
    initEvents();
    if (state.currentView !== "reader") {
      switchView(state.currentView);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
