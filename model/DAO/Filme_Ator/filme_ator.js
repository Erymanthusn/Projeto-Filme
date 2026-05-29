/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de relação entre filme e genero
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

// Função para inserir um novo filme genero no banco de dados
const insertFilmeGenero = async function (filmeGenero) {


    try {

        let sql = `insert into tbl_filme_genero(
            id_filme,
            id_genero
        ) values (
            '${filmeGenero.id_filme}',
            '${filmeGenero.id_genero}'
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

const updateFilmeGenero = async function (filmeGenero) {
    
    try {
        let sql = `update tbl_filme_genero set
                    id_filme =  '${filmeGenero.id_filme}',
                    id_genero = '${filmeGenero.id_genero}'
            where id = ${filmeGenero.id};`

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

const selectAllFilmeGenero = async function () {

    try {
        let sql = `select * from tbl_filme_genero order by id desc`

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

const selectByIdFilmeGenero = async function (id) {

    try {
        
        let sql = `select * from tbl_filme_genero where id=${id}`

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

const deleteFilmeGenero = async function (id) {

    try {
        let sql = `delete from tbl_filme_genero where id=${id}`

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
//Função para excluir os generos relacionados com um Filme
//Obs: Esta função será utilizada no PUT do Filme
const deleteGenerosByIDFilme = async function (idFilme) {

    try {
        let sql = `delete from tbl_filme_genero where id_filme=${idFilme}`

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
//Função para retornar os dados do Genero filtrando pelo ID do filme
const selectGenerosByIDFilme = async function (idFilme) {

    try {
        
        let sql = ` select tbl_genero.*
                    from tbl_filme 
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero

                    where tbl_filme.id=${idFilme}`

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

//Função para retornar os dados do Genero filtrando pelo ID do filme
const selectFilmesByIDGenero = async function (idGenero) {

    try {
        
        let sql = ` select tbl_filme.*
                    from tbl_filme 
                        inner join tbl_filme_ator
                            on tbl_filme.id = tbl_filme_ator.id_ator
                        inner join tbl_ator
                            on tbl_ator.id = tbl_filme_ator.id_ator
                            
                    where tbl_genero.id=${idGenero}`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectGenerosByIDFilme,
    selectFilmesByIDGenero,
    deleteGenerosByIDFilme
}