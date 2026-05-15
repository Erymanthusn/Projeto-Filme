/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela 
 *      Filme
 * Data: 2026-04-17
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

// Função para inserir um novo filme no banco de dados
const insertFilme = async function (filme) {


    try {

        //let sql = 'Call insertFilme(filme)'
        let sql = `insert into tbl_filme(
            nome,
            sinopse,
            capa,
            data_lancamento,
            duracao,
            valor,
            avaliacao
        ) values (
            '${filme.nome}',
            '${filme.sinopse}',
            '${filme.capa}',
            '${filme.data_lancamento}',
            '${filme.duracao}',
            '${filme.valor}',
            if('${filme.avaliacao}' = '', null, '${filme.avaliacao}')
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

//Função para atualizar um filme exitente no banco de dados
const updateFilme = async function (filme) {
    try {
        let sql = `update tbl_filme set
                        nome            = '${filme.nome}',
                        sinopse         = '${filme.sinopse}',
                        capa            = '${filme.capa}',
                        data_lancamento = '${filme.data_lancamento}',
                        duracao         = '${filme.duracao}',
                        valor           = '${filme.valor}',
                        avaliacao       = if('${filme.avaliacao}' = '', null, '${filme.avaliacao}')
                    where id            = ${filme.id};`

let result = await knexConection.raw(sql)
if(result)
    return true

else
    return false


} catch (error) {
    return false
}
}

//Função para retonar todos os dados de filmes do banco de dados
const selectAllFilme = async function () {

    try {

        //Script sql para listar todos os filmes
        let sql = ' select * from tbl_filme order by id desc'

        //Executa no banco de dados o Script e aguarda o restorno do banco, pode ser um erro (false) ou um array com os dados
        let result = await knexConection.raw(sql)

        // Validação para verificar se o retorno do banco de daos é um array ou um boolean (false)
        if (Array.isArray(result)) {

            return result[0]//Retorna somente o indice com lista de filmes

        } else {

            return false
        }

    } catch (error) {
        return false
    }

}

//Função para retonar um filme pelo id
const selectByIdFilme = async function (id) {

    try {

        let sql = `select * from tbl_filme where id =${id}`

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

//Função para excluir um filme filtrando pelo id
const deleteFilme = async function (id) {

    try {
        let sql = `delete from tbl_filme where id=${id}`

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
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}