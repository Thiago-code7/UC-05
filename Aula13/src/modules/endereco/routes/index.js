const express = require('express')
const EnderecoController = require('../controllers/index')

const router = express.Router()

// http:

// Buscar todos enderecos http://localhost:3000/endereco
router.get('/endereco', EnderecoController.listarEnderecos)
//Buscar endereco pelo CEP htt
router.get('/endereco/cep/:cep', EnderecoController.listarEnderecoCEP)
// Buscar endereco pela cidade
router.get('/endereco/cidade/:cidade', EnderecoController.listarEnderecoCidade)
//
router.get('/endereco/aluno/:matricula', EnderecoController.listarEnderecoAluno)

router.post('/endereco', EnderecoController.criarEndereco)

router.put('/endereco/:matricula', EnderecoController.editarEnderecoAluno)


module.exports = router;