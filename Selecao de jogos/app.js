// =====================================================================
// SELETOR DE JOGOS v2
// Tudo que muda no dia a dia fica em dados/*.json — este arquivo quase
// nunca precisa ser editado.
//   dados/wii.json, gamecube.json -> catálogo de jogos
//   dados/filtros.json            -> filtros ("Todos os LEGO", etc.)
//   dados/config.json             -> HDs, música, servidores de envio
// =====================================================================

const $ = (id) => document.getElementById(id);
const gb = (mb) => `${(mb / 1000).toFixed(2).replace(/\.?0+$/, '')} GB`;

const estado = {
  capacidade: null, // HD/pendrive escolhido
  jogos: new Map(), // id -> jogo (catálogo inteiro)
  selecionados: new Map(), // id -> jogo (o que a pessoa marcou)
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
    const [config, wii, gamecube, filtros] = await Promise.all(
      ['config', 'wii', 'gamecube', 'filtros'].map((n) => fetch(`dados/${n}.json`).then((r) => r.json()))
    );
    estado.config = config;
    montarCatalogo(wii, $('container-jogo'), 'wii');
    montarCatalogo(gamecube, $('container-jogo-gamecube'), 'gamecube');
    montarCapacidades(config.capacidades);
    montarFiltros(filtros);
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
  [...lista]
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt', { sensitivity: 'base' }))
    .forEach((j) => {
      if (estado.jogos.has(j.id)) return console.warn('ID repetido ignorado:', j.id);
      j.console = console_;
      j.nomeBusca = normalizar(j.nome);
      j.el = criarCard(j);
      estado.jogos.set(j.id, j);
      container.appendChild(j.el);
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
    if (window.matchMedia('(max-width: 480px)').matches) return;
    grande.src = j.imagem;
    grande.style.display = 'block';
    mover(e);
  };
  div.onmousemove = mover;
  div.onmouseleave = () => (grande.style.display = 'none');

  const img = document.createElement('img');
  img.src = j.imagem;
  img.alt = j.nome;
  const nome = document.createElement('p');
  nome.textContent = j.nome;
  const tam = document.createElement('span');
  tam.className = 'tamanhoDoJogo';
  tam.textContent = j.tamanho + ' mb';
  nome.appendChild(tam);
  div.append(img, nome);
  return div;
}

// ---------------------------------------------------------------------
// HD / Pendrive
// ---------------------------------------------------------------------
function montarCapacidades(capacidades) {
  capacidades.forEach((c) => {
    c.MB = c.utilizavelGB * 1000;
    const label = document.createElement('label');
    label.htmlFor = c.id;
    label.textContent = c.rotulo;
    const radio = document.createElement('input');
    Object.assign(radio, { type: 'radio', name: 'radioTamanhoHd', id: c.id, className: 'radioIdHds' });
    radio.onclick = () => escolherCapacidade(c, radio);
    $('seletorHd').append(label, radio);
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
  msg.style.color = 'yellow';
  msg.style.textShadow = '0 0 12px black';
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
    estado.selecionados.delete(j.id);
  } else if (usadoMB() + j.tamanho > estado.capacidade.MB) {
    return alert('Você excedeu o tamanho máximo!');
  } else {
    estado.selecionados.set(j.id, j);
  }
  atualizar();
}

// Redesenha tudo a partir do estado (cores, filtros, lista, capacidade)
function atualizar() {
  estado.jogos.forEach((j) => (j.el.style.background = estado.selecionados.has(j.id) ? 'green' : ''));

  estado.filtros.forEach((f) => {
    const ativo = filtroAtivo(f);
    f.caixa.innerHTML = ativo ? '<span class="material-icons">check</span>' : '';
    f.caixa.style.textShadow = ativo ? 'black 0px 0px 7px' : '';
    f.botao.style.opacity = ativo ? '100%' : '';
  });

  const cap = estado.capacidade;
  if (!cap) return;
  const usado = usadoMB();

  // Texto enviado ao vendedor (mesmo formato de antes)
  $('text-area-id').value =
    `** ${cap.etiquetaPedido} **, ` + [...estado.selecionados.values()].map((j) => `(${j.id}, ${j.nome}), `).join('');

  const res = $('resultado');
  res.style.display = 'block';
  res.innerHTML = `${gb(usado)} / ${gb(cap.MB)}`;
  res.style.color = usado >= cap.MB * 0.8 ? 'red' : usado >= cap.MB / 2 ? '#ff9100' : 'black';
}

// ---------------------------------------------------------------------
// Filtros (dados/filtros.json)
//   { "id": "lego", "titulo": "Todos os LEGO", "jogos": ["ID1","ID2"] }
//   ou por nome: { "id": "...", "titulo": "...", "busca": ["lego"] }
// ---------------------------------------------------------------------
function montarFiltros(lista) {
  lista.forEach((f) => {
    (f.jogos || []).forEach((id) => estado.jogos.has(id) || console.warn(`Filtro "${f.id}": jogo não existe no catálogo:`, id));
    const bloco = document.createElement('div');
    bloco.className = 'segundoContainerFiltro';
    bloco.innerHTML = `<h3>${f.titulo}</h3><div class="itensFiltro"><div class="checkBoxDoFiltro"></div></div>`;
    f.botao = bloco.querySelector('.itensFiltro');
    f.caixa = bloco.querySelector('.checkBoxDoFiltro');
    f.botao.onclick = () => alternarFiltro(f);
    $('filtrosContainer').appendChild(bloco);
    estado.filtros.push(f);
  });
}

function jogosDoFiltro(f) {
  const porId = (f.jogos || []).map((id) => estado.jogos.get(id)).filter(Boolean);
  const porNome = (f.busca || []).flatMap((t) =>
    [...estado.jogos.values()].filter((j) => j.console === 'wii' && j.nome.toLowerCase().includes(t.toLowerCase()))
  );
  return [...new Set([...porId, ...porNome])];
}

// Um filtro está "ligado" quando todos os jogos dele estão selecionados
function filtroAtivo(f) {
  const lista = jogosDoFiltro(f);
  return lista.length > 0 && lista.every((j) => estado.selecionados.has(j.id));
}

function alternarFiltro(f) {
  if (!exigirHd()) return;
  const lista = jogosDoFiltro(f);
  if (filtroAtivo(f)) {
    // desligar: remove os jogos, menos os que outro filtro ligado também usa
    const protegidos = new Set(
      estado.filtros.filter((o) => o !== f && filtroAtivo(o)).flatMap(jogosDoFiltro).map((j) => j.id)
    );
    lista.forEach((j) => protegidos.has(j.id) || estado.selecionados.delete(j.id));
  } else {
    const faltam = lista.filter((j) => !estado.selecionados.has(j.id));
    const total = faltam.reduce((s, j) => s + j.tamanho, 0);
    if (usadoMB() + total > estado.capacidade.MB) {
      return alert(`Você precisa de pelo menos ${gb(total)} livres para selecionar "${f.titulo}"`);
    }
    faltam.forEach((j) => estado.selecionados.set(j.id, j));
  }
  atualizar();
}

// ---------------------------------------------------------------------
// Console (Wii / GameCube) e navegação A-Z
// ---------------------------------------------------------------------
document.querySelectorAll('.seletorConsoleItem').forEach((b) => (b.onclick = () => mostrarConsole(b.dataset.console)));

function mostrarConsole(qual) {
  estado.console = qual;
  const wii = qual === 'wii';
  $('filtrosContainer').style.display = wii ? 'flex' : 'none';
  $('container-jogo').style.display = wii ? 'flex' : 'none';
  $('container-jogo-gamecube').style.display = wii ? 'none' : 'flex';
  aplicarBusca();
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
    abrir(window.innerWidth >= 1280); // aberto só em telas largas; nas outras, o visitante toca para abrir
    $('quadroRecadosTitulo').onclick = () => abrir(!quadro.classList.contains('aberto'));
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

iniciar();
