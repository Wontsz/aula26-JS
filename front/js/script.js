const protocolo = 'http://'
const host = 'localhost:3000' //servidor localhost na porta 3000
const filmesEndpoint = '/filmes' // End point

async function obterFilmes(){ //async e await 
    // console.log("teste123")
    const URLcompleta =  `${protocolo}${host}${filmesEndpoint}`; // junção de tudo
    const filmes = (await axios.get(URLcompleta)).data; //resultado da requisição get 
    //console.log(filmes)
    let tabela = document.querySelector('.filmes');
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]; //tbody posição 0
    for(let filme of filmes){ //para cada filme na minha lista de filmes
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}

async function cadastrarFilme(){
    const URLcompleta = `${protocolo}${host}${filmesEndpoint}`
    let tituloInput = document.querySelector("#tituloInput") //variavel tituloInput
    let sinopseInput = document.querySelector("#sinopseInput") //variavel sinopseInput
    let titulo = tituloInput.value //pega o valor digitado do titulo
    let sinopse = sinopseInput.value //pega o valor digitado da sinopse
    tituloInput.value = ""
    sinopseInput.value = ""
    if (titulo && sinopse){
        const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data

        console.log(filmes)
        const tabela = document.querySelector(".filmes")
        const corpoTabela = tabela.getElementsByTagName("tbody")[0]
        corpoTabela.innerHTML = ""
        for(let filme of filmes){ //para cada filme na minha lista de filmes
            let linha = corpoTabela.insertRow(0)
            let celulaTitulo = linha.insertCell(0)
            let celulaSinopse = linha.insertCell(1)
            celulaTitulo.innerHTML = filme.titulo
            celulaSinopse.innerHTML = filme.sinopse
        }
    }
    else{
        let alert = document.querySelector(".alert")
        alert.classList.add("show")
        alert.classList.remove("d-none")
        setTimeout(() => {
            alert.classList.add('d-none')
            alert.classList.remove("show")
        }, 2000)
    }
}