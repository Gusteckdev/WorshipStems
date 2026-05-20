const tocandoAgora = document.getElementById("tocandoAgora")
const resultado = document.getElementById("resultado")
const player = document.getElementById("player")
const botao = document.getElementById("btnBuscar")
const input = document.getElementById("busca")
const sugestoes = document.getElementById("sugestoes")

const btnParar = document.getElementById("btnParar")
const btnLimpar = document.getElementById("btnLimpar")
const btnPlayTodos = document.getElementById("btnPlayTodos")

let audiosAtivos = []

const musicas = [

{
nome:"Oceans",
artista:"Hillsong United",
tom:"D",
bpm:68,
instrumentos:{
"Baixo": "audio/oceans-baixo.mp3",
"Bateria": "audio/oceans-bateria.mp3",
"Violão": "audio/oceans-violao.mp3",
"Voz Principal": "audio/oceans-vozprincipal.mp3"
}
},

{
nome:"Ninguém Explica Deus",
artista:"Preto no Branco",
tom:"G",
bpm:72,
instrumentos:{
"Teclado": "audio/ninguemexplicadeus-teclado.mp3",
"Bateria": "audio/ninguemexplicadeus-bateria.mp3",
"Baixo": "audio/ninguemexplicadeus-baixo.mp3",
"Voz Principal": "audio/ninguemexplicadeus-vozprincipal.mp3"
}
}

]

function buscarMusica(nomeDigitado){

resultado.innerHTML = ""
player.innerHTML = ""
audiosAtivos = []

for(let musica of musicas){

if(musica.nome.toLowerCase().includes(nomeDigitado.toLowerCase())){
renderizarMusica(musica)
}

}

}

function renderizarMusica(musica){

resultado.innerHTML += `
<h2>${musica.nome}</h2>
<p><strong>Artista:</strong> ${musica.artista}</p>
<p><strong>Tom:</strong> ${musica.tom}</p>
<p><strong>BPM:</strong> ${musica.bpm}</p>
<p><strong>Instrumentos:</strong></p>
`

const container = document.createElement("div")
container.classList.add("instrumentos-container")

for(let instrumento in musica.instrumentos){

let caminho = musica.instrumentos[instrumento]

const btn = document.createElement("button")
btn.textContent = instrumento

btn.onclick = () => mostrarCard(musica, instrumento, caminho)

container.appendChild(btn)
}

resultado.appendChild(container)
}

function mostrarCard(musica, instrumento, caminho){

// cria card
const card = document.createElement("div")
card.classList.add("player-card")

// título
const titulo = document.createElement("h3")
titulo.textContent = "🎧 " + instrumento

// nome música
const nomeMusica = document.createElement("p")
nomeMusica.innerHTML = `<strong>Música:</strong> ${musica.nome}`

// áudio
const audio = document.createElement("audio")
audio.controls = true
audio.src = caminho

// volume
const volume = document.createElement("input")
volume.type = "range"
volume.min = 0
volume.max = 1
volume.step = 0.1
volume.value = 1
volume.classList.add("volume")

volume.oninput = () => {
audio.volume = volume.value
}

// botão remover
const remover = document.createElement("button")
remover.textContent = "❌ Remover"
remover.classList.add("btn-remover")

remover.onclick = () => {

audio.pause()

audiosAtivos = audiosAtivos.filter(a => a !== audio)

card.remove()

atualizarTocando()

}

// adiciona no card
card.appendChild(titulo)
card.appendChild(nomeMusica)
card.appendChild(audio)
card.appendChild(volume)
card.appendChild(remover)

// adiciona na tela
player.appendChild(card)

// salva áudio
audiosAtivos.push(audio)

atualizarTocando()

}

function mostrarSugestoes(texto){

sugestoes.innerHTML = ""
if(texto === "") return

for(let musica of musicas){

if(musica.nome.toLowerCase().includes(texto.toLowerCase())){

const item = document.createElement("div")
item.textContent = musica.nome
item.classList.add("item-sugestao")

item.onclick = () => {
input.value = musica.nome
sugestoes.innerHTML = ""
buscarMusica(musica.nome)
}

sugestoes.appendChild(item)
}
}
}

btnParar.onclick = () => {
audiosAtivos.forEach(a => {
a.pause()
a.currentTime = 0
})
}

btnLimpar.onclick = () => {
audiosAtivos.forEach(a => a.pause())
audiosAtivos = []
player.innerHTML = ""
}

btnPlayTodos.onclick = () => {

// pausa todos primeiro
audiosAtivos.forEach(audio => {
audio.pause()
audio.currentTime = 0
})

// pequeno delay para sincronizar
setTimeout(() => {

audiosAtivos.forEach(audio => {
audio.play()
})

}, 100)

}

botao.onclick = () => buscarMusica(input.value)

input.addEventListener("input", () => {
buscarMusica(input.value)
mostrarSugestoes(input.value)
})

mostrarTodas()

function mostrarTodas(){
resultado.innerHTML = ""
musicas.forEach(renderizarMusica)
}
function atualizarTocando(){

if(audiosAtivos.length === 0){
tocandoAgora.textContent = "🎵 Nenhum instrumento ativo"
return
}

let nomes = []

document.querySelectorAll(".player-card h3").forEach(item => {
nomes.push(item.textContent.replace("🎧 ",""))
})

tocandoAgora.textContent = "🎵 Tocando agora: " + nomes.join(" • ")

}