// =====================================================================
// SELETOR DE JOGOS v2
// Tudo que muda no dia a dia fica em dados/*.json — este arquivo quase
// nunca precisa ser editado.
//   dados/wii.json, gamecube.json -> catálogo de jogos
//   dados/filtros.json            -> filtros ("Todos os LEGO", etc.)
//   dados/config.json             -> HDs, música, servidores de envio
// =====================================================================

const $ = (id) => document.getElementById(id);
// Unidades: os tamanhos dos jogos estão em MB "do Windows" (MiB, 1024 KB) e a capacidade
// dos HDs em GB "do Windows" (GiB, 1024 MB). Por isso 1 GB = 1024 MB, e não 1000.
const gb = (mb) => `${(mb / 1024).toFixed(2).replace(/\.?0+$/, '')} GB`;

const estado = {
  capacidade: null, // HD/pendrive escolhido
  jogos: new Map(), // id -> jogo (catálogo inteiro)
  selecionados: new Map(), // id -> jogo (o que a pessoa marcou)
  donos: new Map(), // id -> quem pediu o jogo: 'manual' e/ou o id de um filtro
  filtros: [],
  console: 'wii', // lista exibida agora
  config: null,
};

const normalizar = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const usadoMB = () => [...estado.selecionados.values()].reduce((s, j) => s + j.tamanho, 0);

document.addEventListener('contextmenu', (e) => e.preventDefault());

// ---------------------------------------------------------------------
// Carregamento
// ---------------------------------------------------------------------
async function iniciar() {
  try {
    const [config, wii, gamecube, filtros, maisEscolhidos, selos] = await Promise.all([
      ...['config', 'wii', 'gamecube', 'filtros'].map((n) => fetch(`dados/${n}.json`).then((r) => r.json())),
      fetch('dados/mais-escolhidos.json').then((r) => r.json()).catch(() => ({})), // opcional: sem ele, só some o filtro
      fetch('dados/selos.json').then((r) => r.json()).catch(() => ({})), // opcional: sem ele, só não há bandeirinhas
    ]);
    estado.config = config;
    estado.selosCfg = selos;
    montarCatalogo(wii, $('container-jogo'), 'wii');
    montarCatalogo(gamecube, $('container-jogo-gamecube'), 'gamecube');
    montarCapacidades(config.capacidades);
    montarFiltros(filtros, maisEscolhidos);
    montarLegendaSelos();
    montarNavegacaoAZ();
    iniciarMusica(config.musica);
    carregarRecados();
  } catch (erro) {
    console.error(erro);
    alert('Não foi possível carregar a lista de jogos. Se estiver testando no computador, abra pelo Live Server.');
  }
}

// ---------------------------------------------------------------------
// Catálogo
// ---------------------------------------------------------------------
function montarCatalogo(lista, container, console_) {
  const cfg = estado.selosCfg || {};
  [...lista]
    .map((j) => {
      j.selos = calcularSelos(j, cfg);
      // nome mostrado = nome + sufixo de cada selo (ex.: "Mario Kart Wii BR", "Bleach Wii JAP"); os sufixos ficam em selos.json
      j.nomeExibido = [j.nome, ...j.selos.map((s) => (cfg[s] || {}).sufixo)].filter(Boolean).join(' ');
      return j;
    })
    .sort((a, b) => a.nomeExibido.localeCompare(b.nomeExibido, 'pt', { sensitivity: 'base' }))
    .forEach((j) => {
      if (estado.jogos.has(j.id)) return console.warn('ID repetido ignorado:', j.id);
      j.console = console_;
      j.nomeBusca = normalizar(j.nomeExibido);
      j.el = criarCard(j);
      estado.jogos.set(j.id, j);
      container.appendChild(j.el);
    });
}

// Quadrinho "Sem capa": aparece no lugar do ícone de imagem quebrada quando o arquivo da capa
// ainda não foi colocado na pasta (imagens/<console>/cache/<região>/<ID>.png).
const SEM_CAPA =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="140" viewBox="0 0 100 140"><rect width="100" height="140" rx="8" fill="#cfe1fb"/>' +
      '<rect x="6" y="6" width="88" height="128" rx="6" fill="none" stroke="#5b7aa3" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="50" y="76" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#5b7aa3">Sem capa</text></svg>'
  );

