// Importando com (ESM)
const express = require('express');
const dotenv = require('dotenv');
const equipamentoRoutes = require('./src/modules/emprestimoEquipamento/routes/equipamentoEmprestimoRoutes')

dotenv.config();

const port = process.env.PORTA;
const app = express();

//aplicacao use express como json(javascript object notation)
app.use(express.json());

app.use(equipamentoRoutes)




app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
