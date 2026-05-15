const configMessages = require('../modulo/configMessages.js')

const sexoDAO = require('../../model/DAO/Sexo/sexo.js')

const inserirNovoSexo = async function (sexo, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(sexo)

            if (validar) {
                return validar
            }else {

                let result = await sexoDAO.insertSexo(await tratarDados(sexo))

                if (result) {
                    sexo.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = sexo

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

const listarSexo = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await sexoDAO.selectAllSexo()

        if (result) {
            if (result.length > 0) {
                
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.sexo = result
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

const buscarSexo = async function (id) {
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(id).replaceAll(' ', '') == '' || id ==null || id == undefined || isNaN(id)) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            
            let result = await sexoDAO.selectByIdSexo(id)

            if (result) {
                if (result.length > 0) {
                    
                    customMessage.DEFAULT_MESSAGE.status = configMessages.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = configMessages.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.sexo = result

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

const excluirSexo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarSexo = await buscarSexo(id)

        if (resultBuscarSexo.status) {
            let result = await sexoDAO.deleteSexo(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarSexo
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarSexo = async function (sexo, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarSexo = await buscarSexo(id)
            if (resultBuscarSexo.status) {

                let validar = await validarDados(sexo)
                if (!validar) {

                    sexo.id = Number(id)

                    let result = await sexoDAO.updateSexo(await tratarDados(sexo))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = sexo

                        return customMessage.DEFAULT_MESSAGE

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarSexo
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validarDados = async function (sexo) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (sexo.sigla == '' || sexo.sigla == null || sexo.sigla == undefined || sexo.sigla.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (sexo) {

    sexo.sigla = sexo.sigla.replaceAll("'", "")

    return sexo
}

module.exports = {
    inserirNovoSexo,
    listarSexo,
    buscarSexo,
    excluirSexo,
    atualizarSexo
}