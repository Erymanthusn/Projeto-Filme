/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela classificacao
 *      Filme
 * Data: 2026-05-15
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

//Função para inserir uma nova classificacao no banco de dados
const insertClassificacao = async function (classificacao) {


    try {

        //let sql = 'Call insertClassificacao(classificacao)'
        let sql = `insert into tbl_classificacao(
            descricao
        ) values (
            '${classificacao.descricao}'
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

const updateClassificacao = async function (classificacao) {
    
    try {
        let sql = `update tbl_classificacao set
            descricao = '${classificacao.descricao}'
            where id = ${classificacao.id};`

    let result = await knexConection.raw(sql)
    if(result)
        return true
    
    else
        return false


    } catch (error) {
        return false
    }
}

const selectAllClassificacao = async function () {

    try {
        let sql = 'select * from tbl_classificacao order by id desc'

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

const selectByIdClassificacao = async function (id) {

    try {
        
        let sql = `select * from tbl_classificacao where id=${id}`

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

const deleteClassificacao = async function (id) {

    try {
        let sql = `delete from tbl_classificacao where id=${id}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]

        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
    
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}