// ---------------------------------------------------------------------
// Selos (bandeirinhas no canto da capa) — regras em dados/selos.json
//   jp: jogos com a letra J na 4ª posição do ID (região japonesa), menos os de "exceto" (mais os de "alem")
//   br: jogos listados em "ids" (traduzidos para português)
// As bandeiras são desenhadas aqui mesmo (SVG), então não precisam de imagem.
// ---------------------------------------------------------------------
const SELOS = {
  jp: {
    titulo: 'Em japonês',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/></svg>',
  },
  br: {
    titulo: 'Traduzido para português',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="#009b3a"/><path d="M15 2.2 27.2 10 15 17.8 2.8 10Z" fill="#ffdf00"/><circle cx="15" cy="10" r="4.6" fill="#002776"/><path d="M10.6 9.1c3.2-.9 6.2-.5 8.9 1.2" stroke="#fff" stroke-width=".9" fill="none"/></svg>',
  },
};

function calcularSelos(j, cfg) {
  const s = [];
  const jp = cfg.jp || {};
  const ehJp = jp.regiaoDoId && j.id[3] === jp.regiaoDoId && !(jp.exceto || []).includes(j.id);
  if (ehJp || (jp.alem || []).includes(j.id)) s.push('jp');
  if (((cfg.br || {}).ids || []).includes(j.id)) s.push('br');
  return s;
}

function criarSelo(chave) {
  const s = document.createElement('span');
  s.className = `selo selo-${chave}`;
  s.title = SELOS[chave].titulo;
  s.innerHTML = SELOS[chave].svg; // texto fixo definido acima, nunca vem de fora
  return s;
}

// Legenda embaixo da busca: só mostra as bandeiras que existem de fato no catálogo
function montarLegendaSelos() {
  const usados = new Set([...estado.jogos.values()].flatMap((j) => j.selos));
  Object.keys(SELOS)
    .filter((k) => usados.has(k))
    .forEach((k) => {
      const item = document.createElement('span');
      item.className = 'legendaItem';
      const bandeira = criarSelo(k);
      bandeira.classList.add('selo-legenda');
      item.append(bandeira, document.createTextNode(SELOS[k].titulo));
      $('legendaSelos').appendChild(item);
    });
}

function criarCard(j) {
  const div = document.createElement('div');
  div.className = 'jogo';
  div.id = j.id;
  div.onclick = () => alternarJogo(j);

  const grande = $('imagemMaior');
  const mover = (e) => {
    grande.style.left = e.pageX + 15 + 'px';
    grande.style.top = e.pageY + 15 + 'px';
  };
  div.onmouseenter = (e) => {
    if (window.matchMedia('(max-width: 480px)').matches || img.src === SEM_CAPA) return; // sem capa, não há o que ampliar
    grande.src = img.src;
    grande.style.display = 'block';
    mover(e);
  };
  div.onmousemove = mover;
  div.onmouseleave = () => (grande.style.display = 'none');

  const img = document.createElement('img');
  img.onerror = () => {
    img.onerror = null; // evita laço caso o próprio quadrinho falhe
    img.src = SEM_CAPA;
  };
  img.src = j.imagem;
  img.alt = j.nomeExibido;
  const nome = document.createElement('p');
  nome.textContent = j.nomeExibido;
  const tam = document.createElement('span');
  tam.className = 'tamanhoDoJogo';
  tam.textContent = j.tamanho + ' mb';
  nome.appendChild(tam);
  const capa = document.createElement('span');
  capa.className = 'capa';
  capa.appendChild(img);
  j.selos.forEach((chave) => capa.appendChild(criarSelo(chave))); // bandeirinhas no canto da capa
  div.append(capa, nome);
  return div;
}

// ---------------------------------------------------------------------
// HD / Pendrive
// ---------------------------------------------------------------------
function montarCapacidades(capacidades) {
  capacidades.forEach((c) => {
    c.MB = c.utilizavelGB * 1024 + (c.ajusteMB || 0); // ajusteMB (opcional) calibra a capacidade real
    const label = document.createElement('label');
    label.htmlFor = c.id;
    label.textContent = c.rotulo;
    const radio = document.createElement('input');
    Object.assign(radio, { type: 'radio', name: 'radioTamanhoHd', id: c.id, className: 'radioIdHds' });
    radio.onclick = () => escolherCapacidade(c, radio);
    $('seletorHd').append(radio, label); // o rádio vem ANTES do rótulo: o CSS usa input:checked + label
  });
}

