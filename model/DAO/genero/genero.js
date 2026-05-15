/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela genero
 *      Filme
 * Data: 2026-05-13
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

// Função para inserir um novo genero no banco de dados
const insertGenero = async function (genero) {


    try {

        //let sql = 'Call insertGenero(genero)'
        let sql = `insert into tbl_genero(
            nome
        ) values (
            '${genero.nome}'
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

const updateGenero = async function (genero) {
    
    try {
        let sql = `update tbl_genero set
            nome = '${genero.nome}'
            where id = ${genero.id};`

    let result = await knexConection.raw(sql)
    if(result)
        return true
    
    else
        return false


    } catch (error) {
        return false
    }
}

const selectAllGenero = async function () {

    try {
        let sql = 'select * from tbl_genero order by id desc'

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

const selectByIdGenero = async function (id) {

    try {
        
        let sql = `select * from tbl_genero where id=${id}`

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

const deleteGenero = async function (id) {

    try {
        let sql = `delete from tbl_genero where id=${id}`

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
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}

