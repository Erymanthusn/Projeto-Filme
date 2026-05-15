const configMessages = require('../modulo/configMessages.js')

const classificacaoDAO = require('../../model/DAO/Classificacao/classificacao.js')

const inserirNovoClassificacao = async function (classificacao, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(classificacao)

            if (validar) {
                return validar
            }else {

                let result = await classificacaoDAO.insertClassificacao(await tratarDados(classificacao))

                if (result) {
                    classificacao.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao

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

const listarClassificacao = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await classificacaoDAO.selectAllClassificacao()

        if (result) {
            if (result.length > 0) {
                
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.classificacao = result
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

const buscarClassificacao = async function (id) {
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(id).replaceAll(' ', '') == '' || id ==null || id == undefined || isNaN(id)) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            
            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if (result) {
                if (result.length > 0) {
                    
                    customMessage.DEFAULT_MESSAGE.status = configMessages.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = configMessages.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.classificacao = result

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

const excluirClassificacao = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarClassificacao = await buscarClassificacao(id)

        if (resultBuscarClassificacao.status) {
            let result = await classificacaoDAO.deleteClassificacao(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarClassificacao
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarClassificacao = async function (classificacao, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarClassificacao = await buscarClassificacao(id)
            if (resultBuscarClassificacao.status) {

                let validar = await validarDados(classificacao)
                if (!validar) {

                    classificacao.id = Number(id)

                    let result = await classificacaoDAO.updateClassificacao(await tratarDados(classificacao))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = classificacao

                        return customMessage.DEFAULT_MESSAGE

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarClassificacao
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validarDados = async function (classificacao) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (classificacao.descricao == '' || classificacao.descricao == null || classificacao.descricao == undefined || classificacao.descricao.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (classificacao) {

    classificacao.descricao = classificacao.descricao.replaceAll("'", "")

    return classificacao
}

module.exports = {
    inserirNovoClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao,
    atualizarClassificacao
}