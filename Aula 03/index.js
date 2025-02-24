// Importando com (ESM)
const express = require('express');
const { pool } = require('./src/config/database');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

//aplicacao use express como json(javascript object notation)
app.use(express.json());



app.get('/produtos', async (requisicao, resposta) => {
  //tratamento de excessoes
  try {
    const consulta = 'select * from produto'
    const produtos = await pool.query(consulta)
    if (produtos.rows.length === 0) {
      return resposta.status(200).json({ mensagem: "banco de dados vazio" })
    }

    resposta.status(200).json(produtos.rows);

  } catch (error) {
    resposta.status(500).json({ mensagem: "erro ao buscar produtos", erro: erro.message })

  }
});

app.post('/produtos', async (requisicao, resposta) => {
  try {
    const {  nome, preco, quantidade } = requisicao.body;
    if ( !nome || !preco || !quantidade) {
      return resposta.status(200).json(
        {
          mensagem: "Todos os dados devem ser preenchidos corretamente"
        }
      )
    }
    const novoProduto = [ nome, preco, quantidade ];
    const consulta = `insert into produto'(nome, preco, quantidade)
                       values ($1, $2, $3) returning *`
    await pool.query(consulta, novoProduto)
    resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) { }
});

app.put("/produto/:id", async(requisicao, resposta) => {
  try {
    //localhost:3000/produtos/1
    const id = requisicao.params.id;
    const { novoNome, novoPreco, novaQuantidade } = requisicao.body
    if (!id) {
      return resposta.status(404).json({
        mensagem: "informe um parametro!"
      })
    }
    const parametro = [id]
    const consulta1 = `select *from produto where id = $1`
    const resultado1 = await pool.query(consulta, parametro)

    if (resultado.rows.length === 0) {
      return resposta.status(404).json({mensagem:"Produto nao encontrado"})
    }
    const dados = [id, novoNome, novoPreco, novaQuantidade]
    const consulta2 = `update produto set nome = $2, preco = $3, quantidade = $4 where id = $1 returning * `
    await pool.query(consulta2, dados)
    resposta.status(200).json({ mensagem: "Produto atualizado com sucesso" })
  } catch (error) {

  }
})

app.delete("/produtos/:id", async (requisicao, resposta) => {
 try {
  const id = requisicao.params.id
  const parametro = [id]
  const consulta1 = `select *from produto where id = $1`
  const resultado1 = await pool.query(consulta1, parametro)
  if(resultado.rows.length === 0){
    return resposta.status(404).json({mensagem:"produto nao encontrado"})
  }
  bancoDados.splice(index, 1)
  resposta.status(200).json({mensagem:"produto deletado com sucesso"})
 } catch (error) {
  resposta.status(500).json({
    mensagem: "erro ao deletar produtos",
    erro: error.message})
  
 }
})

app.get("/produtos/:id", (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const produto = bancoDados.find(elemento => elemento.id === id);
    if(!produto){
      return resposta.status(404).json({mensagem:"produto nao encontrado"})
    }
    resposta.status(200).json(produto)
  } catch (error) {
    resposta.status(500).json({
      mensagem: "erro a buscar produto",
      erro: error.message
    })
    
  }
})

app.delete("/produtos", (requisicao, resposta) => {
try {
  bancoDados.length = 0;
  resposta.status(200).json({mensagem:"todos os produtos deletados com sucesso"})
} catch (error) {
  
}
})
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
