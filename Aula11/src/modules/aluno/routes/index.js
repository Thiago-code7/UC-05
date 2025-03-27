
const express = require('express')
const AlunoController = require('../controllers/index')

const router = express.Router()
router.post("alunos", AlunoController.criar)
router.get("/alunos", AlunoController.listarTodos)
router.put("/aluno/:matricula", AlunoController.editar)
router.get("/aluno/:matricula", AlunoController.listarPorMatricula)
router.delete("/aluno/:matricula", AlunoController.excluirPorMatricula)
router.delete("/alunos", AlunoController.excluirTodos)

module.exports = router;