(function () {
  'use strict';

  const CHAVE = 'presenca:v1';
  const TOTAL = DESAFIOS.length;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONS = {
    heart: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
    lock: svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
    eye: svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'),
    scale: svg('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>'),
    sparkle: svg('<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>'),
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    arrow: svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    shuffle: svg('<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.97a4 4 0 0 0 3.3-1.7l5.45-7.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.97a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.04a4 4 0 0 1-3.3-1.8l-.36-.45"/>'),
    clock: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    trash: svg('<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
    plus: svg('<path d="M5 12h14"/><path d="M12 5v14"/>'),
    home: svg('<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z"/>'),
    book: svg('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>'),
    trophy: svg('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'),
    info: svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
    quote: svg('<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 0-1 1.03V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>'),
    refresh: svg('<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>')
  };

  const ABAS = [
    ['inicio', 'Início', 'home'],
    ['desafios', 'Desafios', 'sparkle'],
    ['diario', 'Diário', 'book'],
    ['conquistas', 'Conquistas', 'trophy'],
    ['sobre', 'Sobre', 'info']
  ];

  // ---------- Estado ----------
  const inicial = () => ({ nome: '', boasVindas: false, atual: null, registros: [], conquistas: [] });

  function carregar() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (bruto) return { ...inicial(), ...JSON.parse(bruto) };
    } catch (e) { /* sem armazenamento: segue só em memória */ }
    return inicial();
  }

  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(state)); } catch (e) { /* idem */ }
  }

  let state = carregar();
  let view = 'inicio';
  let filtroDesafio = 'todas';
  let filtroDiario = 'todas';
  let sorteado = null;
  let sorteando = false;
  let fraseIdx = new Date().getDate() % FRASES.length;
  let modalCtx = {};
  let modalTravado = false;
  let modalToken = 0;

  // ---------- Utilidades ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const desafio = id => DESAFIOS.find(d => d.id === id);
  const trilhaDe = k => TRILHAS[k] || LIVRE;
  const feitos = () => new Set(state.registros.filter(r => r.desafioId).map(r => r.desafioId));
  const totalNaTrilha = k => DESAFIOS.filter(d => d.trilha === k).length;
  const feitosNaTrilha = k => { const f = feitos(); return DESAFIOS.filter(d => d.trilha === k && f.has(d.id)).length; };
  const aleatorio = lista => lista[Math.floor(Math.random() * lista.length)];
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const cores = t => `--cor:${t.cor};--suave:${t.suave}`;

  function saudacao() {
    const h = new Date().getHours();
    return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  }

  function mesmoDia(a, b) { return new Date(a).toDateString() === new Date(b).toDateString(); }

  function dataCurta(ts) {
    const d = new Date(ts);
    const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (mesmoDia(ts, Date.now())) return `Hoje · ${hora}`;
    return `${d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · ${hora}`;
  }

  function quando(ts) {
    const hora = new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return mesmoDia(ts, Date.now()) ? `hoje às ${hora}` : `em ${new Date(ts).toLocaleDateString('pt-BR')}`;
  }

  function checarConquistas() {
    const novas = CONQUISTAS.filter(c => !state.conquistas.includes(c.id) && c.valor(state) >= c.meta);
    novas.forEach(c => state.conquistas.push(c.id));
    return novas;
  }

  // ---------- Peças de interface ----------
  function anel(valor, total, cor, tam, esp, conteudo) {
    const r = (tam - esp) / 2;
    const c = 2 * Math.PI * r;
    const p = total ? Math.min(valor / total, 1) : 0;
    return `<div class="anel" style="width:${tam}px;height:${tam}px">
      <svg viewBox="0 0 ${tam} ${tam}">
        <circle class="anel-fundo" cx="${tam / 2}" cy="${tam / 2}" r="${r}" stroke-width="${esp}"></circle>
        <circle class="anel-valor ${p === 0 ? 'zero' : ''}" cx="${tam / 2}" cy="${tam / 2}" r="${r}" stroke-width="${esp}"
          stroke="${cor}" stroke-dasharray="${c}" stroke-dashoffset="${c}" data-offset="${c * (1 - p)}"></circle>
      </svg>
      <div class="anel-conteudo">${conteudo}</div>
    </div>`;
  }

  const tag = k => { const t = trilhaDe(k); return `<span class="tag" style="${cores(t)}">${ICONS[t.icone]}${t.nome}</span>`; };
  const tempo = d => `<span class="tempo">${ICONS.clock}${d.tempo}</span>`;
  const porque = d => `<div class="porque"><span>Por que isso importa</span><p>${d.porque}</p><small>Inspirado em Magnifica Humanitas, ${d.ref}</small></div>`;

  function chips(acao, ativo, comLivre) {
    const itens = [['todas', 'Todas', null], ...Object.entries(TRILHAS).map(([k, t]) => [k, t.nome, t.cor])];
    if (comLivre) itens.push(['livre', 'Momentos livres', LIVRE.cor]);
    return `<div class="chips">${itens.map(([k, n, c]) =>
      `<button class="chip ${ativo === k ? 'ativo' : ''}" ${c ? `style="--cor:${c}"` : ''} data-action="${acao}" data-value="${k}">${c ? '<i></i>' : ''}${n}</button>`
    ).join('')}</div>`;
  }

  function humoresHTML() {
    return `<div class="humores">${HUMORES.map(h =>
      `<button class="humor" data-action="humor" data-value="${h.id}"><span>${h.emoji}</span><small>${h.nome}</small></button>`
    ).join('')}</div>`;
  }

  function cartaoAtual(completo) {
    const d = desafio(state.atual.id);
    const t = TRILHAS[d.trilha];
    return `<div class="cartao-atual" style="${cores(t)}">
      <div class="ca-cabeca"><span class="pulso"></span>Seu desafio de agora · aceito ${quando(state.atual.desde)}</div>
      <div class="ca-corpo">
        <span class="icone-trilha grande">${ICONS[t.icone]}</span>
        <div>
          <div class="cs-topo">${tag(d.trilha)}${tempo(d)}</div>
          <h2>${d.titulo}</h2>
          <p class="cs-texto">${d.texto}</p>
        </div>
      </div>
      ${completo ? porque(d) : ''}
      <div class="acoes">
        <button class="btn btn-cor" data-action="concluir">${ICONS.check} Concluí!</button>
        <button class="btn btn-fantasma" data-action="desistir">Trocar desafio</button>
      </div>
    </div>`;
  }

  // ---------- Telas ----------
  function vInicio() {
    const f = feitos();
    const recentes = state.registros.slice(-3).reverse();
    return `<section class="view">
      <div class="hero">
        <div>
          <p class="eyebrow">${saudacao()}${state.nome ? ', ' + esc(state.nome) : ''} 👋</p>
          <h1 class="display">Pequenos gestos para continuar <span class="grad">humano</span> na era da IA.</h1>
          <p class="lead">Sorteie um desafio, viva no mundo real e guarde o momento no seu diário.</p>
          <div class="acoes">
            <button class="btn btn-primario btn-grande" data-nav="desafios">${ICONS.sparkle} ${state.atual ? 'Ver meu desafio' : 'Quero um desafio'}</button>
            <button class="btn btn-fantasma btn-grande" data-nav="sobre">Por que isso importa?</button>
          </div>
        </div>
        <div class="hero-anel">
          ${anel(f.size, TOTAL, 'url(#grad-anel)', 190, 14, `<strong data-count="${f.size}">${f.size}</strong><span>de ${TOTAL} gestos</span>`)}
        </div>
      </div>

      ${state.atual ? cartaoAtual(false) : ''}

      <div class="secao-topo"><h2>Suas trilhas</h2><p>Cada trilha responde a uma forma de a IA ameaçar a dignidade humana.</p></div>
      <div class="grade-trilhas">
        ${Object.entries(TRILHAS).map(([k, t], i) => {
          const n = feitosNaTrilha(k), tot = totalNaTrilha(k);
          return `<button class="cartao-trilha" style="${cores(t)};--i:${i}" data-action="explorar" data-value="${k}">
            <div class="ct-topo"><span class="icone-trilha">${ICONS[t.icone]}</span>${anel(n, tot, t.cor, 54, 5, `<small>${n}/${tot}</small>`)}</div>
            <p class="ameaca">Contra: ${t.ameaca.toLowerCase()}</p>
            <h3>${t.nome}</h3>
            <p class="resumo-t">${t.resumo}</p>
            <span class="link">Explorar ${ICONS.arrow}</span>
          </button>`;
        }).join('')}
      </div>

      <div class="duas-colunas">
        <div class="cartao frase">
          <div class="frase-icone">${ICONS.quote}</div>
          <p class="eyebrow">Para pensar hoje</p>
          <div id="frase-texto">${fraseHTML(FRASES[fraseIdx])}</div>
          <button class="btn-claro" data-action="frase">${ICONS.refresh} Outra reflexão</button>
        </div>
        <div class="cartao recentes">
          <div class="rec-topo"><h3>Últimos momentos</h3><button class="link-btn" data-nav="diario">Ver diário ${ICONS.arrow}</button></div>
          ${recentes.length ? `<ul>${recentes.map(r => {
            const t = trilhaDe(r.trilha), h = HUMORES.find(x => x.id === r.humor);
            return `<li style="${cores(t)}"><span class="rec-ponto"></span><div><strong>${esc(r.titulo)}</strong><small>${dataCurta(r.data)}</small></div><span class="rec-humor">${h ? h.emoji : ''}</span></li>`;
          }).join('')}</ul>` : `<div class="rec-vazio"><span>📝</span><p>Seus momentos vão aparecer aqui depois do primeiro desafio.</p></div>`}
        </div>
      </div>
    </section>`;
  }

  const fraseHTML = f => `<p class="frase-t">${f.t}</p><small>Inspirado em Magnifica Humanitas, ${f.ref}</small>`;

  function cartaoSorteio() {
    const d = sorteado && desafio(sorteado);
    if (!d) {
      const onde = filtroDesafio === 'todas' ? 'entre todas as trilhas' : `na trilha ${TRILHAS[filtroDesafio].nome}`;
      return `<div class="cartao-sorteio vazio" id="cartao-sorteio">
        <div class="dado">${ICONS.shuffle}</div>
        <h2 id="sorteio-titulo">Pronto para um gesto?</h2>
        <p>Vamos sortear ${onde}.</p>
        <button class="btn btn-primario btn-grande" data-action="sortear">${ICONS.sparkle} Sortear desafio</button>
      </div>`;
    }
    const t = TRILHAS[d.trilha];
    const vezes = state.registros.filter(r => r.desafioId === d.id).length;
    return `<div class="cartao-sorteio revelado" id="cartao-sorteio" style="${cores(t)}">
      <div class="cs-topo">${tag(d.trilha)}${tempo(d)}</div>
      <h2 id="sorteio-titulo">${d.titulo}</h2>
      <p class="cs-texto">${d.texto}</p>
      ${porque(d)}
      ${vezes ? `<p class="feito-nota">${ICONS.check} Você já fez este desafio ${vezes === 1 ? '1 vez' : vezes + ' vezes'}.</p>` : ''}
      <div class="acoes">
        <button class="btn btn-cor btn-grande" data-action="aceitar" data-id="${d.id}">${ICONS.check} Aceitar desafio</button>
        <button class="btn btn-fantasma btn-grande" data-action="sortear">${ICONS.shuffle} Sortear outro</button>
      </div>
    </div>`;
  }

  function vDesafios() {
    const f = feitos();
    const lista = DESAFIOS.filter(d => filtroDesafio === 'todas' || d.trilha === filtroDesafio);
    return `<section class="view">
      <header class="cabecalho">
        <p class="eyebrow">Desafios</p>
        <h1 class="titulo">Qual gesto você topa hoje?</h1>
        <p class="lead">Escolha uma trilha e deixe o sorteio te surpreender. Ou escolha direto na lista abaixo.</p>
      </header>
      ${chips('filtro-desafio', filtroDesafio)}
      <div class="palco">${state.atual ? cartaoAtual(true) : cartaoSorteio()}</div>
      <div class="secao-topo"><h2>Todos os desafios</h2><p>${f.size} de ${TOTAL} concluídos</p></div>
      <div class="grade-desafios">
        ${lista.map((d, i) => {
          const t = TRILHAS[d.trilha];
          const feito = f.has(d.id);
          const atual = state.atual && state.atual.id === d.id;
          return `<button class="mini-desafio ${feito ? 'feito' : ''} ${atual ? 'atual' : ''}" style="${cores(t)};--i:${i}" data-action="ver" data-id="${d.id}">
            <span class="md-icone">${feito ? ICONS.check : ICONS[t.icone]}</span>
            <span class="md-texto"><strong>${d.titulo}</strong><small>${atual ? 'Em andamento' : t.nome} · ${d.tempo}</small></span>
          </button>`;
        }).join('')}
      </div>
    </section>`;
  }

  function vDiario() {
    const regs = state.registros.filter(r => filtroDiario === 'todas' || r.trilha === filtroDiario).slice().reverse();
    const total = state.registros.length;
    const dias = new Set(state.registros.map(r => new Date(r.data).toDateString())).size;
    const contagem = Object.keys(TRILHAS).map(k => [k, state.registros.filter(r => r.trilha === k).length]);
    const max = Math.max(1, ...contagem.map(c => c[1]));
    return `<section class="view">
      <header class="cabecalho linha">
        <div>
          <p class="eyebrow">Diário</p>
          <h1 class="titulo">Seus momentos de presença</h1>
          <p class="lead">Só você vê isto. Fica guardado apenas neste navegador.</p>
        </div>
        <button class="btn btn-primario" data-action="novo-momento">${ICONS.plus} Registrar momento</button>
      </header>
      <div class="resumo">
        <div class="cartao stat"><strong data-count="${total}">${total}</strong><span>${total === 1 ? 'registro' : 'registros'}</span></div>
        <div class="cartao stat"><strong data-count="${dias}">${dias}</strong><span>${dias === 1 ? 'dia' : 'dias'} com presença</span></div>
        <div class="cartao barras">
          ${contagem.map(([k, n]) => `<div class="barra" style="--cor:${TRILHAS[k].cor}"><span>${TRILHAS[k].nome}</span><div class="trilho"><i style="width:${n / max * 100}%"></i></div><b>${n}</b></div>`).join('')}
        </div>
      </div>
      ${chips('filtro-diario', filtroDiario, true)}
      ${regs.length ? `<ol class="linha-tempo">${regs.map(registroHTML).join('')}</ol>` : vazioDiario()}
    </section>`;
  }

  function registroHTML(r, i) {
    const t = trilhaDe(r.trilha), h = HUMORES.find(x => x.id === r.humor);
    return `<li class="registro" data-reg="${r.id}" style="${cores(t)};--i:${i}">
      <span class="ponto"></span>
      <div class="cartao reg-corpo">
        <div class="reg-topo">${tag(r.trilha)}<time>${dataCurta(r.data)}</time>${h ? `<span class="reg-humor" title="${h.nome}">${h.emoji}</span>` : ''}</div>
        <h3>${esc(r.titulo)}</h3>
        ${r.nota ? `<p>${esc(r.nota)}</p>` : '<p class="sem-nota">Sem anotação.</p>'}
        <button class="icone-btn apagar" data-action="apagar" data-id="${r.id}" aria-label="Apagar registro">${ICONS.trash}</button>
      </div>
    </li>`;
  }

  function vazioDiario() {
    const filtrando = filtroDiario !== 'todas' && state.registros.length;
    return `<div class="cartao vazio-estado">
      <span>${filtrando ? '🔍' : '📖'}</span>
      <h3>${filtrando ? 'Nada por aqui ainda' : 'Seu diário está esperando'}</h3>
      <p>${filtrando ? 'Você ainda não tem registros nesta trilha.' : 'Conclua um desafio ou registre um momento de presença que você viveu.'}</p>
      <div class="acoes centro"><button class="btn btn-primario" data-nav="desafios">${ICONS.sparkle} Ir para os desafios</button></div>
    </div>`;
  }

  function vConquistas() {
    const n = state.conquistas.length;
    return `<section class="view">
      <header class="cabecalho">
        <p class="eyebrow">Conquistas</p>
        <h1 class="titulo">Cada passo conta</h1>
        <p class="lead">${n} de ${CONQUISTAS.length} desbloqueadas. ${n === 0 ? 'A primeira está a um gesto de distância.' : 'Continue assim!'}</p>
      </header>
      <div class="grade-conquistas">
        ${CONQUISTAS.map((c, i) => {
          const v = Math.min(c.valor(state), c.meta);
          const ok = state.conquistas.includes(c.id);
          return `<div class="conquista ${ok ? 'ok' : ''}" style="--i:${i}">
            <div class="medalha"><span>${c.emoji}</span></div>
            <h3>${c.nome}</h3>
            <p>${c.desc}</p>
            <div class="progresso"><i style="width:${(ok ? 1 : v / c.meta) * 100}%"></i></div>
            <small>${ok ? 'Desbloqueada ✓' : `${v}/${c.meta}`}</small>
          </div>`;
        }).join('')}
      </div>
    </section>`;
  }

  function vSobre() {
    return `<section class="view">
      <header class="cabecalho">
        <p class="eyebrow">Sobre o projeto</p>
        <h1 class="titulo">Tecnologia a serviço da pessoa, <span class="grad">não o contrário</span>.</h1>
        <p class="lead">O Presença nasceu de uma pergunta: como viver com a inteligência artificial sem perder o que nos torna humanos? A proposta se inspira na encíclica <em>Magnifica Humanitas</em>, do Papa Leão XIV (2026), sobre a salvaguarda da pessoa humana na era da IA.</p>
      </header>

      <div class="secao-topo"><h2>Quatro ameaças à dignidade</h2><p>Cada uma virou uma trilha de desafios.</p></div>
      <div class="grade-ameacas">
        ${Object.values(TRILHAS).map((t, i) => `<div class="cartao ameaca-cartao" style="${cores(t)};--i:${i}">
          <div class="ac-topo"><span class="icone-trilha">${ICONS[t.icone]}</span><div><small>Ameaça ${i + 1}</small><h3>${t.ameaca}</h3></div></div>
          <p>${t.explicacao}</p>
          <div class="ac-rodape"><span>Resposta: trilha ${t.nome}</span><small>MH ${t.refs}</small></div>
        </div>`).join('')}
      </div>

      <div class="secao-topo"><h2>O que o Presença quer cultivar</h2></div>
      <div class="valores">
        ${VALORES.map((v, i) => `<div class="cartao valor" style="--i:${i}"><span class="valor-emoji">${v.emoji}</span><h3>${v.nome}</h3><p>${v.texto}</p></div>`).join('')}
      </div>

      <div class="cartao dados-cartao">
        <span class="icone-trilha grande" style="${cores(TRILHAS.privacidade)}">${ICONS.lock}</span>
        <div>
          <h3>Seus dados ficam com você</h3>
          <p>Sem login, sem servidor, sem rastreamento. Tudo o que você registra fica guardado só neste navegador.</p>
        </div>
        <div class="acoes">
          <button class="btn btn-fantasma" data-action="mudar-nome">Mudar meu nome</button>
          <button class="btn btn-perigo" data-action="resetar">${ICONS.trash} Apagar meus dados</button>
        </div>
      </div>
      <p class="rodape">Projeto acadêmico · Tecnologia, Humanismo Cristão e Responsabilidade Social</p>
    </section>`;
  }

  const VIEWS = { inicio: vInicio, desafios: vDesafios, diario: vDiario, conquistas: vConquistas, sobre: vSobre };

  // ---------- Renderização ----------
  function render(modo) {
    const app = $('#app');
    app.innerHTML = VIEWS[view]();
    if (modo) app.firstElementChild.classList.add(modo);
    $$('#abas button').forEach(b => b.classList.toggle('ativa', b.dataset.nav === view));
    moverPilula();
    animarAneis();
    if (modo === 'entrar') contar();
  }

  function ir(destino) {
    if (destino === view) { render(); return; }
    view = destino;
    window.scrollTo({ top: 0, behavior: semMovimento ? 'auto' : 'smooth' });
    render('entrar');
  }

  function moverPilula() {
    const ativa = $('#abas button.ativa');
    const pilula = $('#abas .pilula');
    if (!ativa || !pilula) return;
    pilula.style.width = ativa.offsetWidth + 'px';
    pilula.style.transform = `translateX(${ativa.offsetLeft}px)`;
  }

  function animarAneis() {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $$('.anel-valor').forEach(c => { c.style.strokeDashoffset = c.dataset.offset; });
    }));
  }

  function contar() {
    if (semMovimento) return;
    $$('[data-count]').forEach(el => {
      const fim = +el.dataset.count;
      if (!fim) return;
      const ini = performance.now();
      const passo = t => {
        const p = Math.min(1, (t - ini) / 900);
        el.textContent = Math.round(fim * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(passo);
      };
      el.textContent = '0';
      requestAnimationFrame(passo);
    });
  }

  // ---------- Modal, toast e confete ----------
  function abrirModal(html, classe = '') {
    modalToken++;
    $('#modal-root').innerHTML = `<div class="modal-fundo" data-action="fundo-modal"><div class="modal ${classe}" role="dialog" aria-modal="true">${html}</div></div>`;
    document.body.classList.add('travado');
  }

  function fecharModal(depois) {
    const fundo = $('#modal-root .modal-fundo');
    if (!fundo) { if (depois) depois(); return; }
    const token = modalToken;
    modalTravado = false;
    fundo.classList.add('saindo');
    setTimeout(() => {
      if (token === modalToken) {
        $('#modal-root').innerHTML = '';
        document.body.classList.remove('travado');
      }
      if (depois) depois();
    }, 190);
  }

  function toast(msg, icone = 'sparkle') {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span class="toast-icone">${ICONS[icone]}</span><span>${msg}</span>`;
    $('#toasts').appendChild(el);
    setTimeout(() => {
      el.classList.add('saindo');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, 3200);
  }

  function confete(qtd = 170) {
    if (semMovimento) return;
    const cv = $('#confete');
    const ctx = cv.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = innerWidth, H = innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.scale(dpr, dpr);
    const paleta = [...Object.values(TRILHAS).map(t => t.cor), LIVRE.cor, '#E8618C'];
    const ps = Array.from({ length: qtd }, () => ({
      x: W / 2 + (Math.random() - .5) * 160,
      y: H * .45,
      vx: (Math.random() - .5) * 16,
      vy: -Math.random() * 15 - 6,
      g: .3 + Math.random() * .12,
      w: 6 + Math.random() * 7,
      h: 9 + Math.random() * 8,
      r: Math.random() * Math.PI,
      vr: (Math.random() - .5) * .3,
      cor: aleatorio(paleta)
    }));
    const DURACAO = 3200;
    const inicio = performance.now();
    let quadro = 0;
    cv.classList.add('ativo');
    (function tick(agora) {
      const decorrido = (agora || performance.now()) - inicio;
      ctx.clearRect(0, 0, W, H);
      quadro++;
      ps.forEach(p => {
        p.vx *= .99; p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, 1 - decorrido / DURACAO);
        ctx.fillStyle = p.cor;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.cos(quadro * .1 + p.r));
        ctx.restore();
      });
      if (decorrido < DURACAO) requestAnimationFrame(tick);
      else { ctx.clearRect(0, 0, W, H); cv.classList.remove('ativo'); }
    })();
  }

  // ---------- Ações ----------
  function sortear() {
    if (sorteando) return;
    const pool = DESAFIOS.filter(d => filtroDesafio === 'todas' || d.trilha === filtroDesafio);
    const f = feitos();
    let candidatos = pool.filter(d => !f.has(d.id) && d.id !== sorteado);
    if (!candidatos.length) candidatos = pool.filter(d => d.id !== sorteado);
    if (!candidatos.length) candidatos = pool;
    const escolhido = aleatorio(candidatos);

    const finalizar = () => {
      sorteando = false;
      sorteado = escolhido.id;
      render();
      const novo = $('#cartao-sorteio');
      if (novo) novo.classList.add('pop');
    };

    const cartao = $('#cartao-sorteio');
    const titulo = $('#sorteio-titulo');
    if (!cartao || semMovimento) { finalizar(); return; }

    sorteando = true;
    cartao.classList.add('embaralhando');
    let passos = 0;
    const timer = setInterval(() => {
      const r = aleatorio(pool);
      titulo.textContent = r.titulo;
      cartao.style.setProperty('--cor', TRILHAS[r.trilha].cor);
      cartao.style.setProperty('--suave', TRILHAS[r.trilha].suave);
      if (++passos >= 14) { clearInterval(timer); finalizar(); }
    }, 75);
  }

  function aceitar(id) {
    const trocou = !!state.atual;
    state.atual = { id, desde: Date.now() };
    sorteado = null;
    salvar();
    fecharModal(() => {
      render();
      const c = $('.cartao-atual');
      if (c) c.classList.add('pop');
      toast(trocou ? 'Desafio trocado. Bora!' : 'Desafio aceito! Você consegue. 💪', 'check');
    });
  }

  function desistir() {
    state.atual = null;
    salvar();
    render();
    toast('Sem culpa! Sorteie outro quando quiser.', 'refresh');
  }

  function abrirDetalhe(id) {
    const d = desafio(id), t = TRILHAS[d.trilha];
    const ehAtual = state.atual && state.atual.id === id;
    const vezes = state.registros.filter(r => r.desafioId === id).length;
    abrirModal(`<div style="${cores(t)}">
      <div class="cs-topo">${tag(d.trilha)}${tempo(d)}</div>
      <h2>${d.titulo}</h2>
      <p class="cs-texto">${d.texto}</p>
      ${porque(d)}
      ${vezes ? `<p class="feito-nota">${ICONS.check} Você já fez este desafio ${vezes === 1 ? '1 vez' : vezes + ' vezes'}.</p>` : ''}
      <div class="acoes">
        ${ehAtual
          ? `<button class="btn btn-cor" data-action="concluir">${ICONS.check} Concluí!</button>`
          : `<button class="btn btn-cor" data-action="aceitar" data-id="${id}">${ICONS.check} ${state.atual ? 'Trocar pelo atual' : 'Aceitar desafio'}</button>`}
        <button class="btn btn-fantasma" data-action="fechar-modal">Fechar</button>
      </div>
    </div>`);
  }

  function abrirConclusao() {
    const d = desafio(state.atual.id), t = TRILHAS[d.trilha];
    modalCtx = { humor: null };
    abrirModal(`<div style="${cores(t)}">
      <p class="eyebrow">Você concluiu</p>
      <h2>${d.titulo}</h2>
      <label class="rotulo">Como você se sentiu?</label>
      ${humoresHTML()}
      <label class="rotulo" for="nota">Escreva uma linha sobre esse momento <small>(opcional)</small></label>
      <textarea id="nota" rows="3" maxlength="400" placeholder="Ex.: Liguei para a minha avó e ela riu muito quando..."></textarea>
      <div class="acoes">
        <button class="btn btn-cor" data-action="salvar-conclusao">${ICONS.book} Guardar no diário</button>
        <button class="btn btn-fantasma" data-action="fechar-modal">Voltar</button>
      </div>
    </div>`);
  }

  function selecionarHumor(el) {
    $$('.modal .humor').forEach(b => b.classList.toggle('sel', b === el && !el.classList.contains('sel')));
    modalCtx.humor = el.classList.contains('sel') ? el.dataset.value : null;
  }

  function salvarConclusao() {
    const d = desafio(state.atual.id);
    state.registros.push({
      id: uid(), desafioId: d.id, trilha: d.trilha, titulo: d.titulo,
      humor: modalCtx.humor, nota: $('#nota').value.trim(), data: Date.now()
    });
    state.atual = null;
    sorteado = null;
    const novas = checarConquistas();
    salvar();
    fecharModal(() => {
      render();
      confete();
      celebrar(d, novas);
    });
  }

  function celebrar(d, novas) {
    const t = TRILHAS[d.trilha];
    abrirModal(`<div class="celebracao">
      <div class="selo">${ICONS.check}</div>
      <h2>Gesto concluído!</h2>
      <p class="incentivo">${aleatorio(INCENTIVOS)}</p>
      <div class="cel-stats">
        <div><strong>${feitos().size}/${TOTAL}</strong><span>gestos diferentes</span></div>
        <div style="${cores(t)}"><strong style="color:var(--cor)">${feitosNaTrilha(d.trilha)}/${totalNaTrilha(d.trilha)}</strong><span>na trilha ${t.nome}</span></div>
      </div>
      ${novas.map((c, i) => `<div class="cel-conq" style="animation-delay:${.5 + i * .15}s"><span>${c.emoji}</span><div><small>Nova conquista</small><strong>${c.nome}</strong></div></div>`).join('')}
      <div class="acoes centro">
        <button class="btn btn-primario" data-action="novo-desafio">${ICONS.sparkle} Outro desafio</button>
        <button class="btn btn-fantasma" data-action="ver-diario">${ICONS.book} Ver meu diário</button>
      </div>
    </div>`, 'pequeno');
  }

  function abrirMomento() {
    modalCtx = { humor: null, trilha: 'livre' };
    const opcoes = [['livre', LIVRE], ...Object.entries(TRILHAS)];
    abrirModal(`<div id="form-momento" style="${cores(LIVRE)}">
      <p class="eyebrow">Diário</p>
      <h2>Registrar um momento</h2>
      <p class="sub">Viveu algo de presença fora dos desafios? Guarde aqui.</p>
      <label class="rotulo" for="m-titulo">O que aconteceu?</label>
      <input type="text" id="m-titulo" maxlength="80" placeholder="Ex.: Almocei com meus avós no domingo" autocomplete="off">
      <label class="rotulo">Tem a ver com alguma trilha?</label>
      <div class="chips mini">${opcoes.map(([k, t]) =>
        `<button class="chip ${k === 'livre' ? 'ativo' : ''}" style="--cor:${t.cor}" data-action="trilha-momento" data-value="${k}"><i></i>${k === 'livre' ? 'Nenhuma' : t.nome}</button>`
      ).join('')}</div>
      <label class="rotulo">Como você se sentiu?</label>
      ${humoresHTML()}
      <label class="rotulo" for="nota">Quer contar mais? <small>(opcional)</small></label>
      <textarea id="nota" rows="3" maxlength="400" placeholder="Como foi, quem estava junto, o que ficou..."></textarea>
      <div class="acoes">
        <button class="btn btn-cor" data-action="salvar-momento">${ICONS.book} Guardar no diário</button>
        <button class="btn btn-fantasma" data-action="fechar-modal">Cancelar</button>
      </div>
    </div>`);
    setTimeout(() => { const i = $('#m-titulo'); if (i) i.focus(); }, 300);
  }

  function selecionarTrilhaMomento(el) {
    modalCtx.trilha = el.dataset.value;
    $$('.modal [data-action="trilha-momento"]').forEach(b => b.classList.toggle('ativo', b === el));
    const t = trilhaDe(modalCtx.trilha);
    const form = $('#form-momento');
    form.style.setProperty('--cor', t.cor);
    form.style.setProperty('--suave', t.suave);
  }

  function salvarMomento() {
    const campo = $('#m-titulo');
    const titulo = campo.value.trim();
    if (!titulo) {
      campo.classList.remove('erro');
      void campo.offsetWidth;
      campo.classList.add('erro');
      campo.focus();
      return;
    }
    state.registros.push({
      id: uid(), desafioId: null, trilha: modalCtx.trilha, titulo,
      humor: modalCtx.humor, nota: $('#nota').value.trim(), data: Date.now()
    });
    const novas = checarConquistas();
    salvar();
    fecharModal(() => {
      render('lista');
      confete(70);
      toast('Momento guardado no seu diário 💛', 'book');
      novas.forEach((c, i) => setTimeout(() => toast(`Nova conquista: ${c.emoji} ${c.nome}`, 'trophy'), 600 + i * 400));
    });
  }

  function confirmarApagar(id) {
    abrirModal(`<div class="confirmar">
      <div class="confirmar-icone">${ICONS.trash}</div>
      <h2>Apagar este registro?</h2>
      <p>Essa lembrança sai do seu diário e não dá para desfazer.</p>
      <div class="acoes centro">
        <button class="btn btn-perigo" data-action="confirmar-apagar" data-id="${id}">Apagar</button>
        <button class="btn btn-fantasma" data-action="fechar-modal">Manter</button>
      </div>
    </div>`, 'pequeno');
  }

  function apagar(id) {
    fecharModal(() => {
      const li = $(`[data-reg="${id}"]`);
      if (li) li.classList.add('sumir');
      setTimeout(() => {
        state.registros = state.registros.filter(r => r.id !== id);
        salvar();
        render();
        toast('Registro apagado.', 'trash');
      }, semMovimento ? 0 : 340);
    });
  }

  function confirmarReset() {
    abrirModal(`<div class="confirmar">
      <div class="confirmar-icone">${ICONS.trash}</div>
      <h2>Apagar todos os dados?</h2>
      <p>Seu nome, diário, desafios e conquistas serão apagados deste navegador. O Presença volta ao começo.</p>
      <div class="acoes centro">
        <button class="btn btn-perigo" data-action="confirmar-reset">Apagar tudo</button>
        <button class="btn btn-fantasma" data-action="fechar-modal">Cancelar</button>
      </div>
    </div>`, 'pequeno');
  }

  function resetar() {
    state = inicial();
    sorteado = null;
    filtroDesafio = 'todas';
    filtroDiario = 'todas';
    salvar();
    fecharModal(() => {
      view = 'inicio';
      render('entrar');
      abrirBoasVindas(false);
    });
  }

  function abrirBoasVindas(mudar) {
    modalTravado = !mudar;
    abrirModal(`<div class="boas-vindas">
      <div class="logo-grande"></div>
      <h2>${mudar ? 'Qual nome devemos usar?' : 'Boas-vindas ao Presença'}</h2>
      ${mudar ? '' : '<p class="sub">Pequenos desafios para viver a tecnologia sem perder o que nos torna humanos.</p>'}
      <label class="rotulo" for="nome">Como podemos te chamar?</label>
      <input type="text" id="nome" maxlength="30" placeholder="Seu nome ou apelido" value="${esc(state.nome)}" autocomplete="off">
      <div class="acoes centro"><button class="btn btn-primario btn-grande" data-action="salvar-nome">${mudar ? 'Salvar' : 'Começar'} ${ICONS.arrow}</button></div>
      ${mudar ? '' : '<button class="pular" data-action="salvar-nome" data-value="pular">Prefiro não dizer</button>'}
    </div>`, 'pequeno');
    setTimeout(() => { const i = $('#nome'); if (i) i.focus(); }, 350);
  }

  function salvarNome(pular) {
    const campo = $('#nome');
    state.nome = pular ? '' : (campo ? campo.value.trim() : '');
    state.boasVindas = true;
    salvar();
    fecharModal(() => {
      render();
      toast(state.nome ? `Que bom ter você aqui, ${esc(state.nome)}!` : 'Que bom ter você aqui!', 'heart');
    });
  }

  function trocarFrase() {
    const el = $('#frase-texto');
    fraseIdx = (fraseIdx + 1) % FRASES.length;
    if (!el) return;
    el.classList.add('sumindo');
    setTimeout(() => {
      el.innerHTML = fraseHTML(FRASES[fraseIdx]);
      el.classList.remove('sumindo');
    }, 250);
  }

  // ---------- Eventos ----------
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action], [data-nav]');
    if (!el) return;

    if (el.dataset.nav) {
      e.preventDefault();
      ir(el.dataset.nav);
      return;
    }

    const { action, value, id } = el.dataset;
    switch (action) {
      case 'fundo-modal': if (e.target === el && !modalTravado) fecharModal(); break;
      case 'fechar-modal': fecharModal(); break;
      case 'explorar': filtroDesafio = value; sorteado = null; ir('desafios'); break;
      case 'filtro-desafio':
        filtroDesafio = value;
        if (sorteado && value !== 'todas' && desafio(sorteado).trilha !== value) sorteado = null;
        render('lista');
        break;
      case 'sortear': sortear(); break;
      case 'aceitar': aceitar(id); break;
      case 'ver': abrirDetalhe(id); break;
      case 'concluir': fecharModal(abrirConclusao); break;
      case 'desistir': desistir(); break;
      case 'humor': selecionarHumor(el); break;
      case 'salvar-conclusao': salvarConclusao(); break;
      case 'novo-desafio': fecharModal(() => ir('desafios')); break;
      case 'ver-diario': fecharModal(() => ir('diario')); break;
      case 'novo-momento': abrirMomento(); break;
      case 'trilha-momento': selecionarTrilhaMomento(el); break;
      case 'salvar-momento': salvarMomento(); break;
      case 'filtro-diario': filtroDiario = value; render('lista'); break;
      case 'apagar': confirmarApagar(id); break;
      case 'confirmar-apagar': apagar(id); break;
      case 'frase': trocarFrase(); break;
      case 'mudar-nome': abrirBoasVindas(true); break;
      case 'salvar-nome': salvarNome(value === 'pular'); break;
      case 'resetar': confirmarReset(); break;
      case 'confirmar-reset': resetar(); break;
    }
  });

  document.addEventListener('keydown', e => {
    const aberto = $('#modal-root .modal-fundo');
    if (e.key === 'Escape' && aberto && !modalTravado) fecharModal();
    if (e.key === 'Enter' && e.target.id === 'nome') salvarNome(false);
    if (e.key === 'Enter' && e.target.id === 'm-titulo') salvarMomento();
  });

  document.addEventListener('input', e => { if (e.target.classList.contains('erro')) e.target.classList.remove('erro'); });

  window.addEventListener('scroll',() => $('#topo').classList.toggle('rolado', window.scrollY > 8), { passive: true });
  window.addEventListener('resize', moverPilula);

  // ---------- Início ----------
  $('#abas').innerHTML = '<span class="pilula"></span>' +
    ABAS.map(([k, n, i]) => `<button data-nav="${k}">${ICONS[i]}<span>${n}</span></button>`).join('');

  checarConquistas();
  render('entrar');
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moverPilula);
  if (!state.boasVindas) abrirBoasVindas(false);
})();
