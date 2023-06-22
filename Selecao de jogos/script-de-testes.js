const listaDeJogos = document.getElementById('text-area-id')
const pen60 = document.getElementById('pen60gb')
const hd500 = document.getElementById('hd500gb')
const hd1tb = document.getElementById('hd1tb')
const res = document.getElementById('resultado')
const tamanhoRealHdMensagem = document.getElementById('tamanhoRealMensagemId')
const seletorHd = document.getElementById('seletorHd')
var capacidadeAtual = 0
var capacidadeMaxima = 0

// SELEÇÃO DE HD'S

function selecionouPen60() {
  if (capacidadeAtual >= 58368 / 1.024) {
    alert('O HD/Pendrive não suporta o tamanho dos jogos selecionados')
  } else {
  capacidadeMaxima = 58368 / 1.024
  tamanhoRealHdMensagem.innerHTML = 'O Pendrive de 64GB tem por padrão 57GB utilizáveis'
  tamanhoRealHdMensagem.style.color = 'yellow'
  tamanhoRealHdMensagem.style.textShadow = '0 0 12px black'

  res.style.display = 'block'
  listaDeJogos.innerHTML = listaDeJogos.innerHTML
  .replace('** HD500GB **, ', '** PENDRIVE 64GB **, ')
  .replace('** HD 1TB **, ', '** PENDRIVE 64GB **, ')
  res.innerHTML = `${capacidadeAtual/1000} GB / ${capacidadeMaxima/1000} GB`;
 }
}

function selecionouHd500gb() {
  if (capacidadeAtual >= 476160 / 1.024) {
    alert('O HD/Pendrive não suporta o tamanho dos jogos selecionados')
  } else {
  capacidadeMaxima = 476160 / 1.024
  tamanhoRealHdMensagem.innerHTML = 'O HD de 500GB tem por padrão 465GB utilizáveis'
  tamanhoRealHdMensagem.style.color = 'yellow'
  tamanhoRealHdMensagem.style.textShadow = '0 0 12px black'

  res.style.display = 'block'
  listaDeJogos.innerHTML = listaDeJogos.innerHTML
  .replace('** PENDRIVE 64GB **, ', '** HD500GB **, ')
  .replace('** HD 1TB **, ', '** HD500GB **, ')
  res.innerHTML = `${capacidadeAtual/1000} GB / ${capacidadeMaxima/1000} GB`;
 }
}

function selecionouHd1tb() {
  if (capacidadeAtual >= 953344 / 1.024) {
    alert('O HD/Pendrive não suporta o tamanho dos jogos selecionados')
  } else {
  capacidadeMaxima = 953344 / 1.024
  tamanhoRealHdMensagem.innerHTML = 'O HD de 1 TB tem por padrão 931GB utilizáveis'
  tamanhoRealHdMensagem.style.color = 'yellow'
  tamanhoRealHdMensagem.style.textShadow = '0 0 12px black'
  

  res.style.display = 'block'
  listaDeJogos.innerHTML = listaDeJogos.innerHTML
  .replace('** PENDRIVE 64GB **, ', '** HD 1TB **, ')
  .replace('** HD500GB **, ', '** HD 1TB **, ')
  res.innerHTML = `${capacidadeAtual/1000} GB / ${capacidadeMaxima/1000} GB`;
 }
}

// SELETOR DE CONSOLE

function selecionouConsoleWii() {
  document.getElementById('filtrosContainer').style.display = 'flex'
  document.getElementById('container-navegacaoId').style.display = 'flex'
  document.getElementById('container-jogo').style.display = 'flex'
  document.getElementById('container-jogo-gamecube').style.display = 'none'

}

