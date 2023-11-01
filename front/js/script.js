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