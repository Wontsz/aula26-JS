const express = require("express")
const req = require("express/lib/request")
const app = express()

//string de conexãp protoclo://servidor:porta/acessos               (req, res, next) req = requisição res = resposta next = encadeamento (nn obrigatorio)

app.use(express.json())

let filmes = [
    {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    },
    {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]
//acesso para requisção http-get /oi
app.get("/oi", (req, res) => {res.send('oi')})

//acesso para requisição http-get /filmes
app.get("/filmes", (req, res) => {res.send(filmes)})    

//acesso para requisição http-post /filmes. ou seja, vamos inserir um novo filme na !lista em memória!
app.post ("/filmes", (res, res) => {
    //obter dados que serão inseridos
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o objeto json que sera inserido
    const filme = {titulo: titulo, sinopse:sinopse}
    //inserir o novo filme no vetor fillme
    filmes.push(filme)
    //só para conferir (nn é necessario)
    res.send(filmes)
})
app.listen(3000, () => console.log("app up & runnin"))

