


const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/configDb')
//const alunoRoutes = require('./src/modules/aluno/routes/index')
//const enderecoRoutes = require('./src/modules/endereco/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

//aplicacao use express como json(javascript object notation)
//app.use(express.json());

//app.use(alunoRoutes)
//app.use(enderecoRoutes)




app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexao bem sucedida.');
  } catch (error) {
    console.error('conexao com o banco falhou', error);
  }
  console.log(`Servidor rodando em http://localhost:${port}`);
});
