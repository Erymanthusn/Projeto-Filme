/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de relação entre Diretor e nacionalidade
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

// Função para inserir um novo Diretor nacionalidade no banco de dados
const insertDiretorNacionalidade = async function (diretorNacionalidade) {


    try {

        let sql = `insert into tbl_diretor_nacionalidade(
            id_diretor,
            id_nacionalidade
        ) values (
            '${diretorNacionalidade.id_diretor}',
            '${diretorNacionalidade.id_nacionalidade}'
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

const updateDiretorNacionalidade = async function (diretorNacionalidade) {
    
    try {
        let sql = `update tbl_diretor_nacionalidade set
                    id_diretor =  '${diretorNacionalidade.id_diretor}',
                    id_nacionalidade = '${diretorNacionalidade.id_nacionalidade}'
            where id = ${diretorNacionalidade.id};`

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

const selectAllDiretorNacionalidade = async function () {

    try {
        let sql = `select * from tbl_diretor_nacionalidade order by id desc`

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

const selectByIdDiretorNacionalidade = async function (id) {

    try {
        
        let sql = `select * from tbl_diretor_nacionalidade where id=${id}`

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

const deleteDiretorNacionalidade = async function (id) {

    try {
        let sql = `delete from tbl_diretor_nacionalidade where id=${id}`

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
//Função para excluir os nacionalidades relacionados com um diretor
//Obs: Esta função será utilizada no PUT do diretor
const deleteNacionalidadesByIDDiretor = async function (idDiretor) {

    try {
        let sql = `delete from tbl_diretor_nacionalidade where id_diretor=${idDiretor}`

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
//Função para retornar os dados do nacionalidade filtrando pelo ID do Diretor
const selectNacionalidadesByIDDiretor = async function (idDiretor) {

    try {
        
        let sql = ` select tbl_nacionalidade.*
                    from tbl_diretor 
                        inner join tbl_diretor_nacionalidade
                            on tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade

                    where tbl_diretor.id=${idDiretor}`

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

//Função para retornar os dados do nacionalidade filtrando pelo ID do Diretor
const selectDiretoresByIDNacionalidade = async function (idNacionalidade) {

    try {
        
        let sql = ` select tbl_diretor.*
                    from tbl_diretor 
                        inner join tbl_diretor_nacionalidade
                            on tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
                            
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
    insertDiretorNacionalidade,
    updateDiretorNacionalidade,
    selectAllDiretorNacionalidade,
    selectByIdDiretorNacionalidade,
    deleteDiretorNacionalidade,
    selectNacionalidadesByIDDiretor,
    selectDiretoresByIDNacionalidade,
    deleteNacionalidadesByIDDiretor
}