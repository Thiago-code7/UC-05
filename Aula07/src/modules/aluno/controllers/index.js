const AlunoModel = require('../models/index');

class AlunoController{
    static async criar(requisicao, resposta){
      try {
        const {matricula, nome, email, senha} = requisicao.body
        if(!matricula || !nome || !email || !senha){
          return  resposta.status(400).json({mensagem:"Todos os campos devem ser preenchidos."}); 
        }
        const novoAluno = await AlunoModel.criar(matricula, nome, email, senha)
        resposta.status(201).json({mensagem:"Aluno criado com sucesso",aluno: novoAluno})
      } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao criar o Aluno",erro: error.message});
      }
    }
    static async editar(requisicao, resposta){

    }
    static async listarTodos(requisicao, resposta){
        try {
            const alunos = await AlunoModel.listar()
            if(alunos.length === 0){
                return resposta.status(400).json({mensagem:"Não existe alunos a serem exibidos"});
                resposta.status(200).json(alunos)
            }
        } catch (error) {
            resposta.status(500).json({mensagem:"Erro ao listar os Alunos"});
            
        }
    }
    static async listarPorMatricula(requisicao, resposta){
       try {
        const matricula = requisicao.params.id
        const aluno = await AlunoModel.listarPorId(matricula)
        if(!aluno){
            return resposta.status(400).json({mensagem:"Aluno nao encontrado"});
        }
        resposta.status(200).json(aluno);
       } catch (error) {
        
       }
    } 
    static async excluirTodos(requisicao, resposta){

    }
    static async excluirPorMatricula(requisicao, resposta){

    }
}