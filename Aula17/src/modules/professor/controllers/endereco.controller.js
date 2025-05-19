const EnderecoModel = require("../../endereco/models/model");
const axios = require('axios');

class EnderecoController {
    static async criarEndereco(req, res) {
        try {
            const { id, cep, numero, complemento, ponto_referencia, usuario_id } = req.body;
            const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            const {logradouro, bairro, localidade, uf} = resposta.data
            if (!id || !cep || !numero || !usuario_id ) {
                return res.status(400).json({ msg: "Os campos id, cep, número e usuario_id devem serem preenchidos!" });
            }
            const endereco = await EnderecoModel.create({
                id, 
                cep, 
                numero,
                complemento,
                ponto_referencia, 
                usuario_id,
                logradouro,
                bairro,
                localidade,
                uf
            });
            res.status(201).json({ msg: "Endereço cadastrado com sucesso!", erro: error.message });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
        }
    }

}

module.exports = EnderecoController