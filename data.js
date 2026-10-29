// Conteúdo do Presença. Para adicionar ou editar desafios, mexa só neste arquivo.
// As referências (§) apontam para os parágrafos da encíclica Magnifica Humanitas (Leão XIV, 2026).

const TRILHAS = {
  vieses: {
    nome: 'Vieses',
    ameaca: 'Reproduzir vieses',
    resumo: 'Nenhum sistema é neutro. Aprenda a enxergar além dos rótulos, os da máquina e os seus.',
    explicacao: 'Sistemas de IA carregam os critérios culturais de quem os criou e treinou. Podem reforçar estereótipos e penalizar grupos inteiros enquanto parecem objetivos e neutros.',
    refs: '§80, §100, §102',
    cor: '#10A37F', suave: '#DDF4EC', icone: 'scale'
  },
  privacidade: {
    nome: 'Privacidade',
    ameaca: 'Violar a privacidade',
    resumo: 'Seus dados contam quem você é. Cuide do que entrega e para quem.',
    explicacao: 'O controle dos dados está concentrado em poucos grandes atores. A encíclica pede normas que protejam os dados pessoais e alerta para a extração de dados como nova forma de domínio.',
    refs: '§108, §137, §178',
    cor: '#3B82F6', suave: '#E3EEFF', icone: 'lock'
  },
  vigilancia: {
    nome: 'Vigilância',
    ameaca: 'Ampliar a vigilância',
    resumo: 'Algoritmos observam para prever e orientar. Recupere o controle da sua atenção.',
    explicacao: 'A coleta massiva de dados permite traçar perfis e orientar comportamentos. A pessoa passa a ser tratada como um recurso a otimizar, e não como alguém livre.',
    refs: '§171, §172',
    cor: '#8B5CF6', suave: '#EEE7FE', icone: 'eye'
  },
  relacoes: {
    nome: 'Relações',
    ameaca: 'Substituir relações humanas',
    resumo: 'Máquinas podem simular empatia, mas não amam. Volte para perto de quem está ao seu lado.',
    explicacao: 'A máquina pode simular empatia, mas não vive experiências nem ama. A palavra simulada não constrói relação, e o coração humano precisa de uma proximidade que nada substitui.',
    refs: '§99, §100, §239',
    cor: '#EF6A5B', suave: '#FFE8E3', icone: 'heart'
  }
};

const LIVRE = { nome: 'Momento livre', cor: '#E2A12B', suave: '#FDF1D8', icone: 'sparkle' };

