const EntregaModel = require("../../entrega/models/model");

class EntregaController {
  static async listarEntregas(req, res) {
    try {
      const entregas = await EntregaModel.findAll();
      if (entregas.length === 0) {
        return res.status(200).json({ msg: "Não há entregas a serem exibidas!" });
      }
      res.status(200).json(entregas);
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }

}

module.exports = EntregaController