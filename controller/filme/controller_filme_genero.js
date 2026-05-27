const configMessages = require('../modulo/configMessages.js')

const filmeGeneroDAO = require('../../model/DAO/Filme_Genero/filme_genero.js')

const inserirNovoFilmeGenero = async function (filmeGenero) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {


            let validar = await validarDados(filmeGenero)

            if (validar) {
                return validar
            }else {

                let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

                if (result) {
                    filmeGenero.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeGenero

                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
                
            }
        
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirGenerosByIDFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
       
        let resultBuscarFilmeGenero = await buscarFilmeGenero(idFilme)

        if (resultBuscarFilmeGenero.status) {
            let result = await filmeGeneroDAO.deleteGenerosByIDFilme(idFilme)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarFilmeGenero
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarFilmeGenero = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        if (result) {
            if (result.length > 0) {
                
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code               
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filmeGenero = result
                return customMessage.DEFAULT_MESSAGE

            } else {
                return customMessage.ERROR_NOT_FOUND
            }

        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarFilmeGenero = async function (id) {
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(id).replaceAll(' ', '') == '' || id ==null || id == undefined || isNaN(id)) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if (result) {
                if (result.length > 0) {
                    
                    customMessage.DEFAULT_MESSAGE.status = configMessages.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = configMessages.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filmeGenero = result

                    return customMessage.DEFAULT_MESSAGE
                } else {

                    return customMessage.ERROR_NOT_FOUND

                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const excluirFilmeGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarFilmeGenero = await buscarFilmeGenero(id)

        if (resultBuscarFilmeGenero.status) {
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarFilmeGenero
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarFilmeGenero = async function (filmeGenero, id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        

            let resultBuscarFilmeGenero = await buscarFilmeGenero(id)
            if (resultBuscarFilmeGenero.status) {

                let validar = await validarDados(filmeGenero)
                if (!validar) {

                    filmeGenero.id = Number(id)

                    let result = await filmeGeneroDAO.updateFilmeGenero(await tratarDados(filmeGenero))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeGenero

                        return customMessage.DEFAULT_MESSAGE

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarFilmeGenero
            }

    } catch (error) {
        console.log(error)
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


const buscarGenerosByIDFilme = async function (idFilme) {
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(idFilme).replaceAll(' ', '') == '' || idFilme ==null || idFilme == undefined || isNaN(idFilme) || idFilme <= 0) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            
            let result = await filmeGeneroDAO.selectGenerosByIDFilme(idFilme)

            if (result) {
                if (result.length > 0) {
                    
                    customMessage.DEFAULT_MESSAGE.status = configMessages.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = configMessages.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filmeGenero = result

                    return customMessage.DEFAULT_MESSAGE
                } else {

                    return customMessage.ERROR_NOT_FOUND

                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const buscarFilmesByIDGenero = async function (idGenero) {
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        if (String(idGenero).replaceAll(' ', '') == '' || idGenero ==null || idGenero == undefined || isNaN(idGenero) || idGenero <= 0) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            
            let result = await filmeGeneroDAO.selectFilmesByIDGenero(idGenero)

            if (result) {
                if (result.length > 0) {
                    
                    customMessage.DEFAULT_MESSAGE.status = configMessages.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = configMessages.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filmeGenero = result

                    return customMessage.DEFAULT_MESSAGE
                } else {

                    return customMessage.ERROR_NOT_FOUND

                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validarDados = async function (filmeGenero) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (filmeGenero.id_filme == '' || filmeGenero.id_filme == null || filmeGenero.id_filme == undefined || filmeGenero.id_filme <= 0 || isNaN(filmeGenero.id_filme)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filmeGenero.id_genero == '' || filmeGenero.id_genero == null || filmeGenero.id_genero == undefined || filmeGenero.id_genero <= 0 || isNaN(filmeGenero.id_genero)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    
    } else{
        return false
    }
}

module.exports = {
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    excluirFilmeGenero,
    atualizarFilmeGenero,
    buscarGenerosByIDFilme,
    buscarFilmesByIDGenero,
    excluirGenerosByIDFilme
}