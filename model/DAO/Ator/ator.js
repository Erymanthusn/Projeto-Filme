/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela ator
 *      Filme
 * Data: 2026-05-27
 * Autor: Kaique Carvalho Costa
 * Versão: 1.0
 * 
 *******************************************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexdatabaseConfig.development)

// Função para inserir um novo ator no banco de dados
const insertAtor = async function (ator) {

    try {

        let sql = `insert into tbl_ator(
            sigla
        ) values (
            '${ator.sigla}'
        );`
    

        //Encaminha para o banco de dados o scriptSQL
        let result = await knexConection.raw(sql)

        if (result) {

            return result[0].insertId // Retorna o id gerado no insert

        } else {

            return false

        }

    } catch (error) {
        return false

    }

}

const updateAtor = async function (ator) {
    
    try {
        let sql = `update tbl_ator set
            sigla = '${ator.sigla}'
            where id = ${ator.id};`

    let result = await knexConection.raw(sql)
    if(result)
        return true
    
    else
        return false


    } catch (error) {
        return false
    }
}

const selectAllAtor = async function () {

    try {
        let sql = 'select * from tbl_ator order by id desc'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]

        } else {
            return false
        }
    } catch (error) {
        return false
    }
    
}

const selectByIdAtor = async function (id) {

    try {
        
        let sql = `select * from tbl_ator where id=${id}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]

        } else {
            return false
        }

    } catch (error) {

        return false

    }
    
}

const deleteAtor = async function (id) {

    try {
        let sql = `delete from tbl_ator where id=${id}`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
    
}

module.exports = {
    insertAtor,
    updateAtor,
    selectAllAtor,
    selectByIdAtor,
    deleteAtor
}