const DESAFIOS = [
  // Vieses
  { id: 'v1', trilha: 'vieses', titulo: 'Teste o estereótipo', tempo: '10 min',
    texto: 'Peça a uma IA para descrever ou desenhar "um médico", "uma pessoa de sucesso" e "uma pessoa perigosa". Repare em quem aparece e em quem nunca aparece.',
    porque: 'Os sistemas carregam os critérios culturais de quem os treinou e podem reforçar estereótipos parecendo neutros.', ref: '§100 e §102' },
  { id: 'v2', trilha: 'vieses', titulo: 'A mesma pergunta, duas vezes', tempo: '10 min',
    texto: 'Faça a mesma pergunta polêmica a uma IA de dois jeitos diferentes e compare as respostas. O que mudou só pela forma de perguntar?',
    porque: 'Nenhum algoritmo é neutro: ele carrega escolhas, prioridades e interesses de quem o projetou.', ref: '§100' },
  { id: 'v3', trilha: 'vieses', titulo: 'Escute quem pensa diferente', tempo: '20 min',
    texto: 'Converse com alguém que tem uma opinião bem diferente da sua sobre algum assunto. O objetivo não é convencer, é entender.',
    porque: 'A dignidade de cada pessoa é infinita e vem antes de qualquer opinião ou rótulo.', ref: '§53' },
  { id: 'v4', trilha: 'vieses', titulo: 'Fure a bolha', tempo: '15 min',
    texto: 'Leia, assista ou siga hoje alguém de uma realidade bem diferente da sua: outra região, outra classe social, outra geração.',
    porque: 'A encíclica fala do encontro autêntico com o outro, o estrangeiro, o diferente. O algoritmo não faz isso por nós.', ref: '§220' },
  { id: 'v5', trilha: 'vieses', titulo: 'Quem fica de fora?', tempo: '15 min',
    texto: 'Pense em um sistema automático que decide coisas sobre pessoas: currículos, crédito, notas, recomendações. Quem ele poderia prejudicar? Converse sobre isso com alguém.',
    porque: 'Grupos inteiros podem ser penalizados por algoritmos opacos que reproduzem preconceitos e discriminações.', ref: '§80' },
  { id: 'v6', trilha: 'vieses', titulo: 'Revise um rótulo seu', tempo: '5 min',
    texto: 'Lembre de um julgamento rápido que você fez sobre alguém esta semana. Dê a essa pessoa uma segunda chance, nem que seja só no pensamento.',
    porque: 'Nenhum sistema, e nenhum olhar, pode tratar certas vidas como menos dignas.', ref: '§104' },

  // Privacidade
  { id: 'p1', trilha: 'privacidade', titulo: 'Faxina de permissões', tempo: '10 min',
    texto: 'Abra as configurações do celular e tire de pelo menos um app uma permissão que ele não precisa: localização, microfone, câmera ou contatos.',
    porque: 'A encíclica pede normas que protejam os dados pessoais, e esse cuidado também começa em nós.', ref: '§137' },
  { id: 'p2', trilha: 'privacidade', titulo: 'O que a internet sabe de mim?', tempo: '10 min',
    texto: 'Pesquise seu nome completo num buscador e veja o que aparece. Tem algo que você preferiria que não estivesse lá?',
    porque: 'Os dados sobre nós são poder. A posse deles não pode ficar só nas mãos de entes privados.', ref: '§108' },
  { id: 'p3', trilha: 'privacidade', titulo: 'Esqueça a conversa', tempo: '5 min',
    texto: 'Apague o histórico de conversas com um assistente de IA ou desative a opção de usar suas conversas para treinar o modelo.',
    porque: 'O controle dos dados está concentrado em poucos grandes atores. Decidir o que você entrega é um ato de liberdade.', ref: '§95 e §108' },
  { id: 'p4', trilha: 'privacidade', titulo: 'Leia antes de aceitar', tempo: '15 min',
    texto: 'Escolha um app que você usa todo dia e leia o resumo da política de privacidade. Descubra pelo menos uma coisa que ele coleta sobre você.',
    porque: 'Transparência sobre dados e algoritmos é condição para uma tecnologia a serviço da pessoa.', ref: '§71' },
  { id: 'p5', trilha: 'privacidade', titulo: 'Antes de postar, pare', tempo: '1 dia',
    texto: 'Antes de postar qualquer coisa hoje, pergunte: eu mostraria isso para um desconhecido? Se a resposta for não, guarde só para quem você ama.',
    porque: 'Extrair dados da vida de populações inteiras é uma nova forma de domínio. Seu cotidiano não é matéria-prima.', ref: '§178' },
  { id: 'p6', trilha: 'privacidade', titulo: 'Desconecte o que não usa', tempo: '10 min',
    texto: 'Revise quais apps e sites têm acesso à sua conta Google, Apple ou de redes sociais e remova os que você não usa mais.',
    porque: 'Cuidar dos próprios dados é cuidar de si e de quem aparece neles junto com você.', ref: '§137' },

  // Vigilância
  { id: 'g1', trilha: 'vigilancia', titulo: 'Encare seu tempo de tela', tempo: '5 min',
    texto: 'Abra o relatório de tempo de tela da sua semana. Escolha um app para usar menos nos próximos dias.',
    porque: 'A encíclica fala em uma "higiene da atenção": cuidar de onde colocamos o nosso olhar.', ref: '§146' },
  { id: 'g2', trilha: 'vigilancia', titulo: 'Uma tarde sem redes', tempo: '1 tarde',
    texto: 'Passe uma tarde inteira sem abrir nenhuma rede social. Repare no que você faz com esse tempo.',
    porque: 'A pessoa não é um objeto manipulável nem um recurso a otimizar.', ref: '§172' },
  { id: 'g3', trilha: 'vigilancia', titulo: 'Por que estou vendo isso?', tempo: '5 min',
    texto: 'Em um anúncio que aparecer para você, toque em "por que estou vendo isso?". Descubra como a plataforma te classificou.',
    porque: 'A coleta massiva de dados permite traçar perfis e orientar comportamentos.', ref: '§171' },
  { id: 'g4', trilha: 'vigilancia', titulo: 'Silencie as notificações', tempo: '5 min',
    texto: 'Desative as notificações dos três apps que mais te interrompem. Você decide quando olhar, não eles.',
    porque: 'Liberdade também é proteger a própria atenção contra a dependência.', ref: 'cap. IV' },
  { id: 'g5', trilha: 'vigilancia', titulo: 'Você escolhe o que ver', tempo: '30 min',
    texto: 'Hoje, em vez de deixar o feed decidir, vá atrás do que você quer: um livro, um assunto pesquisado, um canal escolhido por você.',
    porque: 'A forma como as plataformas decidem o que fica visível molda nossas escolhas sem que a gente perceba.', ref: '§171' },
  { id: 'g6', trilha: 'vigilancia', titulo: 'Faça sem a IA', tempo: '30 min',
    texto: 'Escolha uma tarefa que você pediria para uma IA fazer e faça você mesmo hoje. Repare no que você aprendeu no caminho.',
    porque: 'É preciso educar para decidir quando e em que situações não usar a IA.', ref: '§140' },

  // Relações
  { id: 'r1', trilha: 'relacoes', titulo: 'Mesa sem tela', tempo: '1 refeição',
    texto: 'Faça uma refeição com alguém deixando o celular em outro cômodo. Só conversa, sem pressa.',
    porque: 'O coração humano precisa de proximidade. A encíclica pede para preservar a mesa partilhada.', ref: '§239' },
  { id: 'r2', trilha: 'relacoes', titulo: 'Ligue em vez de mandar áudio', tempo: '10 min',
    texto: 'Escolha alguém com quem você só fala por mensagem e faça uma ligação. Pode ser curtinha.',
    porque: 'Quando a palavra é simulada, e não vivida de verdade, ela não constrói relação.', ref: '§100' },
  { id: 'r3', trilha: 'relacoes', titulo: 'Visite quem está só', tempo: '30 min',
    texto: 'Visite ou ligue para alguém que mora sozinho: avó, avô, vizinho, um amigo distante. Pergunte como a pessoa está de verdade.',
    porque: 'Fazer companhia a quem está só é um gesto que nenhuma máquina substitui.', ref: '§114 e §239' },
  { id: 'r4', trilha: 'relacoes', titulo: 'Pergunte para uma pessoa', tempo: '5 min',
    texto: 'Na próxima dúvida que você levaria a um chatbot, pergunte a alguém: um colega, um professor, alguém da família.',
    porque: 'A máquina pode simular empatia ou entendimento, mas não vive experiências nem ama.', ref: '§99' },
  { id: 'r5', trilha: 'relacoes', titulo: 'Obrigado olho no olho', tempo: '2 min',
    texto: 'Agradeça pessoalmente alguém que costuma passar despercebido: o porteiro, quem trabalha na cantina, o motorista. Diga o nome se souber.',
    porque: 'Reconhecer o outro como pessoa, e não como função, é o começo de todo cuidado.', ref: '§114' },
  { id: 'r6', trilha: 'relacoes', titulo: 'Puxe conversa', tempo: '15 min',
    texto: 'Converse com alguém da sua turma ou do trabalho com quem você nunca falou de verdade. Pergunte algo além do "tudo bem?".',
    porque: 'A cultura do encontro nasce quando saímos de nós mesmos e vamos ao outro.', ref: '§62 e §220' }
];

