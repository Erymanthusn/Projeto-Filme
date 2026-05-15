const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()


//criando um objeto do express para criar API
const app = express()

//cofigurações do CORS da API
const corsOptions = {

    origin: ['*'],  //configuração de origem da requisição (IP ou dominio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS',  //configuração dos verbo que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] // configurações de permissoes
    //tipo de dados //autorização de acesso
}


//aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')
const controllerSexo = require('./controller/sexo/controller_sexo.js')

app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {

    //Recebendo o body da requisição
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


app.get('/v1/senai/locadora/filme', async function (request, response) {

    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/filme/:id', async function (request, response) {

    //Recebe id de filme via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/filme/:id',bodyParserJSON, async function(request, response){
    
    //Recebe o content-type da requisição, para voltae se é JSON
    let contentType = request.headers['content-type']

    //Recebe o ID do registro a ser atualizado
    let id = request.params.id

    //Recebe os dados do body, que serão modificados no BD
    let dados = request.body

    //Chama a função para atualizar o filme, devemos encaminhar as 3 variáveis na mesma sequencia que a função foi criada
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)


    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/filme/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)


})


//ENDPOINTS de Genero:

app.post('/v1/senai/locadora/genero', bodyParserJSON, async function (request, response) {
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirNovoGenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero', bodyParserJSON, async function (request, response) {

    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
    
})

app.delete('/v1/senai/locadora/genero/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/genero/:id',bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerGenero.atualizarGenero(dados, id, contentType)


    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/genero/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)

})

//ENDPOINTS de Nacionalidade:

app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function (request, response) {
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNovoNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function (request, response) {

    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
    
})

app.delete('/v1/senai/locadora/nacionalidade/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerNacionalidade.excluirNacionalidade(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/nacionalidade/:id',bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)


    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/nacionalidade/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)

})


//ENDPOINTS de Sexo:

app.post('/v1/senai/locadora/sexo', bodyParserJSON, async function (request, response) {
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerSexo.inserirNovoSexo(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/sexo', bodyParserJSON, async function (request, response) {

    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
    
})

app.delete('/v1/senai/locadora/sexo/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerSexo.excluirSexo(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/sexo/:id',bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerSexo.atualizarSexo(dados, id, contentType)


    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/sexo/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerSexo.buscarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

//ENDPOINTS de Classificação:

app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function (request, response) {
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirNovoClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao', bodyParserJSON, async function (request, response) {

    let result = await controllerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
    
})

app.delete('/v1/senai/locadora/classificacao/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/classificacao/:id',bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)


    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/classificacao/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})


app.listen(8080, function () {

    console.log('API aguardando novas requisições ...')
})