function escolherCapacidade(c, radio) {
  if (usadoMB() > c.MB) {
    alert('O HD/Pendrive não suporta o tamanho dos jogos selecionados');
    // volta o botão para a opção anterior
    radio.checked = false;
    if (estado.capacidade) $(estado.capacidade.id).checked = true;
    return;
  }
  estado.capacidade = c;
  const msg = $('tamanhoRealMensagemId');
  msg.innerHTML = c.mensagem;
  atualizar();
}

function exigirHd() {
  if (estado.capacidade) return true;
  alert('Selecione um HD/PENDRIVE');
  window.scrollTo(0, 0);
  setTimeout(() => {
    $('seletorHd').style.backgroundColor = 'yellow';
    setTimeout(() => ($('seletorHd').style.backgroundColor = 'transparent'), 500);
  }, 500);
  return false;
}

// ---------------------------------------------------------------------
// Selecionar jogos
// ---------------------------------------------------------------------
function alternarJogo(j) {
  if (!exigirHd()) return;
  if (estado.selecionados.has(j.id)) {
    desmarcar(j);
  } else if (usadoMB() + j.tamanho > estado.capacidade.MB) {
    return alert('Você excedeu o tamanho máximo!');
  } else {
    marcar(j, 'manual');
  }
  atualizar();
}

// Cada jogo da lista lembra QUEM o pediu: a própria pessoa ('manual') e/ou filtros.
// Ele só sai da lista quando ninguém mais o pede. Assim, desfazer um filtro nunca tira
// um jogo que a pessoa escolheu à mão nem um que outro filtro ligado ainda precisa.
function donosDe(id) {
  if (!estado.donos.has(id)) estado.donos.set(id, new Set(['manual']));
  return estado.donos.get(id);
}
function marcar(j, dono) {
  if (!estado.selecionados.has(j.id)) {
    estado.selecionados.set(j.id, j);
    estado.donos.set(j.id, new Set());
  }
  donosDe(j.id).add(dono);
}
function soltar(j, dono) {
  const d = estado.donos.get(j.id);
  if (d) d.delete(dono);
  if (!d || d.size === 0) desmarcar(j);
}
function desmarcar(j) {
  estado.selecionados.delete(j.id);
  estado.donos.delete(j.id);
}

// Redesenha tudo a partir do estado (cores, filtros, lista, capacidade)
function atualizar() {
  estado.jogos.forEach((j) => j.el.classList.toggle('selecionado', estado.selecionados.has(j.id)));

  estado.filtros.forEach((f) => {
    const ativo = filtroAtivo(f);
    f.caixa.innerHTML = ativo ? '<span class="material-icons">check</span>' : '';
    f.botao.classList.toggle('ligado', ativo);
    f.botao.style.opacity = ativo ? '100%' : '';
  });

  const cap = estado.capacidade;
  if (!cap) return;
  const usado = usadoMB();

  // Texto enviado ao vendedor (mesmo formato de antes)
  $('text-area-id').value =
    `** ${cap.etiquetaPedido} **, ` + [...estado.selecionados.values()].map((j) => `(${j.id}, ${j.nomeExibido}), `).join('');

  // Medidor: a barra enche proporcionalmente e a cor muda aos poucos (verde -> laranja -> vermelho)
  const p = Math.min(usado / cap.MB, 1);
  const res = $('resultado');
  res.style.display = 'block';
  res.setAttribute('aria-valuenow', Math.round(p * 100));
  $('resultadoTexto').textContent = `${gb(usado)} / ${gb(cap.MB)}`;
  $('resultadoNivel').style.width = `${p * 100}%`;
  $('resultadoNivel').style.backgroundColor = corDoNivel(p);
}

// Cor do "líquido" em degradê contínuo: verde (vazio) -> laranja (metade) -> vermelho (cheio)
function corDoNivel(p) {
  const matiz = p <= 0.5 ? 130 - (130 - 36) * (p / 0.5) : 36 - (36 - 4) * ((p - 0.5) / 0.5);
  return `hsl(${matiz.toFixed(0)}, 85%, 55%)`;
}