const FRASES = [
  { t: 'A máquina pode simular empatia, mas não vive experiências nem ama.', ref: '§99' },
  { t: 'A dignidade de cada pessoa é infinita, e nenhum sistema pode medi-la.', ref: '§53 e §104' },
  { t: 'Saber cuidar uns dos outros se aprende na experiência concreta.', ref: '§114' },
  { t: 'A pessoa nunca deve ser tratada como um recurso a otimizar.', ref: '§172' },
  { t: 'Também é preciso aprender quando não usar a inteligência artificial.', ref: '§140' },
  { t: 'Nenhum sistema é neutro: ele carrega as escolhas de quem o criou.', ref: '§100' },
  { t: 'O coração humano precisa de uma proximidade que nada substitui.', ref: '§239' },
  { t: 'A verdade é um bem comum, e não propriedade de quem detém o poder.', ref: '§137' },
  { t: 'Ninguém se salva sozinho.', ref: '§73' }
];

const HUMORES = [
  { id: 'leve', emoji: '😌', nome: 'Leve' },
  { id: 'feliz', emoji: '😄', nome: 'Feliz' },
  { id: 'tocado', emoji: '💛', nome: 'Tocado' },
  { id: 'pensativo', emoji: '🤔', nome: 'Pensativo' },
  { id: 'desafiado', emoji: '😅', nome: 'Desafiado' }
];

