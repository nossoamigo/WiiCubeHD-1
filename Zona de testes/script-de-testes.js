const listaDeJogos = document.getElementById('text-area-id')
const pen60 = document.getElementById('pen60gb')
const hd500 = document.getElementById('hd500gb')
const hd1tb = document.getElementById('hd1tb')
const res = document.getElementById('resultado')
const seletorHd = document.getElementById('seletorHd')
var capacidadeAtual = 0
var capacidadeMaxima = 0


// SELEÇÃO DE HD'S

function selecionouPen60() {
  capacidadeMaxima = 57000
  /*seletorHd.style.display = 'none'*/
  seletorHd.innerHTML = 'O Pendrive de 60GB tem por padrão 57GB utilizáveis'
  seletorHd.style.color = 'yellow'

  res.style.display = 'block'
  listaDeJogos.innerHTML = '**   Pendrive de 60GB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}

function selecionouHd500gb() {
  capacidadeMaxima = 477000
  /*seletorHd.style.display = 'none' */
  seletorHd.innerHTML = 'O HD de 500GB tem por padrão 477GB utilizáveis'
  seletorHd.style.color = 'yellow'

  res.style.display = 'block'
  listaDeJogos.innerHTML = '**   HD de 1TB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}

function selecionouHd1tb() {
  capacidadeMaxima = 977000
  /*seletorHd.style.display = 'none'*/
  seletorHd.innerHTML = 'O HD de 1 TB tem por padrão 977GB utilizáveis'
  seletorHd.style.color = 'yellow'


  res.style.display = 'block'
  listaDeJogos.innerHTML = '**   HD de 2TB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual} / ${capacidadeMaxima}`
}

//CONTROLE DE AUDIO

var audio = new Audio('../Musicas/Super mario lofi.mp3');
audio.volume = 0.3;
audio.play();

function muteAllAudios() {
    if (audio.muted == false) {
      audio.muted = true;
      document.getElementById('idDoAudio').innerHTML = 'music_off'
    } else {
      if (audio.muted == true) {
        audio.muted = false;
        document.getElementById('idDoAudio').innerHTML = 'music_note'
      }
    }
}

//TRANSFORMANDO O JSON EM ITENS

fetch('arquivo.json')
.then(response => response.json())
.then(data => {
  var container = document.getElementById("container-jogo");
  data.itens.forEach(function(item) {
      var div = document.createElement("div");
      div.classList.add("jogo");
      div.id = item.id;
      div.onclick = function() {
        adicionarJogo(item.id, item.nome, item.tamanho);
      }
    
      var imagem = document.createElement("img");
      imagem.src = item.imagem;
      imagem.alt = item.nome;
    
      var nome = document.createElement("p");
      nome.innerText = item.nome;
    
      var tamanho = document.createElement("span");
      tamanho.classList.add("tamanhoDoJogo");
      tamanho.innerText = item.tamanho + " mb";
    
      nome.appendChild(tamanho);
      div.appendChild(imagem);
      div.appendChild(nome);
    
      container.appendChild(div);
    });
  });

// VALIDANDO

function adicionarJogo(id, nome, tamanho) {
  if (pen60.checked || hd500.checked || hd1tb.checked) {
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
    alert('Selecione um HD/PENDRIVE');
    window.scrollTo(0, 0);
    setTimeout(function() {
      seletorHd.style.backgroundColor = "yellow";
      setTimeout(function() {
        seletorHd.style.backgroundColor = "transparent";
      }, 500);
    }, 500);
  }
}
