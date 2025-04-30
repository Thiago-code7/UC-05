const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/aluno.controller');

// Listar alunos - http://localhost:3000/secretario/listar-alunos
router.get('/secretario/listar-alunos',AlunoController.listarAlunos)

//listar aluno por matricula- http://localhost:3000/secretario/criar-aluno
router.get('/secretario/listar-aluno/:matricula', AlunoController.listarAlunoPorMatricula)

//criar aluno - http://localhost:3000/secretario/criar-aluno
router.post('/secretario/criar-aluno', AlunoController.criarAluno)

//Editar aluno - http://localhost:3000/secretario/editar-aluno
router.put('/secretario/editar-aluno', AlunoController.editarAluno)

//deletar aluno por matricula - http://localhost:3000/secretario/deletar-aluno/:matricula
router.delete('/secretario/deletar-aluno/:matricula', AlunoController.deletarAlunoPorMatricula)

//deletar alunos - http://localhost:3000/secretario/deletar-alunos
router.delete('/secretario/deletar-alunos', AlunoController.deletarTodosAlunos)