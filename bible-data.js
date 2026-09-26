/**
 * Bíblia pra você — Corpus Bíblico Litúrgico & Planos de Leitura
 * Puro JavaScript (Sem dependências ou bundlers)
 */

window.BIBLE_BOOKS = [
  {
    id: "genesis",
    name: "Gênesis",
    abbrev: "Gn",
    testament: "Antigo Testamento",
    category: "Pentateuco",
    introduction: "O livro das origens: a criação do cosmos, a formação da humanidade e as alianças patriarcais.",
    chapters: {
      1: {
        title: "A Criação dos Céus e da Terra",
        subtitle: "O ordenamento da luz, das águas, da terra e da vida pela Palavra divina",
        marginalia: [
          { verse: 1, title: "Bereshit (No Princípio)", note: "O termo hebraico inaugura a história cósmica como ato soberano e intencional da sabedoria divina.", ref: "João 1:1 · Hebreus 11:3" },
          { verse: 3, title: "Haja Luz (Fiat Lux)", note: "A primeira palavra pronunciada nas Escrituras estabelece a luz antes mesmo dos luminares celestes.", ref: "Salmos 33:6 · 2 Coríntios 4:6" },
          { verse: 26, title: "Imagem e Semelhança", note: "A vocação real e sacerdotal do ser humano como representante e guardião da criação.", ref: "Salmos 8:4-6 · Colossenses 1:15" }
        ],
        verses: [
          "No princípio criou Deus os céus e a terra.",
          "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
          "E disse Deus: Haja luz; e houve luz.",
          "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
          "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.",
          "E disse Deus: Haja uma expansão no meio das águas, e haja separação entre águas e águas.",
          "E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão; e assim foi.",
          "E chamou Deus à expansão Céus, e foi a tarde e a manhã, o dia segundo.",
          "E disse Deus: Ajuntem-se as águas que estão debaixo dos céus num lugar; e apareça a porção seca; e assim foi.",
          "E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares; e viu Deus que era bom.",
          "E disse Deus: Produza a terra erva verde, erva que dê semente, árvore frutífera que dê fruto segundo a sua espécie, cuja semente está nela sobre a terra; e assim foi.",
          "E a terra produziu erva, erva dando semente conforme a sua espécie, e a árvore frutífera, cuja semente está nela conforme a sua espécie; e viu Deus que era bom.",
          "E foi a tarde e a manhã, o dia terceiro.",
          "E disse Deus: Haja luminares na expansão dos céus, para haver separação entre o dia e a noite; e sejam eles para sinais e para tempos determinados e para dias e anos.",
          "E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; e fez as estrelas.",
          "E viu Deus que era bom. E foi a tarde e a manhã, o dia quarto.",
          "E disse Deus: Produzam as águas abundantemente répteis de alma vivente; e voem as aves sobre a face da expansão dos céus.",
          "E Deus criou as grandes baleias, e todo o réptil de alma vivente que as águas abundantemente produziram conforme as suas espécies; e toda a ave de asas conforme a sua espécie; e viu Deus que era bom.",
          "E Deus os abençoou, dizendo: Frutificai e multiplicai-vos, e enchei as águas nos mares; e as aves se multipliquem na terra. E foi a tarde e a manhã, o dia quinto.",
          "E disse Deus: Produza a terra alma vivente conforme a sua espécie; gado, e répteis e feras da terra conforme a sua espécie; e assim foi.",
          "E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra.",
          "E criou Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.",
          "E Deus os abençoou, e Deus lhes disse: Frutificai e multiplicai-vos, e enchei a terra, e sujeitai-a.",
          "E viu Deus tudo quanto tinha feito, e eis que era muito bom; e foi a tarde e a manhã, o dia sexto."
        ]
      },
      2: {
        title: "O Sétimo Dia e o Jardim do Éden",
        subtitle: "O descanso sagrado da criação e a formação do jardim das delícias",
        marginalia: [
          { verse: 2, title: "O Repouso Sagrado", note: "Deus santifica o tempo antes de santificar qualquer espaço físico; o sábado é uma catedral no tempo.", ref: "Êxodo 20:8-11 · Hebreus 4:9" },
          { verse: 7, title: "O Sopro da Vida (Nishmat Chayim)", note: "Modelado do pó da terra e animado pelo fôlego divino, unindo matéria terrena e vocação espiritual.", ref: "Jó 33:4 · Eclesiastes 12:7" }
        ],
        verses: [
          "Assim os céus, a terra e todo o seu exército foram acabados.",
          "E havendo Deus acabado no dia sétimo a obra que fizera, descansou no sétimo dia de toda a sua obra, que tinha feito.",
          "E abençoou Deus o dia sétimo, e o santificou; porque nele descansou de toda a sua obra que Deus criara e fizera.",
          "Estas são as origens dos céus e da terra, quando foram criados; no dia em que o Senhor Deus fez a terra e os céus.",
          "Um vapor, porém, subia da terra, e regava toda a face da terra.",
          "E formou o Senhor Deus o homem do pó da terra, e soprou em suas narinas o fôlego da vida; e o homem foi feito alma vivente.",
          "E plantou o Senhor Deus um jardim no Éden, do lado oriental; e pôs ali o homem que tinha formado.",
          "E o Senhor Deus fez brotar da terra toda a árvore agradável à vista, e boa para comida; e a árvore da vida no meio do jardim, e a árvore do conhecimento do bem e do mal.",
          "E saía um rio do Éden para regar o jardim; e dali se dividia e se tornava em quatro braços.",
          "E tomou o Senhor Deus o homem, e o pôs no jardim do Éden para o lavrar e o guardar.",
          "E ordenou o Senhor Deus ao homem, dizendo: De toda a árvore do jardim comerás livremente,",
          "Mas da árvore do conhecimento do bem e do mal, dela não comerás; porque no dia em que dela comeres, certamente morrerás.",
          "E disse o Senhor Deus: Não é bom que o homem esteja só; far-lhe-ei uma ajudadora idônea para ele.",
          "Portanto deixará o homem o seu pai e a sua mãe, e apegar-se-á à sua mulher, e serão ambos uma carne."
        ]
      },
      12: {
        title: "O Chamado e a Promessa a Abrão",
        subtitle: "A vocação da fé e a promessa de bênção para todas as famílias da terra",
        marginalia: [
          { verse: 1, title: "Lech Lecha (Sai da tua terra)", note: "A jornada da fé começa com o desapego das seguranças antigas rumo à promessa divina.", ref: "Hebreus 11:8 · Atos 7:2-3" },
          { verse: 3, title: "Bênção Universal", note: "A eleição de Abraão tem propósito missionário: abençoar todas as famílias da terra.", ref: "Gálatas 3:8" }
        ],
        verses: [
          "Ora, o Senhor disse a Abrão: Sai-te da tua terra, da tua parentela e da casa de teu pai, para a terra que eu te mostrarei.",
          "E far-te-ei uma grande nação, e abençoar-te-ei e engrandecerei o teu nome; e tu serás uma bênção.",
          "E abençoarei os que te abençoarem, e amaldiçoarei os que te amaldiçoarem; e em ti serão benditas todas as famílias da terra.",
          "Assim partiu Abrão como o Senhor lhe tinha dito, e foi Ló com ele; e era Abrão da idade de setenta e cinco anos quando saiu de Harã.",
          "E tomou Abrão a Sarai, sua mulher, e a Ló, filho de seu irmão, e todos os bens que haviam adquirido, e saíram para irem à terra de Canaã.",
          "E passou Abrão por aquela terra até ao lugar de Siquém, até ao carvalho de Moré.",
          "E apareceu o Senhor a Abrão, e disse: À tua descendência darei esta terra. E edificou ali um altar ao Senhor, que lhe aparecera.",
          "E moveu-se dali para a montanha ao oriente de Betel, e armou a sua tenda, tendo Betel ao ocidente, e Ai ao oriente; e edificou ali um altar ao Senhor, e invocou o nome do Senhor."
        ]
      }
    }
  },
  {
    id: "exodo",
    name: "Êxodo",
    abbrev: "Êx",
    testament: "Antigo Testamento",
    category: "Pentateuco",
    introduction: "A libertação do Egito, a revelação do Nome Divino na sarça ardente e a Aliança no Monte Sinai.",
    chapters: {
      3: {
        title: "A Sarça Ardente e o Nome Divino",
        subtitle: "A vocação de Moisés no Monte Horebe diante do Deus que ouve o clamor",
        marginalia: [
          { verse: 5, title: "Terra Santa", note: "A santidade do lugar emana da presença viva de Deus que se revela no cotidiano.", ref: "Josué 5:15 · Atos 7:33" },
          { verse: 14, title: "Eu Sou o Que Sou (Ehyeh Asher Ehyeh)", note: "O Nome revela a eternidade, autossuficiência e presença fiel de Deus junto ao Seu povo.", ref: "João 8:58 · Apocalipse 1:8" }
        ],
        verses: [
          "E apascentava Moisés o rebanho de Jetro, seu sogro, sacerdote em Midiã; e levou o rebanho atrás do deserto, e chegou ao monte de Deus, a Horebe.",
          "E apareceu-lhe o anjo do Senhor em uma chama de fogo do meio duma sarça; e olhou, e eis que a sarça ardia no fogo, e a sarça não se consumia.",
          "E Moisés disse: Agora me virarei para lá, e verei esta grande visão, porque a sarça não se queima.",
          "E vendo o Senhor que se virava para ver, bradou Deus a ele do meio da sarça, e disse: Moisés, Moisés! Respondeu ele: Eis-me aqui.",
          "E disse: Não te chegues para cá; tira os sapatos de teus pés; porque o lugar em que tu estás é terra santa.",
          "Disse mais: Eu sou o Deus de teu pai, o Deus de Abraão, o Deus de Isaque, e o Deus de Jacó. E Moisés encobriu o seu rosto, porque temeu olhar para Deus.",
          "E disse o Senhor: Tenho visto atentamente a aflição do meu povo, que está no Egito, e tenho ouvido o seu clamor por causa dos seus exatores, porque conheci as suas dores.",
          "Portanto desci para livrá-lo da mão dos egípcios, e para fazê-lo subir daquela terra, a uma terra boa e larga, a uma terra que mana leite e mel.",
          "Vem agora, pois, e eu te enviarei a Faraó para que tires o meu povo, os filhos de Israel, do Egito.",
          "Então Moisés대 disse a Deus: Quem sou eu, que vá a Faraó e tire do Egito os filhos de Israel?",
          "E disse: Certamente eu serei contigo; e isto te será por sinal de que eu te enviei: Quando houveres tirado este povo do Egito, servireis a Deus neste monte.",
          "Disse Moisés a Deus: Eis que quando eu for aos filhos de Israel, e lhes disser: O Deus de vossos pais me enviou a vós; e eles me disserem: Qual é o seu nome? Que lhes direi?",
          "E disse Deus a Moisés: EU SOU O QUE SOU. Disse mais: Assim dirás aos filhos de Israel: EU SOU me enviou a vós."
        ]
      },
      20: {
        title: "As Dez Palavras da Aliança",
        subtitle: "A promulgação da Lei Moral no Monte Sinai como fundamento de liberdade e justiça",
        marginalia: [
          { verse: 2, title: "A Graça Precede a Lei", note: "Antes de qualquer mandamento, Deus lembra que já libertou Israel da casa da servidão.", ref: "Deuteronômio 5:6" },
          { verse: 12, title: "Ponte entre as Tábuas", note: "A honra aos pais conecta a devoção a Deus com a ética para com o próximo.", ref: "Efésios 6:1-3" }
        ],
        verses: [
          "Então falou Deus todas estas palavras, dizendo:",
          "Eu sou o Senhor teu Deus, que te tirei da terra do Egito, da casa da servidão.",
          "Não terás outros deuses diante de mim.",
          "Não farás para ti imagem de escultura, nem alguma semelhança do que há em cima nos céus, nem embaixo na terra, nem nas águas debaixo da terra.",
          "Não tomarás o nome do Senhor teu Deus em vão; porque o Senhor não terá por inocente o que tomar o seu nome em vão.",
          "Lembra-te do dia do sábado, para o santificar.",
          "Seis dias trabalharás, e farás toda a tua obra, mas o sétimo dia é o sábado do Senhor teu Deus.",
          "Honra a teu pai e a tua mãe, para que se prolonguem os teus dias na terra que o Senhor teu Deus te dá.",
          "Não matarás.",
          "Não adulterarás.",
          "Não furtarás.",
          "Não dirás falso testemunho contra o teu próximo.",
          "Não cobiçarás a casa do teu próximo, não cobiçarás a mulher do teu próximo, nem coisa alguma do teu próximo."
        ]
      }
    }
  },
  {
    id: "salmos",
    name: "Salmos",
    abbrev: "Sl",
    testament: "Antigo Testamento",
    category: "Poéticos e Sabedoria",
    introduction: "O saltério de oração, louvor, lamento e confiança que expressa toda a amplitude da alma humana diante de Deus.",
    chapters: {
      1: {
        title: "Os Dois Caminhos da Vida",
        subtitle: "A bem-aventurança do justo enraizado na meditação da Lei do Senhor",
        marginalia: [
          { verse: 1, title: "Ashrei (Bem-aventurado)", note: "Pórtico de todo o Saltério: a verdadeira felicidade nasce da direção dos passos e do prazer na Torá.", ref: "Jeremias 17:7-8 · Josué 1:8" },
          { verse: 3, title: "Árvore Junto a Ribeiros", note: "Imagem de vitalidade perene mesmo em estações de aridez espiritual.", ref: "Apocalipse 22:2" }
        ],
        verses: [
          "Bem-aventurado o homem que não anda segundo o conselho dos ímpios, nem se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores.",
          "Antes tem o seu prazer na lei do Senhor, e na sua lei medita de dia e de noite.",
          "Pois será como a árvore plantada junto a ribeiros de águas, a qual dá o seu fruto no seu tempo; as suas folhas não cairão, e tudo quanto fizer prosperará.",
          "Não são assim os ímpios; mas são como a moinha que o vento espalha.",
          "Por isso os ímpios não subsistirão no juízo, nem os pecadores na congregação dos justos.",
          "Porque o Senhor conhece o caminho dos justos; porém o caminho dos ímpios perecerá."
        ]
      },
      23: {
        title: "O Bom Pastor e o Hóspede Divino",
        subtitle: "Salmo de Davi sobre provisão, restauração da alma e segurança no vale escuro",
        marginalia: [
          { verse: 1, title: "O Senhor é o Meu Pastor", note: "Transição íntima do Rei cósmico para o Pastor pessoal que conhece cada ovelha pelo nome.", ref: "Isaías 40:11 · João 10:11" },
          { verse: 4, title: "Tu Estás Comigo", note: "No centro exato do salmo, o pronome muda de 'Ele' para 'Tu': a provação aproxima a comunhão.", ref: "Mateus 28:20" }
        ],
        verses: [
          "O Senhor é o meu pastor, nada me faltará.",
          "Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.",
          "Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.",
          "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
          "Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.",
          "Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias."
        ]
      },
      46: {
        title: "Deus é o Nosso Refúgio e Fortaleza",
        subtitle: "Cântico de confiança inabalável em meio às convulsões da terra e das nações",
        marginalia: [
          { verse: 4, title: "O Rio da Cidade de Deus", note: "Enquanto o mar brama lá fora, um rio sereno alegra o santuário interior.", ref: "Isaías 8:6 · João 7:38" },
          { verse: 10, title: "Aquietai-vos e Sabei", note: "Convite ao cessar da ansiedade armada para reconhecer a soberania divina.", ref: "Êxodo 14:14" }
        ],
        verses: [
          "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
          "Pelo que não temeremos, ainda que a terra se mude, e ainda que os montes se transportem para o meio dos mares.",
          "Ainda que as águas rujam e se perturbem, ainda que os montes se abalem pela sua braveza.",
          "Há um rio cujas correntes alegram a cidade de Deus, o santuário das moradas do Altíssimo.",
          "Deus está no meio dela; não se abalará. Deus a ajudará, já ao romper da manhã.",
          "Bramam as nações, os reinos se abalam; ele levantou a sua voz, a terra se derreteu.",
          "O Senhor dos Exércitos está conosco; o Deus de Jacó é o nosso refúgio.",
          "Vinde, contemplai as obras do Senhor; que desolações tem feito na terra!",
          "Ele faz cessar as guerras até ao fim da terra; quebra o arco e corta a lança; queima os carros no fogo.",
          "Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.",
          "O Senhor dos Exércitos está conosco; o Deus de Jacó é o nosso refúgio."
        ]
      },
      91: {
        title: "À Sombra do Onipotente",
        subtitle: "A proteção daquele que habita no esconderijo do Altíssimo",
        marginalia: [
          { verse: 1, title: "Esconderijo do Altíssimo", note: "Não é uma visita ocasional, mas uma habitação contínua na comunhão com Deus.", ref: "Salmos 27:5 · João 15:7" },
          { verse: 4, title: "Debaixo de Suas Asas", note: "Metáfora maternal e do propiciatório do templo onde os querubins estendiam suas asas.", ref: "Rute 2:12 · Mateus 23:37" }
        ],
        verses: [
          "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
          "Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.",
          "Porque ele te livrará do laço do passarinheiro, e da peste perniciosa.",
          "Ele te cobrirá com as suas penas, e debaixo das suas asas te confiarás; a sua verdade será o teu escudo e broquel.",
          "Não terás medo do terror de noite nem da seta que voa de dia,",
          "Nem da peste que anda na escuridão, nem da mortandade que assola ao meio-dia.",
          "Mil cairão ao teu lado, e dez mil à tua direita, mas não chegará a ti.",
          "Porque tu, ó Senhor, és o meu refúgio. No Altíssimo fizeste a tua habitação.",
          "Nenhum mal te sucederá, nem praga alguma chegará à tua tenda.",
          "Porque aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos.",
          "Eles te sustentarão nas suas mãos, para que não tropeces com o teu pé em pedra.",
          "Porquanto tão encarecidamente me amou, também eu o livrarei; pô-lo-ei em retiro alto, porque conheceu o meu nome.",
          "Ele me invocará, e eu lhe responderei; estarei com ele na angústia; dela o retirarei, e o glorificarei. Fartá-lo-ei com longura de dias, e lhe mostrarei a minha salvação."
        ]
      },
      121: {
        title: "O Guarda Fiel de Israel",
        subtitle: "Cântico de romagem erguendo os olhos para além dos montes",
        marginalia: [
          { verse: 1, title: "Cântico dos Degraus", note: "Entoado pelos peregrinos ao subirem as encostas rumo a Jerusalém.", ref: "Salmos 122:1" },
          { verse: 4, title: "Vigilância Incessante", note: "O Criador dos céus e da terra jamais dormita nem abandona a guarda de Seus filhos.", ref: "Isaías 27:3" }
        ],
        verses: [
          "Levantarei os meus olhos para os montes, de onde vem o meu socorro.",
          "O meu socorro vem do Senhor que fez o céu e a terra.",
          "Não deixará vacilar o teu pé; aquele que te guarda não tosquenejará.",
          "Eis que não tosquenejará nem dormirá o guarda de Israel.",
          "O Senhor é quem te guarda; o Senhor é a tua sombra à tua direita.",
          "O sol não te molestará de dia nem a lua de noite.",
          "O Senhor te guardará de todo o mal; guardará a tua alma.",
          "O Senhor guardará a tua entrada e a tua saída, desde agora e para sempre."
        ]
      },
      139: {
        title: "A Onisciência e a Presença Inescapável de Deus",
        subtitle: "Meditação poética sobre o conhecimento íntimo do Criador por cada vida",
        marginalia: [
          { verse: 7, title: "Onipresença Amorosa", note: "Em qualquer horizonte ou profundidade, a mão de Deus já está lá para sustentar.", ref: "Amós 9:2 · Romanos 8:38-39" },
          { verse: 14, title: "Modo Assombroso", note: "A formação da vida no oculto é celebrada como obra-prima de tapeçaria divina.", ref: "Jó 10:8-12" }
        ],
        verses: [
          "Senhor, tu me sondaste, e me conheces.",
          "Tu sabes o meu assentar e o meu levantar; de longe entendes o meu pensamento.",
          "Cercas o meu andar, e o meu deitar; e conheces todos os meus caminhos.",
          "Não havendo ainda palavra alguma na minha língua, eis que logo, ó Senhor, tudo conheces.",
          "Tu me cercaste por detrás e por diante, e puseste sobre mim a tua mão.",
          "Tal ciência é para mim maravilhosíssima; tão alta que não a posso atingir.",
          "Para onde me irei do teu espírito, ou para onde fugirei da tua face?",
          "Se subir ao céu, lá tu estás; se fizer no inferno a minha cama, eis que tu ali estás também.",
          "Se tomar as asas da alva, se habitar nas extremidades do mar,",
          "Até ali a tua mão me guiará e a tua destra me susterá.",
          "Eu te louvarei, porque de um modo assombroso, e tão maravilhoso fui feito; maravilhosas são as tuas obras, e a minha alma o sabe muito bem.",
          "Os teus olhos viram o meu corpo ainda informe; e no teu livro todas estas coisas foram escritas.",
          "Sonda-me, ó Deus, e conhece o meu coração; prova-me, e conhece os meus pensamentos. E vê se há em mim algum caminho mau, e guia-me pelo caminho eterno."
        ]
      }
    }
  },
  {
    id: "proverbios",
    name: "Provérbios",
    abbrev: "Pv",
    testament: "Antigo Testamento",
    category: "Poéticos e Sabedoria",
    introduction: "Sabedoria prática e discernimento ético para conduzir a vida cotidiana na presença e no temor do Senhor.",
    chapters: {
      3: {
        title: "O Valor Inestimável da Sabedoria",
        subtitle: "Exortação à confiança integral no Senhor e à humildade de coração",
        marginalia: [
          { verse: 5, title: "Confiança de Todo o Coração", note: "A verdadeira sabedoria reconhece os limites do próprio entendimento e apoia-se na fidelidade divina.", ref: "Salmos 37:5 · Jeremias 9:23-24" },
          { verse: 18, title: "Árvore da Vida", note: "A sabedoria restaura a comunhão e o fruto vital perdidos no Éden.", ref: "Gênesis 2:9 · Provérbios 11:30" }
        ],
        verses: [
          "Filho meu, não te esqueças da minha lei, e o teu coração guarde os meus mandamentos.",
          "Porque eles aumentarão os teus dias e te acrescentarão anos de vida e paz.",
          "Não te desamparem a benignidade e a fidelidade; ata-as ao teu pescoço; escreve-as na tábua do teu coração.",
          "E acharás graça e bom entendimento aos olhos de Deus e dos homens.",
          "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.",
          "Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
          "Não sejas sábio a teus próprios olhos; teme ao Senhor e aparta-te do mal.",
          "Isto será saúde para o teu âmago, e medula para os teus ossos.",
          "Honra ao Senhor com os teus bens, e com a primeira parte de todos os teus ganhos.",
          "Filho meu, não rejeites a correção do Senhor, nem te enojes da sua repreensão.",
          "Porque o Senhor repreende aquele a quem ama, assim como o pai ao filho a quem quer bem.",
          "Bem-aventurado o homem que acha sabedoria, e o homem que adquire conhecimento;",
          "Porque é melhor a sua mercadoria do que artigos de prata, e maior o seu lucro que o ouro mais fino.",
          "Mais preciosa é do que os rubis, e tudo o que mais possas desejar não se pode comparar a ela.",
          "Os seus caminhos são caminhos de delícias, e todas as suas veredas de paz.",
          "É árvore de vida para os que dela tomam, e são bem-aventurados todos os que a retêm."
        ]
      }
    }
  },
  {
    id: "isaias",
    name: "Isaías",
    abbrev: "Is",
    testament: "Antigo Testamento",
    category: "Profetas",
    introduction: "Visões majestosas da santidade de Deus, do consolo de Israel e da esperança messiânica do Servo Sofredor.",
    chapters: {
      40: {
        title: "Consolai, Consolai o Meu Povo",
        subtitle: "A voz que clama no deserto e a grandeza incomparável do Criador que renova as forças",
        marginalia: [
          { verse: 3, title: "Preparai o Caminho", note: "Profecia retomada nos quatro Evangelhos para anunciar o ministério precursor de João Batista.", ref: "Mateus 3:3 · João 1:23" },
          { verse: 31, title: "Asas como Águias", note: "A força espiritual não provém do esforço autônomo, mas da espera confiante no Senhor eterno.", ref: "2 Coríntios 12:9" }
        ],
        verses: [
          "Consolai, consolai o meu povo, diz o vosso Deus.",
          "Falai benignamente a Jerusalém, e bradai-lhe que já a sua milícia é acabada, que a sua iniquidade está expiada.",
          "Voz do que clama no deserto: Preparai o caminho do Senhor; endireitai no ermo vereda a nosso Deus.",
          "Todo o vale será exaltado, e todo o monte e todo o outeiro será abatido; e o que está torcido se endireitará, e o que é áspero se aplainará.",
          "E a glória do Senhor se manifestará, e toda a carne juntamente a verá, pois a boca do Senhor o disse.",
          "Uma voz diz: Clama; e alguém disse: Que hei de clamar? Toda a carne é erva e toda a sua beleza como a flor do campo.",
          "Seca-se a erva, e cai a flor, soprando nela o Espírito do Senhor.",
          "Seca-se a erva, e cai a flor, porém a palavra de nosso Deus subsiste eternamente.",
          "Como pastor apascentará o seu rebanho; entre os seus braços recolherá os cordeirinhos, e os levará no seu regaço.",
          "Não sabes, não ouviste que o eterno Deus, o Senhor, o Criador dos fins da terra, nem se cansa nem se fatiga? É inescrutável o seu entendimento.",
          "Dá força ao cansado, e multiplica as forças ao que não tem nenhum vigor.",
          "Os jovens se cansarão e se fatigarão, e os moços certamente cairão;",
          "Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão."
        ]
      },
      53: {
        title: "O Cântico do Servo Sofredor",
        subtitle: "O mistério da redenção através da entrega vicária do Justo",
        marginalia: [
          { verse: 5, title: "Pelas Suas Pisaduras", note: "O sofrimento do Servo não é derrota, mas o ato sacerdotal que restaura a paz (Shalom) e a cura.", ref: "1 Pedro 2:24 · Mateus 8:17" }
        ],
        verses: [
          "Quem deu crédito à nossa pregação? E a quem se manifestou o braço do Senhor?",
          "Porque foi subindo como renovo perante ele, e como raiz de uma terra seca; não tinha beleza nem formosura e, olhando nós para ele, nenhuma beleza víamos, para que o desejássemos.",
          "Era desprezado, e o mais rejeitado entre os homens, homem de dores, e experimentado nos trabalhos.",
          "Verdadeiramente ele tomou sobre si as nossas enfermidades, e as nossas dores levou sobre si; e nós o reputávamos por aflito, ferido de Deus, e oprimido.",
          "Mas ele foi ferido por causa das nossas transgressões, e moído por causa das nossas iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas suas pisaduras fomos sarados.",
          "Todos nós andávamos desgarrados como ovelhas; cada um se desviava pelo seu caminho; mas o Senhor fez cair sobre ele a iniquidade de nós todos.",
          "Ele foi oprimido e afligido, mas não abriu a sua boca; como um cordeiro foi levado ao matadouro, e como a ovelha muda perante os seus tosquiadores, assim ele não abriu a sua boca.",
          "Todavia, ao Senhor agradou moê-lo, fazendo-o enfermar; quando a sua alma se puser por expiação do pecado, verá a sua posteridade, prolongará os seus dias.",
          "Ele verá o fruto do penoso trabalho da sua alma, e ficará satisfeito; com o seu conhecimento o meu servo, o justo, justificará a muitos."
        ]
      }
    }
  },
  {
    id: "mateus",
    name: "Mateus",
    abbrev: "Mt",
    testament: "Novo Testamento",
    category: "Evangelhos",
    introduction: "O Evangelho do Reino dos Céus que apresenta Jesus como o Messias prometido e Mestre supremo da nova lei do amor.",
    chapters: {
      5: {
        title: "O Sermão da Montanha: As Bem-Aventuranças",
        subtitle: "A carta magna do Reino dos Céus, o sal da terra e a luz do mundo",
        marginalia: [
          { verse: 3, title: "Humildes de Espírito", note: "Aqueles que reconhecem sua total necessidade da graça divina recebem o Reino por herança.", ref: "Isaías 57:15 · Lucas 6:20" },
          { verse: 14, title: "Luz do Mundo", note: "A identidade dos discípulos não é esconder-se do mundo, mas iluminar com obras de amor e justiça.", ref: "Isaías 60:1 · Filipenses 2:15" }
        ],
        verses: [
          "E Jesus, vendo a multidão, subiu a um monte, e, assentando-se, aproximaram-se dele os seus discípulos;",
          "E, abrindo a sua boca, os ensinava, dizendo:",
          "Bem-aventurados os pobres de espírito, porque deles é o reino dos céus;",
          "Bem-aventurados os que choram, porque eles serão consolados;",
          "Bem-aventurados os mansos, porque eles herdarão a terra;",
          "Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos;",
          "Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia;",
          "Bem-aventurados os limpos de coração, porque eles verão a Deus;",
          "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus;",
          "Bem-aventurados os que sofrem perseguição por causa da justiça, porque deles é o reino dos céus;",
          "Vós sois o sal da terra; e se o sal for insípido, com que se há de salgar? Para nada mais presta senão para se lançar fora.",
          "Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte;",
          "Nem se acende a candeia e se coloca debaixo do alqueire, mas no velador, e dá luz a todos que estão na casa.",
          "Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai, que está nos céus.",
          "Não cuideis que vim destruir a lei ou os profetas: não vim ab-rogar, mas cumprir."
        ]
      },
      6: {
        title: "A Oração do Pai Nosso e a Providência",
        subtitle: "A devoção no secreto e a libertação da ansiedade pelo cuidado paternal de Deus",
        marginalia: [
          { verse: 9, title: "Pai Nosso (Pater Noster)", note: "A oração ensinada por Jesus une a glória do Nome de Deus com o pão cotidiano e o perdão mútuo.", ref: "Lucas 11:2-4" },
          { verse: 28, title: "Olhai para os Lírios", note: "A contemplação das aves e das flores do campo torna-se escola de confiança na providência.", ref: "Salmos 147:9 · 1 Pedro 5:7" }
        ],
        verses: [
          "Guardai-vos de fazer a vossa esmola diante dos homens, para serdes vistos por eles; aliás, não tereis galardão junto de vosso Pai, que está nos céus.",
          "Tu, porém, quando orares, entra no teu aposento e, fechando a tua porta, ora a teu Pai que está em secreto; e teu Pai, que vê em secreto, te recompensará publicamente.",
          "E, orando, não useis de vãs repetições, como os gentios, que pensam que por muito falarem serão ouvidos.",
          "Portanto, vós orareis assim: Pai nosso, que estás nos céus, santificado seja o teu nome;",
          "Venha o teu reino, seja feita a tua vontade, assim na terra como no céu;",
          "O pão nosso de cada dia nos dá hoje;",
          "E perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores;",
          "E não nos induzas à tentação; mas livra-nos do mal; porque teu é o reino, e o poder, e a glória, para sempre. Amém.",
          "Não ajunteis tesouros na terra, onde a traça e a ferrugem tudo consomem, e onde os ladrões minam e roubam;",
          "Mas ajuntai tesouros no céu, onde nem a traça nem a ferrugem consomem, e onde os ladrões não minam nem roubam.",
          "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.",
          "Por isso vos digo: Não andeis cuidadosos quanto à vossa vida, pelo que haveis de comer ou pelo que haveis de beber; nem quanto ao vosso corpo, pelo que haveis de vestir.",
          "Olhai para as aves do céu, que nem semeiam, nem segam, nem ajuntam em celeiros; e vosso Pai celestial as alimenta. Não tendes vós muito mais valor do que elas?",
          "Olhai para os lírios do campo, como eles crescem; não trabalham nem fiam; e eu vos digo que nem mesmo Salomão, em toda a sua glória, se vestiu como qualquer deles.",
          "Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas."
        ]
      }
    }
  },
  {
    id: "joao",
    name: "João",
    abbrev: "Jo",
    testament: "Novo Testamento",
    category: "Evangelhos",
    introduction: "O Evangelho espiritual da Luz, da Vida e do Verbo encarnado que revela a intimidade do Pai.",
    chapters: {
      1: {
        title: "O Prólogo do Verbo Eterno",
        subtitle: "A Palavra eterna que se fez carne e habitou entre nós cheia de graça e verdade",
        marginalia: [
          { verse: 1, title: "No Princípio era o Verbo (Logos)", note: "Eco deliberado de Gênesis 1:1: Aquele por quem o universo foi criado entra pessoalmente na história.", ref: "Gênesis 1:1 · Colossenses 1:16" },
          { verse: 14, title: "Habitou Entre Nós", note: "Literalmente 'armou o seu tabernáculo' entre nós, manifestando visivelmente a glória divina.", ref: "Êxodo 40:34 · 1 João 1:1-2" }
        ],
        verses: [
          "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.",
          "Ele estava no princípio com Deus.",
          "Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez.",
          "Nele estava a vida, e a vida era a luz dos homens.",
          "E a luz resplandece nas trevas, e as trevas não a compreenderam.",
          "Houve um homem enviado de Deus, cujo nome era João.",
          "Este veio para testemunho, para que testificasse da luz, para que todos cressem por ele.",
          "Ali estava a luz verdadeira, que ilumina a todo o homem que vem ao mundo.",
          "Estava no mundo, e o mundo foi feito por ele, e o mundo não o conheceu.",
          "Veio para o que era seu, e os seus não o receberam.",
          "Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, aos que creem no seu nome;",
          "E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glória do unigênito do Pai, cheio de graça e de verdade.",
          "Porque a lei foi dada por Moisés; a graça e a verdade vieram por Jesus Cristo.",
          "Deus nunca foi visto por alguém. O Filho unigênito, que está no seio do Pai, esse o revelou."
        ]
      },
      14: {
        title: "O Caminho, a Verdade e a Vida",
        subtitle: "Discurso de despedida no cenáculo, a promessa do Consolador e a paz de Cristo",
        marginalia: [
          { verse: 6, title: "Eu Sou o Caminho", note: "Cristo não apenas aponta a rota; Sua própria pessoa é o caminho vivo que conduz ao Pai.", ref: "Hebreus 10:19-20" },
          { verse: 27, title: "A Minha Paz Vos Dou", note: "Paz interior que independe da ausência de conflitos externos.", ref: "Filipenses 4:7" }
        ],
        verses: [
          "Não se turbe o vosso coração; credes em Deus, crede também em mim.",
          "Na casa de meu Pai há muitas moradas; se não fosse assim, eu vo-lo teria dito. Vou preparar-vos lugar.",
          "E quando eu for, e vos preparar lugar, virei outra vez, e vos levarei para mim mesmo, para que onde eu estiver estejais vós também.",
          "Disse-lhe Tomé: Senhor, nós não sabemos para onde vais; e como podemos saber o caminho?",
          "Disse-lhe Jesus: Eu sou o caminho, e a verdade e a vida; ninguém vem ao Pai, senão por mim.",
          "Se vós me conhecêsseis a mim, também conheceríeis a meu Pai; e já desde agora o conheceis, e o tendes visto.",
          "E eu rogarei ao Pai, e ele vos dará outro Consolador, para que fique convosco para sempre;",
          "O Espírito de verdade, que o mundo não pode receber, porque não o vê nem o conhece; mas vós o conheceis, porque habita convosco, e estará em vós.",
          "Não vos deixarei órfãos; voltarei para vós.",
          "Aquele que tem os meus mandamentos e os guarda esse é o que me ama; e aquele que me ama será amado de meu Pai, e eu o amarei, e me manifestarei a ele.",
          "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize."
        ]
      },
      15: {
        title: "A Videira Verdadeira e os Ramos",
        subtitle: "A permanência no amor de Cristo como fonte de todo fruto espiritual",
        marginalia: [
          { verse: 5, title: "Permanecer em Cristo", note: "O ramo não produz fruto por esforço isolado, mas pela seiva que recebe permanecendo unido ao tronco.", ref: "Gálatas 5:22-23" }
        ],
        verses: [
          "Eu sou a videira verdadeira, e meu Pai é o lavrador.",
          "Toda a vara em mim, que não dá fruto, a tira; e limpa toda aquela que dá fruto, para que dê mais fruto.",
          "Vós já estais limpos, pela palavra que vos tenho falado.",
          "Estai em mim, e eu em vós; como a vara de si mesma não pode dar fruto, se não estiver na videira, assim também vós, se não estiverdes em mim.",
          "Eu sou a videira, vós as varas; quem está em mim, e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer.",
          "Se vós estiverdes em mim, e as minhas palavras estiverem em vós, pedireis tudo o que quiserdes, e vos será feito.",
          "Nisto é glorificado meu Pai, que deis muito fruto; e assim sereis meus discípulos.",
          "Como o Pai me amou, também eu vos amei a vós; permanecei no meu amor.",
          "Tenho-vos dito isto, para que o meu gozo permaneça em vós, e o vosso gozo seja completo.",
          "O meu mandamento é este: Que vos ameis uns aos outros, assim como eu vos amei.",
          "Ninguém tem maior amor do que este, de dar alguém a sua vida pelos seus amigos."
        ]
      }
    }
  },
  {
    id: "romanos",
    name: "Romanos",
    abbrev: "Rm",
    testament: "Novo Testamento",
    category: "Epístolas",
    introduction: "A síntese magistral do apóstolo Paulo sobre a graça, a justificação pela fé e a vida no Espírito.",
    chapters: {
      8: {
        title: "A Vida no Espírito e o Amor Inseparável",
        subtitle: "Da ausência de condenação ao cântico de vitória que nada pode separar do amor de Deus",
        marginalia: [
          { verse: 1, title: "Nenhuma Condenação", note: "Declaração inaugural de alforria espiritual para todos os que estão unidos a Cristo Jesus.", ref: "João 5:24 · Romanos 5:1" },
          { verse: 28, title: "Cooperam para o Bem", note: "A providência divina tece até mesmo as dores do presente no propósito eterno de conformação a Cristo.", ref: "Gênesis 50:20" },
          { verse: 38, title: "Inseparáveis do Amor", note: "Ápice retórico da epístola: nenhuma dimensão do espaço, do tempo ou da morte pode romper a aliança.", ref: "Salmos 139:7-10" }
        ],
        verses: [
          "Portanto, agora nenhuma condenação há para os que estão em Cristo Jesus, que não andam segundo a carne, mas segundo o Espírito.",
          "Porque a lei do Espírito de vida, em Cristo Jesus, me livrou da lei do pecado e da morte.",
          "Porque os que são segundo a carne inclinam-se para as coisas da carne; mas os que são segundo o Espírito para as coisas do Espírito.",
          "Porque a inclinação da carne é morte; mas a inclinação do Espírito é vida e paz.",
          "Porque todos os que são guiados pelo Espírito de Deus, esses são filhos de Deus.",
          "Porque não recebestes o espírito de escravidão, para outra vez estardes em temor, mas recebestes o Espírito de adoção de filhos, pelo qual clamamos: Aba, Pai.",
          "O mesmo Espírito testifica com o nosso espírito que somos filhos de Deus.",
          "Porque para mim tenho por certo que as aflições deste tempo presente não são para comparar com a glória que em nós há de ser revelada.",
          "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
          "Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?",
          "Aquele que nem mesmo a seu próprio Filho poupou, antes o entregou por todos nós, como nos não dará também com ele todas as coisas?",
          "Quem nos separará do amor de Cristo? A tribulação, ou a angústia, ou a perseguição, ou a fome, ou a nudez, ou o perigo, ou a espada?",
          "Mas em todas estas coisas somos mais do que vencedores, por aquele que nos amou.",
          "Porque estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir,",
          "Nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor."
        ]
      },
      12: {
        title: "O Culto Racional e a Renovação da Mente",
        subtitle: "A ética cristã prática de serviço humilde, amor fraternal e superação do mal pelo bem",
        marginalia: [
          { verse: 2, title: "Metamorfose da Mente", note: "A transformação espiritual opera de dentro para fora pela renovação do discernimento.", ref: "Efésios 4:23" }
        ],
        verses: [
          "Rogo-vos, pois, irmãos, pela compaixão de Deus, que apresenteis os vossos corpos em sacrifício vivo, santo e agradável a Deus, que é o vosso culto racional.",
          "E não sede conformados com este mundo, mas sede transformados pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradável, e perfeita vontade de Deus.",
          "O amor seja não fingido. Aborrecei o mal e apegai-vos ao bem.",
          "Amai-vos cordialmente uns aos outros com amor fraternal, preferindo-vos em honra uns aos outros.",
          "Não sejais vagarosos no cuidado; sede fervorosos no espírito, servindo ao Senhor;",
          "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração;",
          "Abençoai aos que vos perseguem, abençoai, e não amaldiçoeis.",
          "Alegrai-vos com os que se alegram; e chorai com os que choram.",
          "Não torneis a ninguém mal por mal; procurai as coisas honestas, perante todos os homens.",
          "Se for possível, quanto estiver em vós, tende paz com todos os homens.",
          "Não te deixes vencer do mal, mas vence o mal com o bem."
        ]
      }
    }
  },
  {
    id: "1corintios",
    name: "1 Coríntios",
    abbrev: "1Co",
    testament: "Novo Testamento",
    category: "Epístolas",
    introduction: "Instruções apostólicas sobre a unidade da Igreja, os dons espirituais, o caminho excelente do amor e a ressurreição.",
    chapters: {
      13: {
        title: "O Cântico da Excelência do Amor",
        subtitle: "A supremacia do amor paciente e benigno sobre todos os dons e mistérios",
        marginalia: [
          { verse: 4, title: "Retrato de Cristo", note: "Cada virtude atribuída ao amor (Ágape) reflete o próprio caráter de Cristo nos Evangelhos.", ref: "1 João 4:8 · Gálatas 5:22" },
          { verse: 13, title: "A Tríade Teologal", note: "Fé e esperança conduzem a caminhada terrena, mas o amor permanece pela eternidade.", ref: "1 Tessalonicenses 1:3" }
        ],
        verses: [
          "Ainda que eu falasse as línguas dos homens e dos anjos, e não tivesse amor, seria como o metal que soa ou como o sino que tine.",
          "E ainda que tivesse o dom de profecia, e conhecesse todos os mistérios e toda a ciência, e ainda que tivesse toda a fé, de maneira tal que transportasse os montes, e não tivesse amor, nada seria.",
          "E ainda que distribuísse toda a minha fortuna para sustento dos pobres, e ainda que entregasse o meu corpo para ser queimado, e não tivesse amor, nada disso me aproveitaria.",
          "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.",
          "Não se porta com indecência, não busca os seus interesses, não se irrita, não suspeita mal;",
          "Não folga com a injustiça, mas folga com a verdade;",
          "Tudo sofre, tudo crê, tudo espera, tudo suporta.",
          "O amor nunca falha; mas havendo profecias, serão aniquiladas; havendo línguas, cessarão; havendo ciência, desaparecerá;",
          "Porque, em parte, conhecemos, e em parte profetizamos;",
          "Mas, quando vier o que é perfeito, então o que o é em parte será aniquilado.",
          "Porque agora vemos por espelho em enigma, mas então veremos face a face; agora conheço em parte, mas então conhecerei como também sou conhecido.",
          "Agora, pois, permanecem a fé, a esperança e o amor, estes três, mas o maior destes é o amor."
        ]
      }
    }
  },
  {
    id: "apocalipse",
    name: "Apocalipse",
    abbrev: "Ap",
    testament: "Novo Testamento",
    category: "Profecia",
    introduction: "A revelação de Jesus Cristo sobre a consumação da história, a renovação de todas as coisas e a Nova Jerusalém.",
    chapters: {
      21: {
        title: "Novo Céu e Nova Terra",
        subtitle: "A cidade santa onde Deus habita com os homens e enxuga dos olhos toda lágrima",
        marginalia: [
          { verse: 1, title: "Renovação Cósmica", note: "As Escrituras se encerram respondendo a Gênesis 1: a criação inteira é redimida e transfigurada.", ref: "Isaías 65:17 · 2 Pedro 3:13" },
          { verse: 5, title: "Eis que Faço Novas Todas as Coisas", note: "Não o abandono da criação, mas sua restauração gloriosa sob o trono do Cordeiro.", ref: "2 Coríntios 5:17" }
        ],
        verses: [
          "E vi um novo céu, e uma nova terra. Porque já o primeiro céu e a primeira terra passaram, e o mar já não existe.",
          "E eu, João, vi a santa cidade, a nova Jerusalém, que de Deus descia do céu, adereçada como uma esposa ataviada para o seu marido.",
          "E ouvi uma grande voz do céu, que dizia: Eis aqui o tabernáculo de Deus com os homens, pois com eles habitará, e eles serão o seu povo, e o mesmo Deus estará com eles, e será o seu Deus.",
          "E Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor; porque já as primeiras coisas são passadas.",
          "E o que estava assentado sobre o trono disse: Eis que faço novas todas as coisas. E disse-me: Escreve; porque estas palavras são verdadeiras e fiéis.",
          "E disse-me mais: Está cumprido. Eu sou o Alfa e o Ômega, o princípio e o fim. A quem quer que tiver sede, de graça lhe darei da fonte da água da vida.",
          "Quem vencer, herdará todas as coisas; e eu serei seu Deus, e ele será meu filho.",
          "E a cidade não necessita de sol nem de lua, para que nela resplandeçam, porque a glória de Deus a tem alumiado, e o Cordeiro é a sua lâmpada.",
          "E as nações dos salvos andarão à sua luz; e os reis da terra trarão para ela a sua glória e honra."
        ]
      }
    }
  }
];

