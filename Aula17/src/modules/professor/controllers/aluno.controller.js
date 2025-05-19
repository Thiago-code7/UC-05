const AlunoModel = require("../../aluno/models/aluno.model");

class AlunoController {
  static async listarAlunosTurma(req, res) {
    try {
      const alunos = await AlunoModel.findAll();
      if (alunos.length === 0) {
        return res.status(200).json({ msg: "Não há alunos a serem exibidos!" });
      }
      res.status(200).json(alunos);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }

  static async listarAlunoPorMatricula(req, res) {
    try {
      const matricula = req.params.matricula;
      const aluno = await AlunoModel.findByPk(matricula);
      if (!aluno) {
        return res.status(404).json({ msg: "Aluno não encontrado!" });
      }
      res.status(200).json(aluno);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }     
}

module.exports = AlunoController