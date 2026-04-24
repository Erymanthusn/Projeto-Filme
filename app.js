//Import das dependências para criar a API
const express   = require('express')
const cors      = require('cors')
const bodyParser = require('body-parser')

//Permitindo a utilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

//Criando um objeto para manipular o express
const app = express()


//Conjuntos permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'], //Origem da requisição, podendo ser um IP ou o * (Todos)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //São os verbos que srão liberados na API (GET, POST, PUT e DELETE)
    allowedHeaders:['Content-type', 'Autorization'], //São permissões de cabeçalho do CORS
}

//Configura as permissões da API através do CORS
app.use(cors(corsOptions))

const controllerFilme = require('./controller/filme/controller_filme')

//ENDPOINTS
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    //Chama a função de inserir e encaminha os dados d filme e o contentType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    console.log(result)
    response.status(result.status_code)
    response.json(result)

})


app.listen(8080, function(){
    console.log(`Servidor rodando`)
})