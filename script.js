const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const startPauseBt = document.querySelector('#start-pause');
const temporizadorBt = document.querySelector('.app__card-primary-button');
const temporizador = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const text = document.querySelector('.app__title');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musicaFocoInput = document.querySelector('#alternar-musica')
const playPauseImg = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')


const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioBeep = new Audio('/sons/beep.mp3');
const audioLuna = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const Duracao = {
    Foco: 1500,
    Longo: 900,
    Curto: 300
}
let tempoDecorridoEmSegundos = Duracao.Foco;
let intervaloId = null;

musicaFocoInput.addEventListener('change',()=>{
    if (musica.paused == true){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = Duracao.Foco
    alterarContexto('foco')
})

curtoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = Duracao.Curto
    alterarContexto('descanso-curto')
})

longoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = Duracao.Longo
    alterarContexto('descanso-longo')
})

function alterarContexto(contexto){
    mostrarTempo()

    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            focoBt.classList.add('active')
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
        case "descanso-curto":
            curtoBt.classList.add('active')
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
                break;
        case "descanso-longo":
            longoBt.classList.add('active')
            titulo.innerHTML = `Hora de voltar a superfície,<br>
                <strong class="app__title-strong">faça uma pausa longa!.</strong>`
                break;
        default:
            break;
    }
}
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioBeep.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    playPauseImg.setAttribute('src','/imagens/pause.png')
}

function zerar(){
    audioPause.play()
    iniciarOuPausarBt.textContent = "Começar"
    playPauseImg.setAttribute('src','/imagens/play_arrow.png')
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()