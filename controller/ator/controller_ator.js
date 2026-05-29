const configMessages = require('../modulo/configMessages.js')

const atorDAO = require('../../model/DAO/Ator/ator.js')
const controllerSexo = require('../sexo/controller_sexo.js')

const inserirNovoAtor = async function (ator, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(ator)

            if (validar) {
                return validar
            }else {

                let result = await atorDAO.insertAtor(await tratarDados(ator))

                if (result) {
                    ator.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = ator

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

const listarAtor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorDAO.selectAllAtor()

        if (result) {
            if (result.length > 0) {
                
                for (ator of result){
                     let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)
                                    
                
                    if(resultSexo.status){
                        ator.sexo = resultSexo.response.sexo
                        delete ator.id_sexo
                
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.ator = result
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

const buscarAtor = async function (id) {
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(id).replaceAll(' ', '') == '' || id ==null || id == undefined || isNaN(id)) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            
            let result = await atorDAO.selectByIdAtor(id)

            if (result) {
                if (result.length > 0) {
                    
                    customMessage.DEFAULT_MESSAGE.status = configMessages.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = configMessages.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator = result

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

const excluirAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarator = await buscarAtor(id)

        if (resultBuscarator.status) {
            let result = await atorDAO.deleteAtor(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarator
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarAtor = async function (ator, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarator = await buscarator(id)
            if (resultBuscarator.status) {

                let validar = await validarDados(ator)
                if (!validar) {

                    ator.id = Number(id)

                    let result = await atorDAO.updateator(await tratarDados(ator))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = ator

                        return customMessage.DEFAULT_MESSAGE

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarator
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validarDados = async function (ator) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (ator.nome == '' || ator.nome == null || ator.nome == undefined || ator.nome.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }  if (ator.data_nascimento == '' || ator.data_nascimento == null || ator.data_nascimento == undefined || ator.data_nascimento.length < 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA_NASCIMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }  if (ator.foto == '' || ator.foto == null || ator.foto == undefined || ator.foto.length > 400) {
        customMessage.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }  if (ator.biografia == '' || ator.biografia == null || ator.biografia == undefined || ator.biografia.length < 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }  if (ator.id_sexo == '' || ator.id_sexo == null || ator.id_sexo == undefined || ator.id_sexo.length < 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else {
        return false
    }
}

const tratarDados = async function (ator) {

    ator.nome = String(ator.nome).replaceAll("'", "")
    ator.data_nascimento = String(ator.data_nascimento).replaceAll("'", "")
    ator.duracao = String(ator.foto).replaceAll("'", "")
    ator.biografia = String(ator.biografia).replaceAll("'", "")
    ator.id_sexo = String(ator.id_sexo).replaceAll("'", "")


    return ator
}

module.exports = {
    inserirNovoAtor,
    listarAtor,
    buscarAtor,
    excluirAtor,
    atualizarAtor
}