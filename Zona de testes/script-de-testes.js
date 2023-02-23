const listaDeJogos = document.getElementById('text-area-id')
const hd500 = document.getElementById('hd500gb')
const hd1tb = document.getElementById('hd1tb')
const hd2tb = document.getElementById('hd2tb')
const res = document.getElementById('resultado')
const seletorHd = document.getElementById('seletorHd')
var capacidadeAtual = 0
var capacidadeMaxima = 0



function selecionouHd500() {
  capacidadeMaxima = 500000
  seletorHd.style.display = 'none'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}

function selecionouHd1tb() {
  capacidadeMaxima = 1000000
  seletorHd.style.display = 'none'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}

function selecionouHd2tb() {
  capacidadeMaxima = 2000000
  seletorHd.style.display = 'none'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}


/* Lista de jogos */

  /*  MODELO BASE (APAGAR DEPOIS)

  function XXXXX() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(XXXXX, XXXXXXXXXX), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const XXXXX = document.getElementById('XXXXX')

    if (capacidadeAtual + XXXXX > capacidadeMaxima) {
      alert('Você excedeu o tamanho máximo!')
    }else {
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      XXXXX.style.background = 'red'
      capacidadeAtual = capacidadeAtual - 1268
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      XXXXX.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 1268
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    }
  }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}
*/

function SBLE5G() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(SBLE5G, A boy and his blob), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const ABAHB = document.getElementById('SBLE5G')

    if (capacidadeAtual + 1268 > capacidadeMaxima) {
      alert('Você excedeu o tamanho máximo!')
    }else {
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      ABAHB.style.background = 'red'
      capacidadeAtual = capacidadeAtual - 1268
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      ABAHB.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 1268
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    }
  }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function SDWP18() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(SDWP18, A shadows Tale), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const AST = document.getElementById('SDWP18')

    if (capacidadeAtual + 1276 > capacidadeMaxima) {
      alert('Você excedeu o tamanho máximo!')
    }else {
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      AST.style.background = 'red'
      capacidadeAtual = capacidadeAtual - 1276
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      AST.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 1276
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    }
  }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}


/*
function SDWP18() {
  const jogo = '(SDWP18, A shadows Tale), ';
  const conteudoAtual = listaDeJogos.innerHTML;
  const AST = document.getElementById('SDWP18')

  if (conteudoAtual.indexOf(jogo) !== -1) {
    listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');

    AST.style.background = 'red'
  } else {
    listaDeJogos.innerHTML = conteudoAtual + jogo + '';
    
    AST.style.background = 'green'
  }
} */

function R4LXUG() {
  const jogo = '(R4LXUG, A. piggy Party), ';
  const conteudoAtual = listaDeJogos.innerHTML;
  const APP = document.getElementById('R4LXUG')

  if (conteudoAtual.indexOf(jogo) !== -1) {
    listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');

    APP.style.background = 'red'
  } else {
    listaDeJogos.innerHTML = conteudoAtual + jogo + '';
    
    APP.style.background = 'green'
  }
}

function R33E69() {
  const jogo = '(R33E69, AC/DC LIVE: Rock Band Track Pack), ';
  const conteudoAtual = listaDeJogos.innerHTML;
  const ACDC = document.getElementById('R33E69')

  if (conteudoAtual.indexOf(jogo) !== -1) {
    listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');

    ACDC.style.background = 'red'
  } else {
    listaDeJogos.innerHTML = conteudoAtual + jogo + '';
    
    ACDC.style.background = 'green'
  }
} 

function R3HP6Z() {
  const jogo = '(R3HP6Z, Agent Hugo Hula Holiday), ';
  const conteudoAtual = listaDeJogos.innerHTML;
  const AHHH = document.getElementById('R3HP6Z')

  if (conteudoAtual.indexOf(jogo) !== -1) {
    listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');

    AHHH.style.background = 'red'
  } else {
    listaDeJogos.innerHTML = conteudoAtual + jogo + '';
    
    AHHH.style.background = 'green'
  }
} 

function RRKP70() {
  const jogo = '(RRKP70, Alone in the Dark 5), ';
  const conteudoAtual = listaDeJogos.innerHTML;
  const AITT = document.getElementById('RRKP70')

  if (conteudoAtual.indexOf(jogo) !== -1) {
    listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');

    AITT.style.background = 'red'
  } else {
    listaDeJogos.innerHTML = conteudoAtual + jogo + '';
    
    AITT.style.background = 'green'
  }
}
