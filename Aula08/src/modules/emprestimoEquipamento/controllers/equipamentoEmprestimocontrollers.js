const EquipamentoModel = require('../models/equipamentoEmprestimoModels');

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
    static async editar(requisicao, resposta){
      try {
        const id = requisicao.params.id
        const {nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status} = requisicao.body
        if(!nomeFuncionario || !nomeEquipamento || !dataRetirada || !dataDevolucao || !status){
          return resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos"})
        }
        const equipamento = await EquipamentoModel.editar(id, nomeFuncionario, nomeEquipamento, dataRetirada, dataDevolucao, status)
        if(equipamento.length === 0){
          return resposta.status(400).json({mensagem: "Equipamento não encontrado"})
        }
        resposta.status(200).json({mensagem: "Equipamento editado com sucesso",equipamento: equipamento})
      } catch (error) {
        resposta.status(500).json({mensagem: "Erro ao editar equipamento", erro: error.message});
        
      }
  
    }

  
  static async listarTodos(requisicao, resposta){
      try {
          const equipamentos = await EquipamentoModel.listar()
          if(equipamentos.length === 0){
              return resposta.status(400).json({mensagem: "Não existe equipamentos a serem exibidos"});  
          }
          resposta.status(200).json(equipamentos)
      } catch (error) {
          resposta.status(500).json({mensagem: "Erro ao listar os Equipamentos", erro: error.message});
          
      }
  }

  static async listarPorId(requisicao, resposta){
    try {
     const id = requisicao.params.id
     const equipamento = await EquipamentoModel.listarPorId(id)
     if(equipamento.length === 0){
         return resposta.status(400).json({mensagem: "Equipamento nao encontrado"});
     }
     resposta.status(200).json(equipamento);
    } catch (error) {
      return  resposta.status(500).json({mensagem: "Erro ao buscar Equipamento pelo id"})
    }
 } 

 static async excluirTodos(requisicao, resposta){
  try {
    
    await EquipamentoModel.excluirTodos()
    resposta.status(200).json({mensagem: "Todos os equipamentos excluidos com sucesso"})
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao excluir todos Equipamentos"})
  }
}

static async excluirPorId(requisicao, resposta){
  try {
    const id = requisicao.params.id
    const equipamento = await EquipamentoModel.listarPorId(id)
    if(equipamento.lenght === 0) {
      return resposta.status(400).json({mensagem:"Equipamento não encontrado"})
    }
    await EquipamentoModel.excluirPorId(id)
    resposta.status(200).json({msg:"Equipamento deletado com sucesso!"});

  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao exluir equipamento", erro: error.message})
  }
}

}

module.exports = EquipamentoController;


