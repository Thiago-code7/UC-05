const axios = require('axios');
const { pool } = require('../../../config/database')

class EnderecoModel{

    static async criarEndereco(matricula, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        //desestruracao do objeto;
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data

       // forma estruturada
       // const logradouro = resposta.data.logradouro
       //const complemento = resposta.data.complemento
       // const bairro = resposta.data.bairro
       // const localidade = resposta.data.localidade
        //const uf = resposta.data.uf

        //montando o array para query
        const dados = [
            matricula,
            cep,
            logradouro,
            numero,
            complemento,
            bairro, 
            localidade,
            uf,
            ponto_referencia
        ]

        const consulta = `insert into endereco(matricula, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia) values( $1, $2, $3, $4, $5, $6, $7, $8, $9) returning*`

        const resultado = await pool.query(consulta, dados)
        return resultado.rows

        
    }
    

    static async editarEnderecoAluno(matricula, cep, numero, ponto_referencia){
       const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
       const {logradouro, complemento, bairro, localidade, uf} = resposta.data
       const dados = [
        matricula,
        cep,
        logradouro,
        numero,
        complemento,
        bairro, 
        localidade,
        uf,
        ponto_referencia
       ]
       const consulta = `update endereco set cep = $2, logradouro = $3, numero = $4, complemento = $5, bairro = $6, localidade = $7, uf = $8, ponto_referencia =$9 where matricula = $1 returning*`
       const resultado = await pool.query(consulta, dados)
       return resultado.rows

    }

    static async listarEnderecos(){
        const consulta = `select * from endereco where endereco`
        const resultado = await  pool.query(consulta)
        return resultado.rows
       
    }

    static async listarEnderecoCEP(cep){
       const dados = [cep]
       const consulta = `select * from endereco where cep = $1`
       const resultado = await pool.query(consulta, dados)
       return resultado.rows
    }

    static async listarEnderecoCidade(cidade){
       const dados = [`%${cidade}%`]
       const consulta = `select * from endereco where lower(Localidade) like lower($1)`
       const resultado = await pool.query(consulta, dados)
       return resultado.rows
    } 
    static async listarEnderecoAluno(matricula){
         const dados = [matricula]
        const consulta = `select aluno.*, endereco.* from aluno join endereco on aluno.matricula = endereco.matricula where aluno.matricula =$1`
    }
    
}

module.exports = EnderecoModel;