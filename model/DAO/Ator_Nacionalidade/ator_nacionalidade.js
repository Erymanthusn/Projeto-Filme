/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de relação entre Ator e nacionalidade
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

// Função para inserir um novo Ator nacionalidade no banco de dados
const insertAtorNacionalidade = async function (atorNacionalidade) {


    try {

        let sql = `insert into tbl_ator_nacionalidade(
            id_ator,
            id_nacionalidade
        ) values (
            '${atorNacionalidade.id_ator}',
            '${atorNacionalidade.id_nacionalidade}'
        );`
    

        //Encaminha para o banco de dados o scriptSQL
        let result = await knexConection.raw(sql)

        if (result) {

            return result[0].insertId // Retorna o id gerado no insert

        } else {
            console.log(error)
            return false

        }

    } catch (error) {
        console.log(error)
        return false

    }

}

const updateAtorNacionalidade = async function (atorNacionalidade) {
    
    try {
        let sql = `update tbl_ator_nacionalidade set
                    id_ator =  '${atorNacionalidade.id_ator}',
                    id_nacionalidade = '${atorNacionalidade.id_nacionalidade}'
            where id = ${atorNacionalidade.id};`

    let result = await knexConection.raw(sql)
    if(result)
        return true
    
    else
        return false


    } catch (error) {
        console.log(error)
        return false
    }
}

const selectAllAtorNacionalidade = async function () {

    try {
        let sql = `select * from tbl_ator_nacionalidade order by id desc`

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

const selectByIdAtorNacionalidade = async function (id) {

    try {
        
        let sql = `select * from tbl_ator_nacionalidade where id=${id}`

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

const deleteAtorNacionalidade = async function (id) {

    try {
        let sql = `delete from tbl_ator_nacionalidade where id=${id}`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
    
}
//Função para excluir os nacionalidades relacionados com um ator
//Obs: Esta função será utilizada no PUT do ator
const deleteNacionalidadesByIDAtor = async function (idAtor) {

    try {
        let sql = `delete from tbl_ator_nacionalidade where id_ator=${idAtor}`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
//Função para retornar os dados do nacionalidade filtrando pelo ID do ator
const selectNacionalidadesByIDAtor = async function (idAtor) {

    try {
        
        let sql = ` select tbl_nacionalidade.*
                    from tbl_ator 
                        inner join tbl_ator_nacionalidade
                            on tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade

                    where tbl_ator.id=${idAtor}`

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

//Função para retornar os dados do nacionalidade filtrando pelo ID do ator
const selectAtoresByIDNacionalidade = async function (idNacionalidade) {

    try {
        
        let sql = ` select tbl_ator.*
                    from tbl_ator 
                        inner join tbl_ator_nacionalidade
                            on tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
                            
                    where tbl_nacionalidade.id=${idNacionalidade}`

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
    insertAtorNacionalidade,
    updateAtorNacionalidade,
    selectAllAtorNacionalidade,
    selectByIdAtorNacionalidade,
    deleteAtorNacionalidade,
    selectNacionalidadesByIDAtor,
    selectAtoresByIDNacionalidade,
    deleteNacionalidadesByIDAtor
}