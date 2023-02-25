const listaDeJogos = document.getElementById('text-area-id')
const hd500 = document.getElementById('hd500gb')
const hd1tb = document.getElementById('hd1tb')
const hd2tb = document.getElementById('hd2tb')
const res = document.getElementById('resultado')
const seletorHd = document.getElementById('seletorHd')
var capacidadeAtual = 0
var capacidadeMaxima = 0



function selecionouHd500() {
  capacidadeMaxima = 466000
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
      XXXXX.style.background = 'lightgreen'
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

function adicionarJogo(id, nome, tamanho) {
  if (hd500.checked || hd1tb.checked || hd2tb.checked) {
    const jogo = `(${id}, ${nome}), `;
    const conteudoAtual = listaDeJogos.innerHTML;
    const jogoElement = document.getElementById(id);

    if (conteudoAtual.indexOf(jogo) !== -1) {
      listaDeJogos.innerHTML = conteudoAtual.replace(jogo, '');
      jogoElement.style.background = 'lightgreen';
      capacidadeAtual -= tamanho;
      res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`;
    } else {
      if (capacidadeAtual + tamanho > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!');
      } else {
        listaDeJogos.innerHTML = conteudoAtual + jogo + '';
        jogoElement.style.background = 'green';
        capacidadeAtual += tamanho;
        res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`;
      }
    }
  } else {
    res.innerHTML = 'Selecione um HD';
  }
}
