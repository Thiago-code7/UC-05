// Importando com (ESM)
const express = require('express');
const dotenv = require('dotenv');
const ProfessorRoutes = require('./src/modules/professor/routes/route')
const EntregaRoutes = require('./src/modules/entrega/routes/route');
const { pool } = require('./src/config/database');

dotenv.config();

const port = process.env.PORTA;
const app = express();

//Aplicação use express como json(javascript object notation)
app.use(express.json());
  
app.use("/", ProfessorRoutes);
app.use("/", EntregaRoutes);


app.listen(port, async () => {
  try {
    await pool.authenticate();
    console.log('Connection has been established successfully.');
    await pool.sync({ force: true, alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Servidor rodando em http://localhost:${port}`);
});