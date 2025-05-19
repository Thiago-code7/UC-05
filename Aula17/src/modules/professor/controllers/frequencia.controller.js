const FrequenciaModel = require("../../frequencia/models/model");

class FrequenciaController {
    static async criarFrequencia(req, res) {
        try{
            const {id, aluno_matricula, cod_turma, data, presenca} = req.body;
            if (!id || !aluno_matricula || !cod_turma || !data || !presenca) {
                return res.status(400).json({ msg: "Todos os campos devem serem preenchidos!" });
            }
            const atividade = await FrequenciaModel.create({
                id, 
                aluno_matricula, 
                cod_turma, 
                data, 
                presenca
            });
            res.status(201).json({msg: "Frequencia lançada com sucesso!", erro: error.message});
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
        }
    }
     static async listarFrequenciaTurma(req, res) {
        try {
          const frequencias = await FrequenciaModel.findAll();
          if (frequencias.length === 0) {
            return res.status(200).json({ msg: "Não há frequencias a serem exibidas!" });
          }
          res.status(200).json(frequencias);
        } catch (error) {
          res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
        }
      }
      static async listarFrequenciaPorMatricula(req, res) {
          try {
            const matricula = req.params.matricula;
            const frequencia = await FrequenciaModel.findByPk(matricula);
            if (!frequencia) {
              return res.status(404).json({ msg: "Frequencia do aluno não encontrada!" });
            }
            res.status(200).json(frequencia);
          } catch (error) {
            res
              .status(500)
              .json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
          }
        } 
}

module.exports = FrequenciaController