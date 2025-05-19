const AtividadeModel = require("../../atividade/models/model");

class AtividadeController {
    static async criarAtividade(req, res) {
        try{
            const {id, titulo, descricao, tipo, data_entrega, cod_turma, professor_matricula} = req.body;
            if (!id || !titulo || !descricao || !tipo || !data_entrega || !cod_turma || !professor_matricula) {
                return res
                    .status(400)
                    .json({ msg: "Todos os campos devem serem preenchidos!" });
            }
            const atividade = await AtividadeModel.create({
                id, 
                titulo, 
                descricao, 
                tipo, 
                data_entrega, 
                cod_turma, 
                professor_matricula
            });
            res.status(201).json({msg: "Atividade criada com sucesso!", erro: error.message});
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
        }
    }
}

module.exports = AtividadeController