window.DEFAULT_READING_PLANS = [
  {
    id: "aliancas-redencao",
    title: "Grandes Alianças: Da Criação à Nova Jerusalém",
    category: "Panorama Teológico",
    durationLabel: "10 Dias",
    dailyMinutes: "12 min / dia",
    description: "Percurso curatorial pelos marcos fundamentais da história bíblica: a Criação, o Chamado de Abraão, o Sinai, o Consolo Profético, o Verbo Encarnado e a Nova Criação.",
    readings: [
      { day: 1, bookId: "genesis", chapter: 1, title: "A Criação e o Ordenamento da Luz", meditation: "Contemple como a Palavra de Deus transforma o caos sem forma em um cosmos harmonioso e repleto de vida." },
      { day: 2, bookId: "genesis", chapter: 2, title: "O Jardim do Éden e o Repouso Sagrado", meditation: "Reflita sobre a dignidade humana moldada do barro e animada pelo sopro divino para guardar a criação." },
      { day: 3, bookId: "genesis", chapter: 12, title: "A Vocação de Abraão: Abençoar as Nações", meditation: "A fé autêntica exige caminhar rumo à promessa e tornar-se canal de bênção para todas as famílias." },
      { day: 4, bookId: "exodo", chapter: 3, title: "A Sarça Ardente e o Deus que Ouve", meditation: "Deus vê a aflição em silêncio e Se revela como 'Eu Sou' no meio do deserto cotidiano." },
      { day: 5, bookId: "exodo", chapter: 20, title: "As Dez Palavras da Liberdade no Sinai", meditation: "A lei divina nasce da libertação: mandamentos que protegem a vida, a honra e a paz comunitária." },
      { day: 6, bookId: "isaias", chapter: 40, title: "Consolai o Meu Povo: Asas como Águias", meditation: "Mesmo quando o vigor humano desfalece, aqueles que esperam no Senhor renovam suas forças." },
      { day: 7, bookId: "isaias", chapter: 53, title: "O Mistério do Servo Sofredor", meditation: "A redenção se cumpre não pela força das armas, mas pela entrega mansa que traz a paz." },
      { day: 8, bookId: "joao", chapter: 1, title: "O Verbo Se Fez Carne e Habitou Entre Nós", meditation: "A Luz eterna entrou na história humana cheia de graça e de verdade." },
      { day: 9, bookId: "romanos", chapter: 8, title: "Mais do que Vencedores no Amor de Deus", meditation: "Nenhuma altura ou profundidade pode nos separar do amor revelado em Cristo Jesus." },
      { day: 10, bookId: "apocalipse", chapter: 21, title: "Eis que Faço Novas Todas as Coisas", meditation: "A história caminha para o encontro onde toda lágrima é enxugada e Deus habita com Seu povo." }
    ]
  },
  {
    id: "saltos-sabedoria",
    title: "Refúgio da Alma: Salmos e Sabedoria",
    category: "Devocional Poético",
    durationLabel: "7 Dias",
    dailyMinutes: "8 min / dia",
    description: "Uma semana de imersão na poesia orante dos Salmos e no discernimento prático de Provérbios para restaurar a serenidade interior.",
    readings: [
      { day: 1, bookId: "salmos", chapter: 1, title: "A Árvore Plantada Junto às Águas", meditation: "Onde estão firmadas as raízes dos seus pensamentos ao iniciar o dia?" },
      { day: 2, bookId: "salmos", chapter: 23, title: "Águas Tranquilas e o Cálice Transbordante", meditation: "Confie na condução mansa do Bom Pastor mesmo quando o caminho atravessa vales sombrios." },
      { day: 3, bookId: "salmos", chapter: 46, title: "Aquietai-vos e Sabei que Eu Sou Deus", meditation: "No centro da cidade interior corre um rio sereno que as tempestades externas não podem secar." },
      { day: 4, bookId: "salmos", chapter: 91, title: "No Esconderijo do Altíssimo", meditation: "Habitar à sombra do Onipotente é transformar a oração em morada permanente." },
      { day: 5, bookId: "salmos", chapter: 121, title: "O Guarda de Israel Não Dormita", meditation: "Erga os olhos para além dos montes das dificuldades: o seu socorro vem do Criador." },
      { day: 6, bookId: "salmos", chapter: 139, title: "Sondado e Conhecido pelo Criador", meditation: "Descansar na onisciência de Deus é saber que somos inteiramente conhecidos e profundamente amados." },
      { day: 7, bookId: "proverbios", chapter: 3, title: "Veredas de Delícias e Paz", meditation: "Entregue seus planos ao Senhor de todo o coração e receba a sabedoria mais preciosa que rubis." }
    ]
  },
  {
    id: "ensinamentos-cristo",
    title: "Nos Passos do Mestre: Evangelhos e Amor",
    category: "Vida Cristã",
    durationLabel: "7 Dias",
    dailyMinutes: "10 min / dia",
    description: "Leitura meditativa dos discursos centrais de Jesus em Mateus e João, culminando na ética da graça e do amor em Paulo.",
    readings: [
      { day: 1, bookId: "mateus", chapter: 5, title: "As Bem-Aventuranças: Sal e Luz", meditation: "Os valores do Reino invertem as ambições humanas, exaltando a mansidão, a misericórdia e a pureza." },
      { day: 2, bookId: "mateus", chapter: 6, title: "O Pai Nosso e os Lírios do Campo", meditation: "A oração secreta liberta o coração da ostentação e da ansiedade pelo amanhã." },
      { day: 3, bookId: "joao", chapter: 1, title: "A Luz Verdadeira que Ilumina o Mundo", meditation: "Receber o Verbo é nascer para a dignidade de filhos de Deus." },
      { day: 4, bookId: "joao", chapter: 14, title: "Não se Turbe o Vosso Coração", meditation: "Cristo se apresenta como o Caminho vivo, a Verdade plena e a Vida eterna." },
      { day: 5, bookId: "joao", chapter: 15, title: "Permanecer na Videira Verdadeira", meditation: "O fruto espiritual amadurece na constância silenciosa da comunhão com Cristo." },
      { day: 6, bookId: "1corintios", chapter: 13, title: "O Caminho Sobremodo Excelente do Amor", meditation: "Acima de toda eloquência e conhecimento permanece o amor paciente e benigno." },
      { day: 7, bookId: "romanos", chapter: 12, title: "Renovação da Mente e Paz Fraternal", meditation: "Vença o mal com o bem e faça da rotina diária uma oferta viva de gratidão." }
    ]
  }
];
