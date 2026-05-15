/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela sexo
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

// Função para inserir um novo sexo no banco de dados
const insertSexo = async function (sexo) {


    try {

        let sql = `insert into tbl_sexo(
            sigla
        ) values (
            '${sexo.sigla}'
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

const updateSexo = async function (sexo) {
    
    try {
        let sql = `update tbl_sexo set
            sigla = '${sexo.sigla}'
            where id = ${sexo.id};`

    let result = await knexConection.raw(sql)
    if(result)
        return true
    
    else
        return false


    } catch (error) {
        return false
    }
}

const selectAllSexo = async function () {

    try {
        let sql = 'select * from tbl_sexo order by id desc'

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

const selectByIdSexo = async function (id) {

    try {
        
        let sql = `select * from tbl_sexo where id=${id}`

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

const deleteSexo = async function (id) {

    try {
        let sql = `delete from tbl_sexo where id=${id}`

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
    insertSexo,
    updateSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteSexo
}