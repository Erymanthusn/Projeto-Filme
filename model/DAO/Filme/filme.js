/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela 
 *      Filme
 * Data: 2026-04-17
 * Autor: Kaique Carvalho Costa
 * Versão: 1.0
 * 
 *******************************************************************************************************/

//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configuração para conexão com o banco de dados MySQL
const knexDatabaseConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o banco de dados MySQL
const knexConection = knex(knexDatabaseConfig.development)


//Função para inserir dados na tabela de filmes
const insertFilme = async function(filme) {
    try {
        
    

    let sql = `insert into tbl_filme (
                    nome, 
                    data_lancamento, 
                    duracao, 
                    sinopse, 
                    avaliacao, 
                    valor, 
                    capa
                    )
	        values(
                    '${filme.nome}', 
		            '${filme.data_lancamento}', 
                    '${filme.duracao}',
                    '${filme.sinopse}',
                    if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                    '${filme.valor}',
                    '${filme.capa}');`

                   

    //Executar o ScriptSQL no Banco de Dados
    let result = await knexConection.raw(sql)

    if(result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
    
}

//Função para atualizar um filme existente na tabela
const updateFilme = async function(filme) {
    
}

//Função para retornar todos os dados da tabela de filme
const selectAllFilme = async function() {
    try {

        //Script SQL para listar todos os filmes
        let sql = 'select * from tbl_filme order by id desc'

        //Executa no BD o script e guarda o retorno do BD,
        //Pode ser um ERRO (false) ou um Array com os dados
        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do BD é um Array ou Boolean (false)
        if(Array.isArray(result)){
            console.log(result[0])
            return result[0] //Retorna somente o indice com a lista de filmes
        }else{
            return false
        }

     
    } catch (error) {
        return false
    }
}

//Funçaõ para retornar os dados do filme fitrando pelo ID
const selectByIdFilme = async function(id) {
    try {
        let sql = `select * from tbl_filme where id=${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para excluir um filme pelo ID
const deleteFilme = async function(id) {
    
}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}