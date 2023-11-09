//string de conexão
// mongodb+srv://wonts:1234@cluster0.d0bocki.mongodb.net/?retryWrites=true&w=majority

const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
//const req = require("express/lib/request")
const app = express()

//string de conexãp protoclo://servidor:porta/acessos               (req, res, next) req = requisição res = resposta next = encadeamento (nn obrigatorio)

app.use(express.json())
app.use(cors())


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

async function conectarMongodb(){
    await mongoose.connect(`mongodb+srv://wonts:1234@cluster0.d0bocki.mongodb.net/?retryWrites=true&w=majority`)
}

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},                                                                                                                                                                                                                                                                                                                                             
    sinopse: {type: String}
}))

//acesso para requisção http-get /oi
app.get("/oi", (req, res) => {res.send('oi')})

//acesso para requisição http-get /filmes
app.get("/filmes", (req, res) => {
    const filmes = Filme.find()
    res.json(filmes)
})    

//acesso para requisição http-post /filmes. ou seja, vamos inserir um novo filme no bancoo
app.post ("/filmes", async (req, res) => { //nn é mais uma requisição local
    //obter dados que serão inseridos
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o objeto json que sera inserido
    const filme = new Filme ({titulo: titulo, sinopse: sinopse})
    //inserir o novo filme no banco
    await filme.save()
    //trazemos do banco a coleção atualizada
    const filmes = await Filme.find() //variavle local que vai buscar la no banco
    //só para conferir (nn é necessario)
    res.json(filmes)
})

app.listen(3000, () => {
    try{
        conectarMongodb();
        console.log("conexão ok e app up & running");   
    }
    catch(e){
        console.log("erro: ", e)
    }
})