// ---------------------------------------------------------------------
// Filtros (dados/filtros.json)
//   { "id": "lego", "titulo": "Todos os LEGO", "jogos": ["ID1","ID2"] }
//   ou por nome: { "id": "...", "titulo": "...", "busca": ["lego"] }
// ---------------------------------------------------------------------
function montarFiltros(lista, maisEscolhidos = {}) {
  lista.forEach((f) => {
    if (f.ativo === false) return; // filtro desativado em filtros.json ("ativo": false)
    f.consoles = f.consoles || ['wii']; // em quais abas o filtro aparece (padrão: só Wii)
    if (f.ranking) {
      // filtro que "completa" a lista: segue a ordem de dados/mais-escolhidos.json (chave "wii" ou "gamecube")
      f.ordem = (maisEscolhidos[f.ranking] || []).map((x) => x.id).filter((id) => estado.jogos.has(id));
      if (f.ordem.length === 0) return console.warn(`Filtro "${f.id}" sem dados de ranking: não será exibido.`);
    }
    (f.jogos || []).forEach((id) => estado.jogos.has(id) || console.warn(`Filtro "${f.id}": jogo não existe no catálogo:`, id));
    if (f.selo && !f.consoles.some((c) => jogosDoFiltro(f, c).length > 0)) return console.warn(`Filtro "${f.id}": nenhum jogo com o selo "${f.selo}", não será exibido.`);
    const bloco = document.createElement('div');
    bloco.className = 'segundoContainerFiltro';
    bloco.dataset.consoles = f.consoles.join(',');
    bloco.innerHTML = `<h3>${f.titulo}</h3><div class="itensFiltro"><div class="checkBoxDoFiltro"></div></div>`;
    f.botao = bloco.querySelector('.itensFiltro');
    f.caixa = bloco.querySelector('.checkBoxDoFiltro');
    if (f.imagem) f.botao.style.backgroundImage = `url("${f.imagem}")`;
    if (f.descricao) f.botao.title = f.descricao;
    f.botao.onclick = () => alternarFiltro(f);
    $('filtrosContainer').appendChild(bloco);
    estado.filtros.push(f);
  });
}

function jogosDoFiltro(f, aba = estado.console) {
  // "Mais escolhidos": os jogos que ELE colocou na lista
  if (f.ordem) return f.ordem.map((id) => estado.jogos.get(id)).filter((j) => estado.selecionados.has(j.id) && donosDe(j.id).has(f.id));
  const porId = (f.jogos || []).map((id) => estado.jogos.get(id)).filter(Boolean);
  const porNome = (f.busca || []).flatMap((t) =>
    [...estado.jogos.values()].filter((j) => j.console === 'wii' && j.nome.toLowerCase().includes(t.toLowerCase()))
  );
  // por selo (ex.: "jp", "br"): os jogos DA ABA ATUAL que têm essa bandeirinha
  const porSelo = f.selo ? [...estado.jogos.values()].filter((j) => j.console === aba && j.selos.includes(f.selo)) : [];
  return [...new Set([...porId, ...porNome, ...porSelo])];
}

// Filtro "ligado" = é dono dos jogos dele (todos, nos filtros comuns; algum, no "Mais escolhidos").
// Marcar jogos à mão, ou por outro filtro, não liga este filtro por coincidência.
function filtroAtivo(f) {
  const lista = jogosDoFiltro(f);
  if (f.ordem) return lista.length > 0;
  return lista.length > 0 && lista.every((j) => estado.selecionados.has(j.id) && donosDe(j.id).has(f.id));
}

function alternarFiltro(f) {
  if (!exigirHd()) return;
  if (filtroAtivo(f)) {
    // desligar: sai da lista só o que ninguém mais pediu
    jogosDoFiltro(f).forEach((j) => soltar(j, f.id));
  } else if (f.ordem) {
    // "Mais escolhidos": preenche o espaço livre seguindo a ordem do ranking
    let adicionados = 0;
    for (const id of f.ordem) {
      const j = estado.jogos.get(id);
      if (estado.selecionados.has(id) || j.tamanho > estado.capacidade.MB - usadoMB()) continue;
      marcar(j, f.id);
      adicionados++;
    }
    if (!adicionados) return alert('Não há espaço livre para adicionar mais jogos.');
  } else {
    const lista = jogosDoFiltro(f);
    const faltam = lista.filter((j) => !estado.selecionados.has(j.id));
    const total = faltam.reduce((s, j) => s + j.tamanho, 0);
    if (usadoMB() + total > estado.capacidade.MB) {
      return alert(`Você precisa de pelo menos ${gb(total)} livres para selecionar "${f.titulo}"`);
    }
    lista.forEach((j) => marcar(j, f.id));
  }
  atualizar();
}

// ---------------------------------------------------------------------
// Console (Wii / GameCube) e navegação A-Z
// ---------------------------------------------------------------------
document.querySelectorAll('.seletorConsoleItem').forEach((b) => (b.onclick = () => mostrarConsole(b.dataset.console)));

