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
  listaDeJogos.innerHTML = '**   HD de 500GB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}

function selecionouHd1tb() {
  capacidadeMaxima = 1000000
  seletorHd.style.display = 'none'
  listaDeJogos.innerHTML = '**   HD de 1TB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}

function selecionouHd2tb() {
  capacidadeMaxima = 2000000
  seletorHd.style.display = 'none'
  listaDeJogos.innerHTML = '**   HD de 2TB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}


/* Lista de jogos */

  /*  MODELO BASE (APAGAR DEPOIS)

  function XXXXX() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(XXXXX, XXXXXXXXXX), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const XXXXX = document.getElementById('XXXXX')
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      XXXXX.style.background = 'red'
      capacidadeAtual = capacidadeAtual - XXXXX
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + XXXXX > capacidadeMaxima) {
      alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      XXXXX.style.background = 'green'
      capacidadeAtual = capacidadeAtual + XXXXX
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
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      ABAHB.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 1268
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 1268 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
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
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      AST.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 1276
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 1276 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
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

function R4LXUG() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(R4LXUG, A. piggy Party), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const APP = document.getElementById('R4LXUG')
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      APP.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 180
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 180 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      APP.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 180
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function R33E69() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(R33E69, AC/DC LIVE: Rock Band Track Pack), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const ACDC = document.getElementById('R33E69')
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      ACDC.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 2690
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 2690 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      ACDC.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 2690
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function R3HP6Z() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(R3HP6Z, Agent Hugo Hula Holiday), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const AHHH = document.getElementById('R3HP6Z')
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      AHHH.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 436
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 436 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      AHHH.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 436
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function RRKP70() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(RRKP70, Alone in the Dark 5), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const AITD = document.getElementById('RRKP70')
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      AITD.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 4194
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 4194 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      AITD.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 4194
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function SALP4Q() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(SALP4Q, Alice In Wonderland ), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const AIW = document.getElementById('SALP4Q')
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      AIW.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 3896
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 3896 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      AIW.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 3896
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function SFSPGT() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(SFSPGT, ALL ROUND HUNTER), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const ARH = document.getElementById('SFSPGT')

    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      ARH.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 430
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 430 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      ARH.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 430
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function RVBERS() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(RVBERS, Alvin and The Chipmunks), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const ATC = document.getElementById('RVBERS')

    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      ATC.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 2156
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 2156 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      ATC.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 2156
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function SAVE5G() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(SAVE5G, Alvin and the Chipmunks: The Squeakquel), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const ATCTS = document.getElementById('SAVE5G')

    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      ATCTS.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 652
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 652 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      ATCTS.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 652
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}

function S7DE52() {
  if(hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = '(S7DE52, Angry Birds Star Wars), ';
    const conteudoAtual = listaDeJogos.innerHTML;
    const ABSW = document.getElementById('S7DE52')
  
    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      ABSW.style.background = 'lightgreen'
      capacidadeAtual = capacidadeAtual - 904
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
    } else {
      if (capacidadeAtual + 904 > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!')
      }else {
      listaDeJogos.innerHTML = conteudoAtual + jogo + '';
      ABSW.style.background = 'green'
      capacidadeAtual = capacidadeAtual + 904
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
      }
    }
  } else {
    res.innerHTML = 'Selecione um HD'
  }
}
