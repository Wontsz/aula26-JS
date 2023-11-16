//string de conexão
// mongodb+srv://wonts:1234@cluster0.d0bocki.mongodb.net/?retryWrites=true&w=majority
//imports
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const  bcrypt = require('bcrypt')
const { response } = require('express')
//const req = require("express/lib/request")
const app = express()

//string de conexãp protoclo://servidor:porta/acessos               (req, res, next) req = requisição res = resposta next = encadeamento (nn obrigatorio)

app.use(express.json())
app.use(cors())

// npm install --force mongoose-unique-validator (impede q tenha logins repetidos) --force (versao inferior)
async function conectarMongodb(){
    await mongoose.connect(`mongodb+srv://wonts:1234@cluster0.d0bocki.mongodb.net/?retryWrites=true&w=majority`)
}

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},                                                                                                                                                                                                                                                                                                                                             
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({//validar o login
    login: ({type: String, unique: true, require: true}),
    senha: ({type: String, require: true})
}) 
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario:", usuarioSchema)

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

//end point login
app.post('/signup', async (req, res) => {
    try{
        const login = req.body.login
        const senha = req.body.senha
        const criptografada = await bcrypt.hash(senha, 50)
        const usuario = new Usuario({login: login, senha: criptografada})
        const respotaMongo = await usuario.save()
        console.log(respotaMongo)
        res.status(201).end()
    }
    catch(e){
        console.log(e)
        res.status(409).end()
    }
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