const INCENTIVOS = [
  'Isso foi presença de verdade.',
  'Pequenos gestos mudam o dia de alguém. Hoje foi a sua vez.',
  'Você escolheu o humano. Que orgulho!',
  'Mais um passo. Você está construindo algo bonito.',
  'O mundo fica um pouco melhor quando alguém faz o que você acabou de fazer.',
  'Você mostrou que a tecnologia não manda em você.'
];

const VALORES = [
  { emoji: '💎', nome: 'Dignidade', texto: 'Cada pessoa vale por quem é, não pelos dados que gera.' },
  { emoji: '🌱', nome: 'Cuidado com a vida', texto: 'Gestos concretos de atenção a quem está perto, sobretudo a quem está só.' },
  { emoji: '🧭', nome: 'Ética', texto: 'Usar a tecnologia com consciência e saber quando não usá-la.' },
  { emoji: '🤝', nome: 'Solidariedade', texto: 'Olhar para quem os sistemas automáticos deixam de fora.' },
  { emoji: '☕', nome: 'Cultura do encontro', texto: 'Trocar a tela pelo rosto do outro, sem pressa.' }
];

const _unicos = (s, t) => new Set(s.registros.filter(r => r.desafioId && (!t || r.trilha === t)).map(r => r.desafioId)).size;

const CONQUISTAS = [
  { id: 'primeiro', emoji: '🌱', nome: 'Primeiro gesto', desc: 'Conclua seu primeiro desafio.', meta: 1, valor: s => s.registros.filter(r => r.desafioId).length },
  { id: 'cinco', emoji: '🚀', nome: 'Em movimento', desc: 'Conclua 5 desafios.', meta: 5, valor: s => s.registros.filter(r => r.desafioId).length },
  { id: 'explorador', emoji: '🧭', nome: 'Explorador', desc: 'Conclua um desafio de cada trilha.', meta: 4, valor: s => Object.keys(TRILHAS).filter(t => _unicos(s, t) > 0).length },
  { id: 'semrotulos', emoji: '⚖️', nome: 'Sem rótulos', desc: 'Conclua 3 desafios da trilha Vieses.', meta: 3, valor: s => _unicos(s, 'vieses') },
  { id: 'guardiao', emoji: '🛡️', nome: 'Guardião dos dados', desc: 'Conclua 3 desafios da trilha Privacidade.', meta: 3, valor: s => _unicos(s, 'privacidade') },
  { id: 'olhar', emoji: '👁️', nome: 'Olhar livre', desc: 'Conclua 3 desafios da trilha Vigilância.', meta: 3, valor: s => _unicos(s, 'vigilancia') },
  { id: 'coracao', emoji: '❤️', nome: 'Coração presente', desc: 'Conclua 3 desafios da trilha Relações.', meta: 3, valor: s => _unicos(s, 'relacoes') },
  { id: 'escritor', emoji: '📖', nome: 'Diário vivo', desc: 'Escreva 3 anotações no diário.', meta: 3, valor: s => s.registros.filter(r => r.nota && r.nota.trim()).length },
  { id: 'pleno', emoji: '✨', nome: 'Presença plena', desc: 'Conclua 12 desafios diferentes.', meta: 12, valor: s => _unicos(s) }
];