function mostrarConsole(qual) {
  estado.console = qual;
  document.querySelectorAll('.seletorConsoleItem').forEach((b) => b.classList.toggle('ativo', b.dataset.console === qual));
  const wii = qual === 'wii';
  // cada filtro aparece só nas abas listadas em "consoles" (filtros.json); sem nenhum filtro na aba, o painel some
  let visiveis = 0;
  document.querySelectorAll('#filtrosContainer .segundoContainerFiltro').forEach((b) => {
    const mostra = b.dataset.consoles.split(',').includes(qual);
    b.style.display = mostra ? '' : 'none';
    if (mostra) visiveis++;
  });
  $('filtrosContainer').style.display = visiveis ? '' : 'none'; // '' devolve o layout definido no CSS
  $('filtrosContainer').classList.toggle('soUm', visiveis === 1); // um filtro só: fica centralizado
  $('container-jogo').style.display = wii ? 'flex' : 'none';
  $('container-jogo-gamecube').style.display = wii ? 'none' : 'flex';
  aplicarBusca();
  atualizar(); // refaz o estado dos botões de filtro para a aba nova
}

// ---------------------------------------------------------------------
// Busca: só esconde/mostra os cards (a seleção e os filtros não são afetados)
// ---------------------------------------------------------------------
function aplicarBusca() {
  const q = normalizar($('campoBusca').value);
  const visiveis = { wii: 0, gamecube: 0 };
  estado.jogos.forEach((j) => {
    const ok = !q || j.nomeBusca.includes(q);
    j.el.style.display = ok ? '' : 'none';
    if (ok) visiveis[j.console]++;
  });
  // as letras A-Z apontam para jogos que podem estar escondidos, então somem durante a busca
  $('container-navegacaoId').style.display = !q && estado.console === 'wii' ? 'flex' : 'none';
  $('buscaVazia').style.display = q && visiveis[estado.console] === 0 ? 'block' : 'none';
  $('imagemMaior').style.display = 'none';
}
$('campoBusca').addEventListener('input', aplicarBusca);

function montarNavegacaoAZ() {
  const inicial = (nome) => nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toUpperCase();
  const wii = [...estado.jogos.values()].filter((j) => j.console === 'wii');
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letra) => {
    const primeiro = wii.find((j) => inicial(j.nome) === letra);
    if (!primeiro) return;
    const a = document.createElement('a');
    a.href = '#' + primeiro.id;
    a.textContent = letra;
    $('container-navegacaoId').appendChild(a);
  });
}

// ---------------------------------------------------------------------
// Quadro de recados (dados/recados.json)
//   { "titulo": "Aviso", "texto": "Texto do recado", "ate": "2026-12-31" }
//   "titulo" e "ate" são opcionais. Depois da data "ate" o recado some sozinho.
// Se não houver recados válidos, o quadro nem aparece.
// ---------------------------------------------------------------------
async function carregarRecados() {
  try {
    const lista = await fetch('dados/recados.json').then((r) => r.json());
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const validos = lista.filter((r) => r.texto && (!r.ate || new Date(r.ate + 'T00:00:00') >= hoje));
    if (validos.length === 0) return;
    validos.forEach((r) => {
      const div = document.createElement('div');
      div.className = 'recado';
      if (r.titulo) {
        const t = document.createElement('h4');
        t.textContent = r.titulo;
        div.appendChild(t);
      }
      const p = document.createElement('p');
      p.textContent = r.texto; // textContent: o texto nunca é interpretado como HTML
      div.appendChild(p);
      $('quadroRecadosLista').appendChild(div);
    });
    $('quadroRecadosQtd').textContent = `(${validos.length})`;
    const quadro = $('quadroRecados');
    const abrir = (sim) => {
      quadro.classList.toggle('aberto', sim);
      $('quadroRecadosTitulo').setAttribute('aria-expanded', sim);
    };
    abrir(window.innerWidth >= 1700); // aberto sozinho só em telas bem largas (senão cobre a lista); nas outras, o visitante abre
    $('quadroRecadosTitulo').onclick = () => abrir(!quadro.classList.contains('aberto'));
    $('quadroRecadosFechar').onclick = () => abrir(false); // X vermelho: recolhe o quadro (fica só o botão "Recados")
    // Some ao rolar para baixo e volta quando a pessoa retorna ao topo
    const ajustarVisibilidade = () => quadro.classList.toggle('oculto', window.scrollY > 60);
    window.addEventListener('scroll', ajustarVisibilidade, { passive: true });
    ajustarVisibilidade();
    quadro.hidden = false;
  } catch (erro) {
    console.warn('Recados não carregados (o site segue normal):', erro);
  }
}

