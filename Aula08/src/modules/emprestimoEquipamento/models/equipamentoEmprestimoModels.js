const  { pool }  = require('../../../config/database')

class EquipamentoModel {
    static async criar(nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status){
           const dados = [nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status]
           const consulta = `insert into equipamento(nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status) values ($1, $2, $3, $4, $5) returning*`
           const novoEquipamento = await pool.query(consulta, dados)
           return novoEquipamento.rows
    }
    static async editar(id, nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status){
         const dados = [id,nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status]
         const consulta = `update equipamento set nomeFuncionario = $2, nomeEquipamento = $3, dataRetirada = $4, dataDevolucao = $5, status = $6 where id = $1 returning*`;
         const equipamentoAtualizado = await pool.query(consulta, dados)
         return equipamentoAtualizado.rows
    }
    static async listar(){
       const consulta = `select * from equipamento`
       const equipamentos = await pool.query(consulta)
       return equipamentos.rows
    }
    static async listarPorId(id){
       const dados =[id]
       const consulta = `select * from equipamento where id = $1`
       const equipamento = await pool.query(consulta,dados)
       return equipamento.rows

    }

    static async excluirPorId(id){
        const dados = [id]
        const consulta = `delete from equipamento where id = $1`
        await pool.query(consulta,dados)

    }
    static async excluirTodos(){
       const consulta = `delete from equipamento `
       await pool.query(consulta)

    }

}

module.exports = EquipamentoModel;