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
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const Duracao = {
    Foco: 1500,
    Longo: 900,
    Curto: 300
}
let tempoDecorridoEmSegundos = 5;

musicaFocoInput.addEventListener('change',()=>{
    if (musica.paused == true){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=>{
    alterarContexto('foco')
})

curtoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-curto')
})

longoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-longo')
})

function alterarContexto(contexto){

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
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' , tempoDecorridoEmSegundos);
}

startPauseBt.addEventListener('click', () => {
    contagemRegressiva();
})