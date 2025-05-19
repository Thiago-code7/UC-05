const TurmaModel = require("../../turma/models/model");

class TurmaController {
  static async listarTurmasProfessor(req, res) {
    try {
      const turmas = await TurmaModel.findAll();
      if (turmas.length === 0) {
        return res.status(200).json({ msg: "Não há turmas a serem exibidas!" });
      }
      res.status(200).json(turmas);
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }
   
}

module.exports = TurmaController