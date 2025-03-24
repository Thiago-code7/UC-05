
const express = require('express')
const EquipamentoController = require('../controllers/equipamentoEmprestimocontrollers')

const router = express.Router()
router.post("/equipamento", EquipamentoController.criar)
router.get("/equipamento", EquipamentoController.listarTodos)
router.put("/equipamento/:id", EquipamentoController.editar)
router.get("/equipamento/:id", EquipamentoController.listarPorId)
router.delete("/equipamento/:id", EquipamentoController.excluirPorId)
router.delete("/equipamento", EquipamentoController.excluirTodos)

module.exports = router;