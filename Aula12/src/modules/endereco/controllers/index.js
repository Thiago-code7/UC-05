const EnderecoModel = require('../models/index')

class EnderecoController{

    static async criarEndereco(requisicao, resposta){
        try {
            const{matricula, cep, numero, ponto_referencia} = requisicao.body
            if(!matricula || !cep || !numero){
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser preenchidos'})
            }
            const endereco = await EnderecoModel.criarEndereco(matricula, cep, numero, ponto_referencia)
            resposta.status(201).json({endereco: 'Endereco criado com sucesso!', endereco: endereco})
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
         
    static async editarEnderecoAluno(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula 
            const{ cep, numero, ponto_referencia} = requisicao.body
            if( !cep || !numero){
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser preenchidos'})
            } 
            const endereco = await EnderecoModel.editarEnderecoAluno(matricula, cep, numero, ponto_referencia)
            resposta.status(200).json({mensagm: 'Endereco atualizado com sucesso!', endereco: endereco})
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao editar Endereco do Aluno", erro: error.message});
        }
    }
        // http:localhost:3000/endereco/cep/5900000
    static async listarEnderecoCEP(requisicao, resposta){
        try {
            const cep = requisicao.params.cep
            const endereco = await EnderecoModel.listarEnderecoCEP(cep)
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'cep nao existe ou invalido'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. por favor tente mais tarde.', erro: error.message}); 
        }
    }

    static async listarEnderecoCidade(requisicao, resposta){
        try {
            const cidade = requisicao.params.cidade
            const endereco = await EnderecoModel.listarEnderecoCidade(cidade)
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'Cidade não existe ou invalido'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. por favor tente mais tarde.', erro: error.message});
        }
    }

    static async listarEnderecos(requisicao, resposta){
        try {
            const enderecos = await EnderecoModel.listarEnderecos()
            if(enderecos.length === 0){
                return resposta.status(404).json({mensagem: 'Nao ha registros a serem exibidos'})
            }
            resposta.status(200).json(enderecos)

        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. por favor tente mais tarde.', erro: error.message});
        }
    }
    
        static async listarEnderecoAluno(requisicao, resposta){
          try {
            const matricula = requisicao.params.matricula
            const endereco = await EnderecoModel.listarEndereco(matricula)
            if(enderecos.length === 0){
                return resposta.status(404).json({mensagem: 'Nao ha registros a serem exibidos'})
            }
            resposta.status(200).json(endereco)
          } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. por favor tente mais tarde.', erro: error.message});
          }
        }

}

module.exports = EnderecoController;