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
  seletorHd.innerHTML = 'O Pendrive de 64GB tem por padrão 57GB utilizáveis'
  seletorHd.style.color = 'yellow'
  seletorHd.style.textShadow = '0 0 12px black'

  res.style.display = 'block'
  listaDeJogos.innerHTML += '**   Pendrive de 64GB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual/1000} GB / ${capacidadeMaxima/1000} GB`;
}

function selecionouHd500gb() {
  capacidadeMaxima = 465000
  seletorHd.innerHTML = 'O HD de 500GB tem por padrão 465GB utilizáveis'
  seletorHd.style.color = 'yellow'
  seletorHd.style.textShadow = '0 0 12px black'

  res.style.display = 'block'
  listaDeJogos.innerHTML += '**   HD de 500GB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual/1000} GB / ${capacidadeMaxima/1000} GB`;
}

function selecionouHd1tb() {
  capacidadeMaxima = 931000
  seletorHd.innerHTML = 'O HD de 1 TB tem por padrão 931GB utilizáveis'
  seletorHd.style.color = 'yellow'
  seletorHd.style.textShadow = '0 0 12px black'


  res.style.display = 'block'
  listaDeJogos.innerHTML += '**   HD de 1TB   **,' + '\n'
  res.innerHTML = `${capacidadeAtual/1000} GB / ${capacidadeMaxima/1000} GB`;
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

      div.onmouseenter = function() {
        document.getElementById('imagemMaior').src = item.imagem;
        document.getElementById('imagemMaior').style.display = 'block'
        document.getElementById('imagemMaior').style.left = event.pageX + 15 + 'px';
        document.getElementById('imagemMaior').style.top = event.pageY + 15 + 'px';
      }

      div.onmouseleave = function() {
        document.getElementById('imagemMaior').style.display = 'none'
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
      res.innerHTML = `${capacidadeAtual/1000} GB / ${capacidadeMaxima/1000} GB`;

      if (capacidadeAtual <= capacidadeMaxima / 2) {res.style.color = 'black'} // cores do res
      if (capacidadeAtual >= capacidadeMaxima / 2) {res.style.color = '#ff9100'} // cores do res
      if (capacidadeAtual >= (capacidadeMaxima - 0.2 * capacidadeMaxima)) {res.style.color = 'red'} // cores do res
    } else {
      if (capacidadeAtual + tamanho > capacidadeMaxima) {
        alert('Você excedeu o tamanho máximo!');
      } else {
        listaDeJogos.innerHTML = conteudoAtual + jogo + '';
        jogoElement.style.background = 'green';
        capacidadeAtual += tamanho;
        res.innerHTML = `${capacidadeAtual/1000} GB / ${capacidadeMaxima/1000} GB`;

        if (capacidadeAtual <= capacidadeMaxima / 2) {res.style.color = 'black'} // cores do res
        if (capacidadeAtual >= capacidadeMaxima / 2) {res.style.color = '#ff9100'} // cores do res
        if (capacidadeAtual >= (capacidadeMaxima - 0.2 * capacidadeMaxima)) {res.style.color = 'red'} // cores do res
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

// FILTROS

/*
let XXXXX = false
function XXXXX() {
  if (XXXXX == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + XXXXX > capacidadeMaxima) {
        alert('Você precisa ao menos XXXXX para selecionar XXXXX')
      } else {
        adicionarJogo('XXXXX', 'XXXXX', XXXXX)
        adicionarJogo('XXXXX', 'XXXXX', XXXXX)
        adicionarJogo('XXXXX', 'XXXXX', XXXXX)



        document.getElementById('XXXXX').innerHTML = '<span class=\"material-icons\">check</span>'
        document.getElementById('XXXXX').style.textShadow = 'black 0px 0px 7px'
        document.getElementById('XXXXX').style.opacity = '100%'
        XXXXX = true
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
} */

let todosOsMariosJaFoiClicado = false
function filtroTodosOsMarios() {
  if (todosOsMariosJaFoiClicado == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 42000 > capacidadeMaxima) {
        alert('Você precisa ao menos 42GB para selecionar todos os marios')
      } else {
      adicionarJogo('PDUE01', 'Another SUPER MARIO BROS', 354)
      adicionarJogo('ROLE8P', 'Mario and Sonic at the Olympic Winter Games', 3464)
      adicionarJogo('SIIE8P', 'Mario and Sonic LONDON', 4078)
      adicionarJogo('CKBE88', 'Mario Kart Black', 3366)
      adicionarJogo('RMCE91', 'Mario Kart Fusion Cris Style', 2514)
      adicionarJogo('RM8E01', 'Mario Party 8', 1392)
      adicionarJogo('SSQE01', 'Mario Party 9', 794)
      adicionarJogo('RMKE01', 'MARIO SPORTS MIX', 2322)
      adicionarJogo('R4QE01', 'Mario Strikers Charged', 1878)
      adicionarJogo('RMBE01', 'Mario Super Sluggers', 1438)
      adicionarJogo('RMCE01', 'MarioKartWii', 2646)
      adicionarJogo('RMAE01', 'MarioTennisGC(Wii Version)', 1478)
      adicionarJogo('SMNE01', 'New SUPER MARIO BROS. Wii', 348)
      adicionarJogo('SMWP01', 'Newer Super Mario World U', 854)
      adicionarJogo('SM3E01', 'Super Mario Bros. 3+', 350)
      adicionarJogo('SVME01', 'super mario collection', 196)
      adicionarJogo('RMGE01', 'SUPER MARIO GALAXY', 3504)
      adicionarJogo('SB4E01', 'SUPER MARIO GALAXY MORE', 1322)
      adicionarJogo('R8PE01', 'Super Paper Mario', 406)
      adicionarJogo('RSBE01', 'Super Smash Bros. Brawl', 7094)
      adicionarJogo('RMCE26', 'Wiimms Mario Kart Fun', 1618)

      document.getElementById('checkBoxFiltroTodosOsMarios').innerHTML = '<span class=\"material-icons\">check</span>'
      document.getElementById('checkBoxFiltroTodosOsMarios').style.textShadow = 'black 0px 0px 7px'
      document.getElementById('filtroTodosOsMarios').style.opacity = '100%'
      todosOsMariosJaFoiClicado = true
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
}

let todosOsPopularesJaFoiClicado = false
function filtroTodosOsPopulares() {
  if (todosOsPopularesJaFoiClicado == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 62000 > capacidadeMaxima) {
        alert('Você precisa ao menos 62GB para selecionar todos os populares')
      } else {
      adicionarJogo('RYBE69', 'BOOM BLOX Bash Party', 1146)
      adicionarJogo('SF8E01', 'Donkey Kong Country Returns', 3412)
      adicionarJogo('R2GEXJ', 'FRAGILE DREAMS', 3928)
      adicionarJogo('S72E01', 'Kirby\'s Dream Collection Special Edition', 1820)
      adicionarJogo('RZZE8P', 'MadWorld', 3650)
      adicionarJogo('RMCE01', 'Mario Kart Wii', 2646)
      adicionarJogo('R3ME01', 'Metroid Prime Trilogy', 7780)
      adicionarJogo('RSFE7U', 'MURAMASA: THE DEMON BLADE', 630)
      adicionarJogo('RNHE41', 'NO MORE HEROES', 3360)
      adicionarJogo('RUYE41', 'No More Heroes 2: Desperate Struggle', 3334)
      adicionarJogo('R7PE01', 'Punch Out', 3726)
      adicionarJogo('SOUE01', 'The Legend of Zelda Skyward Sword', 4214)
      adicionarJogo('RZDE01', 'The Legend of Zelda Twilight Princess', 1100)
      adicionarJogo('SK3EEB', 'TRAUMA TEAM', 3482)
      adicionarJogo('SX4E01', 'Xenoblade Chronicles', 6464)
      adicionarJogo('RTZE08', 'Zack and Wiki: Quest for Barbaros\' Treasure', 1992)
      adicionarJogo('RB4E08', 'Resident Evil 4 Wii Edition', 4064)
      adicionarJogo('RMGE01', 'SUPER MARIO GALAXY', 3504)
      adicionarJogo('SB4E01', 'SUPER MARIO GALAXY MORE', 1322)

      document.getElementById('checkBoxFiltroTodosOsPopulares').innerHTML = '<span class=\"material-icons\">check</span>'
      document.getElementById('checkBoxFiltroTodosOsPopulares').style.textShadow = 'black 0px 0px 7px'
      document.getElementById('filtroTodosOsPopulares').style.opacity = '100%'
      todosOsPopularesJaFoiClicado = true
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
}

let todosOsFifaJaFoiClicado = false
function filtroTodosOsFifa() {
  if (todosOsFifaJaFoiClicado == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 24000 > capacidadeMaxima) {
        alert('Você precisa ao menos 24GB para selecionar todos os FIFA/PES')
      } else {
      adicionarJogo('RF9P69', 'FIFA 09 All-Play', 3082)
      adicionarJogo('SI3E69', 'FIFA 12', 3780)
      adicionarJogo('SVHX69', 'FIFA 14', 4026)
      adicionarJogo('SQVE69', 'FIFA 15', 4020)
      adicionarJogo('RWEEA4', 'Pro Evolution Soccer 2008', 2826)
      adicionarJogo('SPVYA4', 'Pro Evolution Soccer 2011', 3238)
      adicionarJogo('S3IYA4', 'Pro Evolution Soccer 2013', 2962)

      document.getElementById('checkBoxFiltroTodosOsFifa').innerHTML = '<span class=\"material-icons\">check</span>'
      document.getElementById('checkBoxFiltroTodosOsFifa').style.textShadow = 'black 0px 0px 7px'
      document.getElementById('filtroTodosOsFifa').style.opacity = '100%'
      todosOsFifaJaFoiClicado = true
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
}

let clicouAutoCompletar = false
function filtroAutoCompletar() {
  if (clicouAutoCompletar == true) {

  } else {
    document.getElementById('checkBoxFiltroAutoCompletar').innerHTML = '<span class=\"material-icons\">check</span>'
    document.getElementById('checkBoxFiltroAutoCompletar').style.width = '22px'
    listaDeJogos.innerHTML += '*****AUTOCOMPLETAR POR CONTA DO VENDEDOR*****,' + '\n'
    clicouAutoCompletar = true
  }
}

let clicouTodosOsLego = false
function FiltroTodosOsLego() {
  if (clicouTodosOsLego == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 23500 > capacidadeMaxima) {
        alert('Você precisa ao menos 23.5GB para selecionar todos os LEGO')
      } else {
      adicionarJogo('RLBEWR', 'LEGO Batman', 2542)
      adicionarJogo('R25EWR', 'LEGO Harry Potter', 3282)
      adicionarJogo('SLHEWR', 'LEGO Harry2', 3348)
      adicionarJogo('RLIE64', 'LEGO Indiana Jones: The Original Adventures', 2020)
      adicionarJogo('SLREWR', 'LEGO LOTR', 3524)
      adicionarJogo('SCJE4Q', 'LEGO Pirates', 1958)
      adicionarJogo('R6LEWR', 'LEGO Rock Band', 3728)
      adicionarJogo('RLGE64', 'LEGO Star Wars', 3040)

      document.getElementById('checkBoxFiltroTodosOsLego').innerHTML = '<span class=\"material-icons\">check</span>'
      document.getElementById('checkBoxFiltroTodosOsLego').style.textShadow = 'black 0px 0px 7px'
      document.getElementById('filtroTodosOsLego').style.opacity = '100%'
      clicouTodosOsLego = true
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
}

let ClicouTodosOsJustDance = false
function filtroTodosOsJustDance() {
  if (ClicouTodosOsJustDance == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 37200 > capacidadeMaxima) {
        alert('Você precisa ao menos 37.2GB para selecionar todos os JUST DANCE')
      } else {
      adicionarJogo('SD2E41', 'Just Dance 2', 3090)
      adicionarJogo('SE3E41', 'Just Dance 2015', 3420)
      adicionarJogo('SE8P41', 'Just Dance 2018', 4278)
      adicionarJogo('S5EE41', 'Just Dance 2019', 4360)
      adicionarJogo('SJDE41', 'Just Dance 3', 3762)
      adicionarJogo('SJXE41', 'Just Dance 4', 4104)
      adicionarJogo('SJ6E41', 'Just Dance Disney Party', 4122)
      adicionarJogo('SJHE41', 'Just Dance Greatest Hits', 3164)
      adicionarJogo('SJZE41', 'Just Dance Kids 2', 3012)
      adicionarJogo('SJ9E41', 'Just Dance Summer Party', 1544)
      adicionarJogo('SD2J01', 'Just Dance Wii', 2258)

      document.getElementById('checkBoxFiltroTodosOsJustDance').innerHTML = '<span class=\"material-icons\">check</span>'
      document.getElementById('checkBoxFiltroTodosOsJustDance').style.textShadow = 'black 0px 0px 7px'
      document.getElementById('filtroTodosOsJustDance').style.opacity = '100%'
      ClicouTodosOsJustDance = true
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
}

let ClicouTodosOsResidentEvil = false
function FiltroTodosOsResidentEvil() {
  if (ClicouTodosOsResidentEvil == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 17000 > capacidadeMaxima) {
        alert('Você precisa ao menos 17GB para selecionar todos os Resident Evil')
      } else {
      adicionarJogo('RE4E08', 'Resident Evil', 3810)
      adicionarJogo('RB4E08', 'Resident Evil 4 Wii Edition', 4064)
      adicionarJogo('RMVE69', 'Resident Evil Archives: Resident Evil', 1224)
      adicionarJogo('SBDE08', 'Resident Evil: The Darkside Chronicles', 3816)
      adicionarJogo('RBUE08', 'Resident Evil: The Umbrella Chronicles', 3982)

      document.getElementById('checkBoxFiltroTodosOsResidentEvil').innerHTML = '<span class=\"material-icons\">check</span>'
      document.getElementById('checkBoxFiltroTodosOsResidentEvil').style.textShadow = 'black 0px 0px 7px'
      document.getElementById('FiltroTodosOsResidentEvil').style.opacity = '100%'
      ClicouTodosOsResidentEvil = true
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
}

let ClicouTodosOsSonic = false
function FiltroTodosOsSonic() {
  if (ClicouTodosOsSonic == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 28500 > capacidadeMaxima) {
        alert('Você precisa ao menos 28.5GB para selecionar todos os Sonic')
      } else {
      adicionarJogo('ROLE8P', 'Mario and Sonic at the Olympic Winter Games', 3464)
      adicionarJogo('SIIE8P', 'Mario and Sonic LONDON', 4078)
      adicionarJogo('R3RE8P', 'Sonic and SEGA All-Stars Racing', 2596)
      adicionarJogo('RENE8P', 'Sonic and the Black Knight', 3478)
      adicionarJogo('RSRE8P', 'Sonic and the Secret Rings', 3662)
      adicionarJogo('SNCE8P', 'Sonic Colors', 3764)
      adicionarJogo('RS9E8P', 'Sonic Riders: Zero Gravity', 3648)
      adicionarJogo('RSVE8P', 'Sonic Unleashed', 3726)

      document.getElementById('CheckBoxFiltroTodosOsSonic').innerHTML = '<span class=\"material-icons\">check</span>'
      document.getElementById('CheckBoxFiltroTodosOsSonic').style.textShadow = 'black 0px 0px 7px'
      document.getElementById('FiltroTodosOsSonic').style.opacity = '100%'
      ClicouTodosOsSonic = true
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
}


let clicouTodosOsSpiderMan = false
function FiltroTodosOsSpiderMan() {
  if (clicouTodosOsSpiderMan == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 14000 > capacidadeMaxima) {
        alert('Você precisa ao menos 14GB para selecionar Todos os SPIDER-MAN')
      } else {
        adicionarJogo('SQME52', 'Spider-Man: Edge of Time', 1590)
        adicionarJogo('RFOE52', 'Spider-Man: Friend or Foe', 3324)
        adicionarJogo('SPDE52', 'Spider-Man: Shattered Dimensions', 3024)
        adicionarJogo('R3SE52', 'Spider-Man: Web of Shadows', 3944)
        adicionarJogo('SAZE52', 'The Amazing Spider-Man', 1752)

        document.getElementById('CheckBoxFiltroTodosOsSpiderMan').innerHTML = '<span class=\"material-icons\">check</span>'
        document.getElementById('CheckBoxFiltroTodosOsSpiderMan').style.textShadow = 'black 0px 0px 7px'
        document.getElementById('FiltroTodosOsSpiderMan').style.opacity = '100%'
        clicouTodosOsSpiderMan = true
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
}

let clicouTodosOsJogos = false;
function FiltroTodosOsJogos() {
  if (clicouTodosOsJogos == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 917000 > capacidadeMaxima) {
        alert('Você precisa ao menos 917GB para selecionar todos os jogos')
      } else {
        fetch('arquivo.json')
          .then(response => response.json())
          .then(data => {
            for (let item of data.itens) {
              adicionarJogo(item.id, item.nome, item.tamanho);
            }
          })
          .catch(error => console.error(error));

        document.getElementById('CheckBoxFiltroTodosOsJogos').innerHTML = '<span class=\"material-icons\">check</span>'
        document.getElementById('CheckBoxFiltroTodosOsJogos').style.textShadow = 'black 0px 0px 7px'
        document.getElementById('FiltroTodosOsJogos').style.opacity = '100%'
        clicouTodosOsJogos = true
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
}

// Botão de voltar ao topo da pagina

window.addEventListener('scroll', function() {
  let botaoVoltar = document.getElementById('botaoVoltarAoInicio')
  const posicao = window.pageYOffset + document.documentElement.clientHeight;
  const pontoDeMudanca = 0.15 * document.documentElement.scrollHeight;
  
  if (posicao >= pontoDeMudanca) {
    botaoVoltar.style.display = 'flex';
  } else {
    botaoVoltar.style.display = 'none';
  }
});

function clicouVoltar() {
  window.scrollTo(0, 0);
}
