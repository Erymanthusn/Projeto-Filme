const configMessages = require('../modulo/configMessages.js')

const filmeDAO = require('../../model/DAO/Filme/filme.js')
const controllerClassificacao = require('../classificacao/controller_classificacao.js')
const controllerGenero = require('../genero/controller_genero.js')

const inserirNovoFilme = async function (filme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(filme)

            if (validar) {
                return validar
            }else {

                let result = await filmeDAO.insertFilme(await tratarDados(filme))

                if (result) {
                    filme.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme

                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
                }
            } else {
                return customMessage.ERROR_CONTENT_TYPE
            }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarFilme = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeDAO.selectAllFilme()

        if (result) {
            if (result.length > 0) {

                for (filme of result){
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
                    let resultGenero = await controllerGenero.buscarGenero(filme.id_genero)

                    if(resultClassificacao.status & resultGenero.status){
                        filme.classificacao = resultClassificacao.response.classificacao
                        filme.genero = resultGenero.response.genero
                        delete filme.id_classificacao
                        delete filme.id_genero
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.filme = result
                customMessage.DEFAULT_MESSAGE.response.count = result.length

                return customMessage.DEFAULT_MESSAGE

            } else {
                return customMessage.ERROR_NOT_FOUND
            }

        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarFilme = async function (id) {
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(id).replaceAll(' ', '') == '' || id ==null || id == undefined || isNaN(id)) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            
            let result = await filmeDAO.selectByIdFilme(id)

            if (result) {
                if (result.length > 0) {

                    for (filme of result){
                        let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
    
                        if(resultClassificacao.status){
                            filme.classificacao = resultClassificacao.response.classificacao
                            delete filme.id_classificacao
                        }
                    }
                    
                    customMessage.DEFAULT_MESSAGE.status = configMessages.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = configMessages.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE
                } else {

                    return customMessage.ERROR_NOT_FOUND

                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const excluirFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarFilme = await buscarFilme(id)

        if (resultBuscarFilme.status) {
            let result = await filmeDAO.deleteFilme(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarFilme
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarFilme = async function (filme, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarFilme = await buscarFilme(id)
            if (resultBuscarFilme.status) {

                let validar = await validarDados(filme)
                if (!validar) {

                    filme.id = Number(id)

                    let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filme

                        return customMessage.DEFAULT_MESSAGE

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarFilme
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validarDados = async function (filme) {
     let customMessage = JSON.parse(JSON.stringify(configMessages))
      if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
         customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST 
    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
         customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
          return customMessage.ERROR_BAD_REQUEST 
    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa > 255) {
         customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
          return customMessage.ERROR_BAD_REQUEST 
    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST 
    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
         customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
          return customMessage.ERROR_BAD_REQUEST 
    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
         customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO' 
         return customMessage.ERROR_BAD_REQUEST 
    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO' 
        return customMessage.ERROR_BAD_REQUEST 
    } else if(filme.id_classificacao == undefined || filme.id_classificacao == null ||filme.id_classificacao <=0 ){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
        
    } else if(filme.id_genero == undefined || filme.id_genero == null || filme.id_genero <=0){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
        
    } else { 
        return false
    } 
}

const tratarDados = async function (filme) {

    filme.nome = String(filme.nome).replaceAll("'", "")
    filme.sinopse = String(filme.sinopse).replaceAll("'", "")
    filme.capa = String(filme.capa).replaceAll("'", "")
    filme.data_lancamento = String(filme.data_lancamento).replaceAll("'", "")
    filme.duracao = String(filme.duracao).replaceAll("'", "")
    filme.valor = String(filme.valor).replaceAll("'", "")
    filme.avaliacao = String(filme.avaliacao).replaceAll("'", "")
    filme.id_classificacao = String(filme.id_classificacao).replaceAll("'", "")
    filme.id_genero = String(filme.id_genero).replaceAll("'", "")


    return filme
}

module.exports = {
    inserirNovoFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
    atualizarFilme
}