function selecionouConsoleGameCube() {
  document.getElementById('filtrosContainer').style.display = 'none'
  document.getElementById('container-navegacaoId').style.display = 'none'
  document.getElementById('container-jogo').style.display = 'none'
  document.getElementById('container-jogo-gamecube').style.display = 'flex'
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
        if (!window.matchMedia("(max-width: 480px)").matches) {
        document.getElementById('imagemMaior').src = item.imagem;
        document.getElementById('imagemMaior').style.display = 'block'
        document.getElementById('imagemMaior').style.left = event.pageX + 15 + 'px';
        document.getElementById('imagemMaior').style.top = event.pageY + 15 + 'px';
      }
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
      res.innerHTML = `${(capacidadeAtual/1000).toFixed(2)} GB / ${capacidadeMaxima/1000} GB`;

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
        res.innerHTML = `${(capacidadeAtual/1000).toFixed(2)} GB / ${capacidadeMaxima/1000} GB`;

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
      adicionarJogo('RMCE01', 'Mario Kart Wii', 2646)
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
      if (capacidadeAtual + 41150 > capacidadeMaxima) {
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
      adicionarJogo('S2UE41', 'Just Dance 2020', 4020)

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
      
        fetch('arquivo.json')
          .then(response => response.json())
          .then(data => {
            let jogosAdicionados = 0;
            for (let item of data.itens) {
              if (capacidadeAtual + item.tamanho <= capacidadeMaxima) {
                adicionarJogo(item.id, item.nome, item.tamanho);
                jogosAdicionados++;
              }
            }
            if (jogosAdicionados > 0) {
              alert('Foram adicionados ' + jogosAdicionados + ' jogo(s) a lista.');
            } else {
              alert('Não há espaço suficiente para adicionar nenhum jogo.');
            }
          })
          .catch(error => console.error(error));

        document.getElementById('CheckBoxFiltroTodosOsJogos').innerHTML = '<span class=\"material-icons\">check</span>'
        document.getElementById('CheckBoxFiltroTodosOsJogos').style.textShadow = 'black 0px 0px 7px'
        document.getElementById('FiltroTodosOsJogos').style.opacity = '100%'
        clicouTodosOsJogos = true
      
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






let clicouHdShopee = false
function FiltroHdShopee() {
  if (clicouHdShopee == false) {
    if (pen60.checked || hd500.checked || hd1tb.checked) {
      if (capacidadeAtual + 478100 > capacidadeMaxima) {
        alert('Você precisa ao menos 478.1GB para selecionar HD shopee/ML')
      } else {
        adicionarJogo('SBLE5G', 'a boy and his blob', 1268)
        adicionarJogo('SAVE5G', 'Alvin and the Chipmunks: The Squeakquel', 652)
        adicionarJogo('S7DE52', 'Angry Birds Star Wars', 904)
        adicionarJogo('RUUE01', 'Animal Crossing Wii', 324)
        adicionarJogo('RPJE7U', 'ARC RISE FANTASIA', 4066)
        adicionarJogo('RKME5D', 'Armageddon', 3936)
        adicionarJogo('R5VE41', 'avatar-master-us-v645', 1906)
        adicionarJogo('SB9E78', 'Barbie Groom and Glam Pups', 444)
        adicionarJogo('S3BEWR', 'Batman: The Brave and the Bold', 2466)
        adicionarJogo('SA6EG9', 'Ben 10 Galactic Racing', 4174)
        adicionarJogo('SVYEG9', 'Ben 10 Omniverse 2', 618)
        adicionarJogo('SBBE18', 'BEYBLADE', 236)
        adicionarJogo('RBHE08', 'biohazard0', 3776)
        adicionarJogo('RBBE18', 'Bomberman Land', 1512)
        adicionarJogo('RYBE69', 'BOOM BLOX Bash Party', 1146)
        adicionarJogo('ST7P01', 'Boom Street', 950)
        adicionarJogo('S6BE4Q', 'Brave', 1404)
        adicionarJogo('RB5E41', 'Brothers in Arms: Earned in Blood', 2438)
        adicionarJogo('RBPE4Z', 'Brunswick Pro Bowling', 150)
        adicionarJogo('RB7E54', 'Bully: Scholarship Edition', 3372)
        adicionarJogo('SB8EQH', 'Burger Bot', 290)
        adicionarJogo('RJAE52', 'Call of Duty Modern Warfare Reflex', 4028)
        adicionarJogo('SC7E52', 'Call of Duty: Black Ops', 4358)
        adicionarJogo('RVYE52', 'Call of Duty: World At War', 2760)
        adicionarJogo('RCGE54', 'Carnival Games', 352)
        adicionarJogo('SCYE4Q', 'Cars 2', 2014)
        adicionarJogo('RDGEA4', 'Castlevania Judgment', 1804)
        adicionarJogo('SCPE70', 'Centipede', 892)
        adicionarJogo('RCSE20', 'Chicken Shoot', 136)
        adicionarJogo('SCEE6K', "Chuck E. Cheese's Party Games", 670)
        adicionarJogo('RG7EQH', 'City Builder', 248)
        adicionarJogo('RC8E7D', 'Crash 2008', 2842)
        adicionarJogo('RQJE7D', 'Crash of the Titans', 3008)
        adicionarJogo('RDNEA4', 'DDR Disney Grooves', 764)
        adicionarJogo('R26E5G', 'DE ARCADE CLASSICS', 976)
        adicionarJogo('RINE08', 'DEADRISING', 3388)
        adicionarJogo('RDXE18', 'DECA SPORTS', 202)
        adicionarJogo('S3DE18', 'DECA SPORTS 3', 538)
        adicionarJogo('RZREGT', 'Destiny of Zorro', 158)
        adicionarJogo('R69E36', 'Dirt 2', 1506)
        adicionarJogo('SDGP4Q', 'Disney Channel All Star Party', 656)
        adicionarJogo('SEME4Q', 'Disney Epic Mickey', 3992)
        adicionarJogo('SERE4Q', 'Disney Epic Mickey 2: The Power of 2', 4148)
        adicionarJogo('SF8E01', 'Donkey Kong Country Returns', 3412)
        adicionarJogo('R49E01', 'DONKEY KONG JUNGLE BEAT WII', 970)
        adicionarJogo('RDKE01', 'Donkey Kong: Barrel Blast', 424)
        adicionarJogo('SDLE78', "Dood's Big Adventure", 2150)
        adicionarJogo('RDSE70', 'Dragon Ball Z Budokai Tenkaichi 3', 3158)
        adicionarJogo('RDQEGD', 'DRAGON QUEST SWORDS', 2552)
        adicionarJogo('RDVE41', 'Driver Parallel Lines', 3904)
        adicionarJogo('R4EE01', 'Endless Ocean 2', 1026)
        adicionarJogo('RN9E4F', 'Escape from Bug Island', 3500)
        adicionarJogo('RX3E01', 'ExciteBots', 1046)
        adicionarJogo('SFKEG9', 'Family Party: Fitness Fun', 412)
        adicionarJogo('RF3E52', 'Ferrari Challenge', 1098)
        adicionarJogo('RFCEGD', 'FFCC THE CRYSTAL BEARERS', 3346)
        adicionarJogo('RF9P69', 'FIFA 09 All-Play', 3082)
        adicionarJogo('SQVE69', 'FIFA 15', 4020)
        adicionarJogo('R7FEGD', 'FINAL FANTASY FABLES: Chocobo\'s Dungeon', 1770)
        adicionarJogo('RFEE01', 'FIRE EMBLEM 10 USA', 3122)
        adicionarJogo('SF4E20', 'FlatoutWii', 1264)
        adicionarJogo('R2GEXJ', 'FRAGILE DREAMS', 3928)
        adicionarJogo('RGLE7D', 'Geometry Wars: Galaxies', 368)
        adicionarJogo('RGQE70', 'Ghostbusters', 2882)
        adicionarJogo('SGCE20', 'Glacier 2', 500)
        adicionarJogo('S3GE20', 'Glacier 3', 718)
        adicionarJogo('SGPEYG', 'GPClassicRacing', 236)
        adicionarJogo('R3LEWR', 'Green Lantern: Rise of the Manhunters', 704)
        adicionarJogo('RGTE41', 'GT Pro Series', 654)
        adicionarJogo('R3NPH3', 'GUILTY GEAR XX A CORE PLUS EU', 1492)
        adicionarJogo('SA7ESZ', 'Gummy Bears Magical Medalion', 184)
        adicionarJogo('SW7EVN', 'Gunslingers', 1058)
        adicionarJogo('RBIEE9', 'Harvest Moon: Animal Parade', 1976)
        adicionarJogo('R84EE9', 'Harvest Moon: Tree of Tranquility', 1436)
        adicionarJogo('S2HE70', 'HauntedHouse', 260)
        adicionarJogo('SHVP78', 'HotWheels: Track Attack', 262)
        adicionarJogo('SHDE52', 'How to Train Your Dragon', 1596)
        adicionarJogo('SHSE20', 'Hyper Fighters', 516)
        adicionarJogo('SIAE52', 'Ice Age: Continental Drift: Arctic Games', 2202)
        adicionarJogo('STQP01', 'InazumaElevenStrikers', 4006)
        adicionarJogo('S2IE8P', 'Iron Man 2', 3494)
        adicionarJogo('RIVEXJ', 'Ivy The Kiwi', 70)
        adicionarJogo('SJBE52', 'James Bond: Golden Eye', 3944)
        adicionarJogo('R8XE52', 'Jurassic: The Hunted', 1860)
        adicionarJogo('SD2E41', 'Just Dance 2', 3090)
        adicionarJogo('SJ6E41', 'Just Dance Disney Party', 4122)
        adicionarJogo('SJHE41', 'Just Dance Greatest Hits', 3164)
        adicionarJogo('SJZE41', 'Just Dance Kids 2', 3012)
        adicionarJogo('SJ9E41', 'Just Dance Summer Party', 1544)
        adicionarJogo('SSTEG9', 'Kid Adventures: Sky Captain', 126)
        adicionarJogo('S72E01', "Kirby's Dream Collection Special Edition", 1820)
        adicionarJogo('RK5E01', "Kirby's Epic Yarn", 3832)
        adicionarJogo('SUKE01', "Kirby's Return to Dream Land Pt-Br", 1194)
        adicionarJogo('R96EAF', 'KLONOA', 1814)
        adicionarJogo('RKFEH4', 'KOF:The Orochi Saga', 2430)
        adicionarJogo('RCPE18', 'KORORINPA', 230)
        adicionarJogo('RK6E18', 'KORORINPA2', 762)
        adicionarJogo('RKHE52', 'Kung Fu Panda: Legendary Warriors', 952)
        adicionarJogo('RLBEWR', 'LEGO Batman', 2542)
        adicionarJogo('SLREWR', 'LEGO LOTR', 3524)
        adicionarJogo('RLGE64', 'LEGO Star Wars', 3040)
        adicionarJogo('RO3EXJ', "Little King's Story", 4286)
        adicionarJogo('RLTENR', 'London Taxi Rush Hour', 76)
        adicionarJogo('SV3EG9', 'Madagascar 3', 960)
        adicionarJogo('RZZE8P', 'MadWorld', 3650)
        adicionarJogo('ROLE8P', "Mario & Sonic at the Olympic Winter Games", 3464)
        adicionarJogo('SIIE8P', 'Mario & Sonic LONDON', 4078)
        adicionarJogo('RM8E01', 'Mario Party 8', 1392)
        adicionarJogo('SSQE01', 'Mario Party 9', 794)
        adicionarJogo('RMKE01', 'MARIO SPORTS MIX', 2322)
        adicionarJogo('R4QE01', 'Mario Strikers Charged', 1878)
        adicionarJogo('RMCE01', 'MarioKartWii', 2646)
        adicionarJogo('RMAE01', 'MarioTennisGC(Wii Version)', 1478)
        adicionarJogo('R38E78', 'Marvel Super Hero Squad Uploaded By BazMkt', 3496)
        adicionarJogo('RMSE52', 'Marvel Ultimate Alliance 2', 2234)
        adicionarJogo('RM2E69', 'Medal of Honor: Heroes 2', 1652)
        adicionarJogo('RMLEH4', 'METAL SLUG Anthology', 1570)
        adicionarJogo('R3ME01', 'Metroid Prime Trilogy', 7780)
        adicionarJogo('R3OE01', 'Metroid: Other M', 7616)
        adicionarJogo('SM8E52', 'Modern Warfare 3 (US EN)', 4338)
        adicionarJogo('RMHE08', 'Monster Hunter Tri', 2892)
        adicionarJogo('SAOE78', 'MonsterHigh', 870)
        adicionarJogo('RSFE7U', 'MURAMASA: THE DEMON BLADE', 630)
        adicionarJogo('SN4EDA', 'NARUTO SHIPPUDEN DRAGON BLADE CHRONICLES', 1178)
        adicionarJogo('RNEEDA', 'NARUTO: Clash of Ninja Revolution 3', 3262)
        adicionarJogo('R2NE69', 'NASCAR Kart Racing', 496)
        adicionarJogo('SNJE69', 'NBA JAM', 930)
        adicionarJogo('RNSE69', 'Need for Speed Carbon', 3472)
        adicionarJogo('RNPE69', 'Need for Speed(TM) ProStreet', 2852)
        adicionarJogo('SMNE01', 'New SUPER MARIO BROS. Wii', 348)
        adicionarJogo('SMWP01', 'Newer Super Mario World U', 854)
        adicionarJogo('SNHE69', 'NFS11', 1120)
        adicionarJogo('SNVE69', 'NFSTheRun', 848)
        adicionarJogo('R7EE8P', 'NiGHTS: Journey of Dreams', 4110)
        adicionarJogo('RNHE41', 'NO MORE HEROES', 3360)
        adicionarJogo('RUYE41', 'No More Heroes 2: Desperate Struggle', 3334)
        adicionarJogo('RO2E7N', 'OFF ROAD', 528)
        adicionarJogo('ROWE08', 'Okami', 3642)
        adicionarJogo('SUTESZ', 'ONCE UPON A TIME', 754)
        adicionarJogo('RIPEAF', 'ONEPIECE UNLIMITED ADVENTURE', 3258)
        adicionarJogo('ROXE20', 'Order Up!', 2112)
        adicionarJogo('SP7EAF', 'PAC-MAN PARTY', 2112)
        adicionarJogo('SX3EXJ', 'Pandora\'s Tower', 3134)
        adicionarJogo('RHAE01', 'PARTY PACK for REVOLUTION', 94)
        adicionarJogo('R46ENS', 'PHANTOM BRAVE Wii', 810)
        adicionarJogo('SMFE4Q', 'Phineas and Ferb Across the 2nd Dimension', 1790)
        adicionarJogo('R9IE01', 'PIKMIN1 for Wii', 1946)
        adicionarJogo('R92E01', 'PIKMIN2 for Wii', 1954)
        adicionarJogo('RQSE4Z', 'Pinball Hall Of Fame: Gottlieb Collection', 474)
        adicionarJogo('RPFE52', 'Pitfall: The Big Adventure', 1598)
        adicionarJogo('SU9E4Q', 'Planes', 1578)
        adicionarJogo('RPBE01', 'Pokemon Battle Revolution', 1008)
        adicionarJogo('RWEEA4', 'Pro Evolution Soccer 2008', 2826)
        adicionarJogo('R7PE01', 'Punch Out', 3726)
        adicionarJogo('RJ2E52', 'Quantum of Solace', 2658)
        adicionarJogo('SOJE41', 'Rayman Origins', 3522)
        adicionarJogo('RRBE41', 'Rayman Raving Rabbids', 1534)
        adicionarJogo('RD2E41', 'Red Steel 2', 2904)
        adicionarJogo('RE4E08', 'Resident Evil', 3810)
        adicionarJogo('RB4E08', 'resident evil 4 Wii edition (E)', 4064)
        adicionarJogo('RMVE69', 'Resident Evil Archives Resident Evil', 1224)
        adicionarJogo('SOME01', 'RHYTHM HEAVEN FEVER', 440)
        adicionarJogo('SRIE78', 'Rio', 1362)
        adicionarJogo('RT3E54', 'Rockstar Games presents Table Tennis', 3740)
        adicionarJogo('R3YE70', 'Sam & Max Beyond Time & Space', 862)
        adicionarJogo('RSSEH4', 'SAMURAI SHODOWN Anthology', 2484)
        adicionarJogo('R5WEA4', 'Silent Hill: Shattered Memories', 3842)
        adicionarJogo('RSNE69', 'Simpsons', 2604)
        adicionarJogo('R2VE01', 'Sin and Punishment 2', 1102)
        adicionarJogo('RVSE69', 'Skate It', 3624)
        adicionarJogo('SKYE52', 'Skylanders Giants', 3860)
        adicionarJogo('S2XE41', 'Smurfs2', 596)
        adicionarJogo('RNCEH4', 'SNK ARCADE CLASSICS VOLUME 1', 2624)
        adicionarJogo('R3RE8P', 'Sonic & SEGA All-Stars Racing', 2596)
        adicionarJogo('RSRE8P', 'Sonic and the Secret Rings', 3662)
        adicionarJogo('SNCE8P', 'Sonic Colors', 3764)
        adicionarJogo('RS9E8P', 'Sonic Riders: Zero Gravity', 3648)
        adicionarJogo('RSVE8P', 'Sonic Unleashed', 3726)
        adicionarJogo('RSLPAF', 'SOULCALIBUR Legends', 1652)
        adicionarJogo('SQME52', 'Spider-Man: Edge of Time', 1590)
        adicionarJogo('RBKE69', 'Spielberg | EA BoomBlox', 1506)
        adicionarJogo('SVDE52', 'Spongebob Squarepants Plankton\'s Robotic Revenge', 862)
        adicionarJogo('RQ4E78', 'Spongebob Squarepants Creature from the Krusty Krab', 2032)
        adicionarJogo('RSPE01', 'SPORTS PACK for REVOLUTION', 320)
        adicionarJogo('RO8E7D', 'SPYRO08', 3818)
        adicionarJogo('RSXE69', 'SSX Blur', 1056)
        adicionarJogo('RLFE64', 'Star Wars The Clone Wars: Lightsaber Duels', 4066)
        adicionarJogo('RSTE64', 'Star Wars: The Force Unleashed', 4336)
        adicionarJogo('SVME01', 'super mario collection', 196)
        adicionarJogo('RMGE01', 'SUPER MARIO GALAXY', 3504)
        adicionarJogo('SB4E01', 'SUPER MARIO GALAXY MORE', 1322)
        adicionarJogo('R8PE01', 'Super Paper Mario', 406)
        adicionarJogo('RSBE01', 'Super Smash Bros. Brawl', 7094)
        adicionarJogo('RT4EAF', 'Tales of Symphonia: Dawn of the New World', 3796)
        adicionarJogo('STKE08', 'TATSUNOKO VS. CAPCOM ULTIMATE ALL-STARS', 1436)
        adicionarJogo('SX7E52', 'Teenage Mutant Ninja Turtles', 624)
        adicionarJogo('RLEEFS', 'Ten Pin Alley 2', 526)
        adicionarJogo('STEETR', 'Tetris Party Deluxe', 56)
        adicionarJogo('SAZE52', 'The Amazing Spider-Man', 1752)
        adicionarJogo('RDIE41', 'THE DOG ISLAND', 624)
        adicionarJogo('RGME5D', 'The Grim Adventures of Billy & Mandy', 894)
        adicionarJogo('RHDE8P', 'THE HOUSE OF THE DEAD 2 AND 3 RETURN', 3322)
        adicionarJogo('RHOE8P', 'The House of the Dead:OVERKILL', 4090)
        adicionarJogo('SP5E70', 'The Kore Gang', 2548)
        adicionarJogo('SLSEXJ', 'THE LAST STORY', 5162)
        adicionarJogo('SOUE01', 'The Legend of Zelda Skyward Sword', 4214)
        adicionarJogo('RZDE01', 'The Legend of Zelda Twilight Princess', 1100)
        adicionarJogo('S3ME69', 'The Sims 3', 2884)
        adicionarJogo('RQREXJ', 'The Sky Crawlers', 3764)
        adicionarJogo('R2TE41', 'TMNT: Smash-Up Cowabunga!', 4016)
        adicionarJogo('RLRE4F', 'Tomb Raider Anniversary', 3174)
        adicionarJogo('RH8E4F', 'Tomb Raider: Underworld', 3244)
        adicionarJogo('RX5E52', 'Tony Hawk RIDE', 2262)
        adicionarJogo('STSE4Q', 'Toy Story 3', 2554)
        adicionarJogo('RVUE8P', 'Virtua Tennis 2009', 3432)
        adicionarJogo('RWLE01', 'Wario Land Shake It!', 3798)
        adicionarJogo('RODE01', 'WarioWare: Smooth Moves', 3340)
        adicionarJogo('SUPE01', 'Wii Party', 854)
        adicionarJogo('SOTE52', 'Wipeout', 424)
        adicionarJogo('SX4E01', 'Xenoblade Chronicles', 6464)
        adicionarJogo('RYOEA4', 'Yu-Gi-Oh! 5D\'s: Wheelie Breakers', 850)
        adicionarJogo('RTZE08', 'Zack and Wiki: Quest for Barbaros\' Treasure', 1992)



        document.getElementById('CheckBoxFiltroHdShopee').innerHTML = '<span class=\"material-icons\">check</span>'
        document.getElementById('CheckBoxFiltroHdShopee').style.textShadow = 'black 0px 0px 7px'
        document.getElementById('FiltroHdShopee').style.opacity = '100%'
        clicouHdShopee = true
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
  const pontoDeMudanca = 0.12 * document.documentElement.scrollHeight;
  
  if (posicao >= pontoDeMudanca) {
    botaoVoltar.style.display = 'flex';
  } else {
    botaoVoltar.style.display = 'none';
  }
});

function clicouVoltar() {
  window.scrollTo(0, 0);
}





/////////////////////////////////////////////////////////////////
/////////////////        GAMECUBE    ///////////////////////////
///////////////////////////////////////////////////////////////





fetch('gamecube.json')
.then(response => response.json())
.then(data => {
  var containerCube = document.getElementById("container-jogo-gamecube");
  data.itens.forEach(function(item) {
      var div = document.createElement("div");
      div.classList.add("jogo");
      div.id = item.id;
      div.onclick = function() {
        adicionarJogo(item.id, item.nome, item.tamanho);
      }

      div.onmouseenter = function() {
        if (!window.matchMedia("(max-width: 480px)").matches) {
        document.getElementById('imagemMaior').src = item.imagem;
        document.getElementById('imagemMaior').style.display = 'block'
        document.getElementById('imagemMaior').style.left = event.pageX + 15 + 'px';
        document.getElementById('imagemMaior').style.top = event.pageY + 15 + 'px';
      }}

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
    
      containerCube.appendChild(div);
    });
  });