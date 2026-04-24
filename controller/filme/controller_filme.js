/*********************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação, tratamento,
 *           manipulacao de dados para o CRUD de filmes
 * Data: 2026-04-17
 * Autor: Kaique Carvalho
 * Versão: 1.0
 *********************************************************************************************************/

//Import do arquivo de configurações de mensagem do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo de DAO para manipular os dados do filme no Banco de Dados
const filmeDAO = require('../../model/DAO/Filme/filme.js')

//Função para inserir um novo filme
const inserirNovoFilme = async function(filme, contentType) {

    //Cria uma copia dos JSON do arquivo de configuração de mensagem
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
   

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função para validar a entrada dos daods do filme
            let validacao = validarFilme(filme)

            if(!validacao.status){
                customMessage.DEFAULT_MESSAGE = customMessage.ERROR_BAD_REQUEST
                customMessage.DEFAULT_MESSAGE.field = validacao.field
                return customMessage.DEFAULT_MESSAGE
            }
            
            //Encaminha os dados do Filme para o DAO inserir no BD
            let result =await filmeDAO.insertFilme(filme)

            if(result){ //201
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

            }else{ //500
                customMessage.DEFAULT_MESSAGE.status = customMessage.ERROR_INTERNAL_SERVER_MODEL.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.ERROR_INTERNAL_SERVER_MODEL.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.ERROR_INTERNAL_SERVER_MODEL.message

            }

            return customMessage.DEFAULT_MESSAGE
    }else{
        return customMessage.ERROR_CONTENT_TYPE //415
    }

        } catch (error) {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500      
        }
}

//Função para validar os dados de cadastro do Filme
const validarFilme = function(filme) {

    if(!filme.nome || filme.nome === '' || filme.nome.length > 80){
        return { status: false, field: '[NOME] INVALIDO' }
    }
    if(!filme.sinopse || filme.sinopse === ''){
        return { status: false, field: '[SINOPSE] INVALIDO' }
    }
    if(!filme.capa || filme.capa === '' || filme.capa.length > 255){
        return { status: false, field: '[CAPA] INVALIDO' }
    }

    if(!filme.data_lancamento || filme.data_lancamento.length !== 10){
        return { status: false, field: '[DATA LANCAMENTO] INVALIDO' }
    }
    if(!filme.duracao || filme.duracao === ''){
        return { status: false, field: '[DURAÇÃO] INVALIDO' }
    }
    if(!filme.valor || filme.valor == undefined || isNaN(filme.valor)){
        return { status: false, field: '[VALOR] INVALIDO' }
    }
    if(filme.avaliacao == undefined || isNaN(filme.avaliacao)){
        return { status: false, field: '[AVALIAÇÃO] INVALIDO' }
    }
    return { status: true }
}

//Função para atualizar um filme existente
const atualizarFilme = async function() {

}

//Função para retornar todos os filmes existentes
const listarFilme = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let result = await filmeDAO.selectAllFilme()

        //Validação para verificar se o DAO conseguiu processar o script no banco de dados
        if(result){
            //Validação para verificar se o conteúdo do Array tem dados de retorno ou se está vazio
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE
            }else{
                return customMessage.ERROR_NOT_FOUND //404
            }

        }else{
            return customMessage.error.ERROR_INTERNAL_SERVER_MODEL //500(Model)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Controller)
    }

}


//Função para buscar um filme pelo ID
const buscarFilme = async function(id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o ID seja um número válido
        if(id == '' || id == null || id == undefined || isNaN(Number(id))){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        }else{
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)
            //Validação para verificar se o DAO retornou dados ou um FALSE (erro)
            if(result){
                //Validação para verificar se o DAO tem algum dado no Array
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE//200
                }else{
                    return customMessage.ERROR_NOT_FOUND //404
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
        
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Controller)
    }
}

console.log(buscarFilme)
//Função para excluir um filme
const excluirFilme = async function() {

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme

}