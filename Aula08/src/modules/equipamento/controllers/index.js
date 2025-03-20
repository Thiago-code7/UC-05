const EquipamentoModel = require('../models/index');

class EquipamentoController{
    static async criar(requisicao, resposta){
      try {
        const { nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status} = requisicao.body
        if(!nomeFuncionario || ! nomeEquipamento || !dataRetirada || !dataDevolucao || !status){
          return  resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos."}); 
        }
        const novoEquipamento = await EquipamentoModel.criar( nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status)
        resposta.status(201).json({mensagem: "Equipamento criado com sucesso",equipamento: novoEquipamento})
      } catch (error) {
        resposta.status(500).json({mensagem: "Erro ao criar o Equipamento",erro: error.message});
      }
    }
}


static async editar(requisicao, resposta){
    try {
      const id = requisicao.params.matricula
      const {nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status} = requisicao.body
      if(!nome || !email || !senha){
        return resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos"})
      }
      const aluno = await AlunoModel.editar(matricula, nome, email, senha)
      if(aluno.length === 0){
        return resposta.status(400).json({mensagem: "Aluno não encontrado"})
      }
      resposta.status(200).json({mensagem: "Aluno editado com sucesso",aluno: aluno})
    } catch (error) {
      resposta.status(500).json({mensagem: "Erro ao editar aluno", erro: error.message});
      
    }

  }