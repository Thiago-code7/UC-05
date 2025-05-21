const express = require('express');
const AlunoController = require('../controllers/aluno.controller');
const AtividadeController = require('../controllers/atividade.controller');
const EnderecoController = require('../controllers/endereco.controller');
const EntregaController = require('../controllers/entrega.controller');
const FrequenciaController = require('../controllers/frequencia.controller');
const TurmaController = require('../controllers/turma.controller');

const router = express.Router();

//Aluno
router.get("/professor/listar/alunos", AlunoController.listarAlunosTurma);
router.get("/professor/listar/aluno/:matricula", AlunoController.listarAlunoPorMatricula);

//Atividade
router.post("/professor/criar/atividade", AtividadeController.criarAtividade);

//Endereço
router.post("/professor/criar/endereco", EnderecoController.criarEndereco);

//Entrega
router.get("/professor/listar/entregas", EntregaController.listarEntregas);

//Frenquencia
router.post("/professor/criar/frequencia", FrequenciaController.criarFrequencia);
router.get("/professor/listar/frequencia/turma", FrequenciaController.listarFrequenciaTurma);
router.get("/professor/listar/frequencia/:matricula", FrequenciaController.listarFrequenciaPorMatricula);

//Turma
router.get("/professor/listar/turmas", TurmaController.listarTurmasProfessor);


module.exports = router