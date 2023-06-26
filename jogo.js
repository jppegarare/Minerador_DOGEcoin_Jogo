const nMoedas = 45;
const tInicial = 15;
let pontos = 0;
let tempo = 0;
let timer = null;

const nome = prompt("Qual seu nome?")

function iniciaJogo() 
{
    pontos = 0;
    tempo = tInicial;
    let tela = document.getElementById("tela");
    tela.innerHTML = "";

    for(let i = 0; i < nMoedas; ++i) 
    {
        let moeda = document.createElement("img");
        moeda.src = "doge.jpg";
        moeda.id = "m" + i;
        moeda.onclick = function()
        {
            pegaMoeda(this)
        }
        tela.appendChild(moeda);

        fetch('http://localhost:5050/score')

        .then(response => {
    
            if (!response.ok) {
    
              throw new Error('Erro na requisição');
    
           }
    
           return response.json();
    
        })
    
        .then(data => {
    
            console.log(data);
    
            const jogadores = data;
    
            jogadores.forEach(jogador => {
    
              criarElemento(jogador.name, jogador.pontuacao);
    
            });
    
        })
    
        .catch(error => {
    
          console.error(error);
    
        });

    }

    timer = setInterval(contaTempo, 1000)
}

function pegaMoeda(moeda)
{
    if(tempo <= 0) return;

    moeda.onclick = null;
    moeda.src = "dogeminerado.jpg";
    ++pontos;


    let contadorP = document.getElementById("pontos");
    contadorP.innerText = pontos
}

function contaTempo() 
{
    --tempo;
    let contadorTemp = document.getElementById("tempo");
    contadorTemp.innerText = tempo

    if (tempo <= 0)
    {
        clearInterval(timer)
        alert("Parabéns " + nome + ", "  + "você pegou " + pontos + " DOGEcoins")
        iniciaJogo();
    }
}