// ---------------------------------------------------------------------
// Música e botão de voltar ao topo
// ---------------------------------------------------------------------
function iniciarMusica(arquivo) {
  const audio = new Audio(arquivo);
  audio.volume = 0.3;
  audio.play().catch(() => document.addEventListener('click', () => audio.play(), { once: true }));
  $('audio').onclick = () => {
    audio.muted = !audio.muted;
    $('idDoAudio').innerHTML = audio.muted ? 'music_off' : 'music_note';
  };
}

$('botaoVoltarAoInicio').onclick = () => window.scrollTo(0, 0);
window.addEventListener('scroll', () => {
  const pos = window.pageYOffset + document.documentElement.clientHeight;
  $('botaoVoltarAoInicio').style.display = pos >= 0.12 * document.documentElement.scrollHeight ? 'flex' : 'none';
});

// ---------------------------------------------------------------------
// Envio do pedido: tenta cada servidor de config.envio, em ordem.
// Para incluir um novo serviço, crie uma função em "servicos" e
// adicione uma linha em dados/config.json.
// ---------------------------------------------------------------------
async function postarJSON(url, corpo) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000); // desiste após 10s
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(corpo),
      signal: ctrl.signal,
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const resp = await r.json().catch(() => ({}));
    if (resp.success === false || resp.success === 'false') throw new Error(resp.message || 'recusado');
  } finally {
    clearTimeout(timer);
  }
}

const servicos = {
  staticforms: (c, d) => postarJSON('https://api.staticforms.xyz/submit', { ...d, accessKey: c.chave }),
  formsubmit: (c, d) => postarJSON(`https://formsubmit.co/ajax/${c.email}`, { ...d, _captcha: 'false' }),
};

async function enviarPedido(dados) {
  for (const s of estado.config.envio) {
    try {
      await servicos[s.tipo](s, dados);
      return true;
    } catch (erro) {
      console.warn(`Envio falhou em ${s.tipo}, tentando o próximo...`, erro);
    }
  }
  return false;
}

// Máscara do telefone: (41) 99999-9999
$('input-telefone-id').addEventListener('input', (e) => {
  const d = e.target.value.replace(/\D/g, '').slice(0, 11);
  e.target.value =
    d.length > 10 ? d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    : d.length > 6 ? d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    : d.length > 2 ? d.replace(/(\d{2})(\d{0,5})/, '($1) $2')
    : d;
});

$('meu-formulario').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!exigirHd()) return;
  if (estado.selecionados.size === 0) return alert('Selecione pelo menos um jogo.');
  const telefone = $('input-telefone-id').value.trim();
  if (telefone && telefone.replace(/\D/g, '').length < 10) {
    return alert('Telefone incompleto. Confira o DDD e o número, ou deixe o campo em branco.');
  }
  const botao = $('botaoDeEnviar');
  botao.disabled = true;
  botao.textContent = 'Enviando...';
  const ok = await enviarPedido({
    name: $('input-nome-id').value,
    ...(telefone && { phone: telefone }), // só vai no pedido se foi preenchido
    message: $('text-area-id').value,
  });
  if (ok) {
    window.location.href = estado.config.paginaConclusao;
  } else {
    alert('Não foi possível enviar agora. Tente novamente em alguns minutos ou avise o vendedor pela plataforma.');
    botao.disabled = false;
    botao.textContent = 'Enviar pedido';
  }
});

// ---------------------------------------------------------------------
// Modo escuro (chave do Yoshi). A escolha fica salva neste navegador.
// ---------------------------------------------------------------------
function iniciarTema() {
  const raiz = document.documentElement;
  const botao = $('chaveTema');
  const aplicar = (escuro, salvar) => {
    raiz.setAttribute('data-tema', escuro ? 'escuro' : 'claro');
    botao.setAttribute('aria-checked', escuro);
    botao.title = escuro ? 'Voltar ao modo claro' : 'Ativar modo escuro';
    if (salvar) {
      try {
        localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
      } catch (e) {} // navegador sem armazenamento: o tema só vale nesta visita
    }
  };
  aplicar(raiz.getAttribute('data-tema') === 'escuro', false); // o <head> já aplicou o tema salvo
  botao.onclick = () => aplicar(raiz.getAttribute('data-tema') !== 'escuro', true);
}

iniciarTema();
iniciar();
