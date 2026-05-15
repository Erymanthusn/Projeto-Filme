/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela nacionalidade
 *      Filme
 * Data: 2026-5-15
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

// Função para inserir um novo nacionalidade no banco de dados
const insertNacionalidade = async function (nacionalidade) {


    try {

        let sql = `insert into tbl_nacionalidade(
            pais
        ) values (
            '${nacionalidade.pais}'
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

const updateNacionalidade = async function (nacionalidade) {
    
    try {
        let sql = `update tbl_nacionalidade set
            pais = '${nacionalidade.pais}'
            where id = ${nacionalidade.id};`

    let result = await knexConection.raw(sql)
    if(result)
        return true
    
    else
        return false


    } catch (error) {
        return false
    }
}

const selectAllNacionalidade = async function () {

    try {
        let sql = 'select * from tbl_nacionalidade order by id desc'

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

const selectByIdNacionalidade = async function (id) {

    try {
        
        let sql = `select * from tbl_nacionalidade where id=${id}`

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

const deleteNacionalidade = async function (id) {

    try {
        let sql = `delete from tbl_nacionalidade where id=${id}`

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
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}