
const AlunoModel = require('../../aluno/models/aluno.model')


class SecretarioController{
    static async criarAluno(req, res){
        try {
            const { matricula, nome, email, senha, turma_cod } = req.body;
            if(!matricula || !nome || !email || !senha || !turma_cod){
                return res.status(400).json({msg: 'Todos os campos devem serem preenchidos!'})
            }
            const aluno = await AlunoModel.create({matricula, nome, email, senha, turma_cod})
            res.status(201).json(aluno)
        } catch (error) {
            res.status(500).json({msg: 'Erro interno do servidor. Por favor, tente mais tarde'})
        }
    }
    static async listarAlunos(req, res){
        try {
            const alunos = await AlunoModel.findAll()
            if(alunos.length === 0){
                return res.status(200).json({msg: 'Não há alunos a serem exibidos!'})
            }
            res.status(200).json(alunos)
        } catch (error) {
            res.status(500).json({msg: 'Erro interno do servidor. Por favor, tente mais tarde'})
        }
    }
    static async listarAlunoPorMatricula(req, res){
        try {
            const matricula = req.params.matricula
            const aluno = await AlunoModel.findByPk({matricula})
            if(!aluno){
                return res.status(404).json({msg: 'Aluno nao encontrado!'})
            }
            res.status(200).json(aluno)
 
        } catch (error) {
            res.status(500).json({msg: 'Erro interno do servidor. Por favor, tente mais tarde'}) 
        }
    }
    static async editarAluno(req, res){
        try {
            const matricula = req.params.matricula
            const { nome, senha, turma_cod } = req.body
            if( !nome || !senha || !turma_cod){
                return res.status(400).json({msg: 'Os campos nome, senha e codigo da turma devem serem preenchidos!'})
            }
            const alunoAtualizado = await AlunoModel.update(
                {nome: nome, senha: senha, turma_cod: turma_cod},
                {
                    where: {
                    matricula: matricula
                }
            })
            if(alunoAtualizado.length === 0){
                return res.status(404).json({msg: 'Aluno não encontrado!'})
            }
            res.status(200).json(alunoAtualizado)
        } catch (error) {
            res.status(500).json({msg: 'Erro interno do servidor. Por favor, tente mais tarde'})
        }
    }
    static async deletarAlunoPorMatricula(req, res){
        try {
            const matricula = req.params.matricula
            const aluno = await AlunoModel.findByPk({matricula})
            if(!aluno){
                return res.status(404).json({msg: 'Aluno não encontrado!'})
            }
            await AlunoModel.destroy({
                where:{
                    matricula: matricula
                }
            })
            res.status(200).json({msg: 'Aluno excluido com sucesso!'})

        } catch (error) {
            res.status(500).json({msg: 'Erro interno do servidor. Por favor, tente mais tarde'})
        }
    }

    static async deletarTodosAlunos(req, res){
        try {
          await AlunoModel.destroy(
            {where: {}}
          )
          res.status(200).json({ msg: "Alunos excluidos com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
          
        }
      }
}
module.exports = AlunoController