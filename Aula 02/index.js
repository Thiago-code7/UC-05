// Importando com (ESM)
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

//aplicacao use express como json(javascript object notation)
app.use(express.json());

const bancoDados = [];

app.get('/produtos', (requisicao, resposta) => {
  //tratamento de excessoes
  try {
    if (bancoDados.length === 0) {
      return resposta.status(200).json({ mensagem: "banco de dados vazio" })
    }
    resposta.status(200).json(bancoDados);

  } catch (error) {
    resposta.status(500).json({ mensagem: "erro ao buscar produtos", erro: erro.message })

  }
  resposta.json(bancoDados);
});

app.post('/produtos', (requisicao, resposta) => {
  try {
    const { id, nome, preco } = requisicao.body;
    if (!id || !nome || !preco) {
      return resposta.status(200).json(
        {
          mensagem: "Todos os dados devem ser preenchidos corretamente"
        }
      )
    }
    const novoProduto = { id, nome, preco };
    bancoDados.push(novoProduto);
    resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) { }
});

app.put("/produto/:id", (requisicao, resposta) => {
  try {
    //localhost:3000/produtos/1
    const id = requisicao.params.id;
    const { novoNome, novoPreco } = requisicao.body
    if (!id) {
      return resposta.status(404).json({
        mensagem: "informe um parametro!"
      })
    }
    const produto = bancoDados.find(elemento => elemento.id === id)
    if (!produto) {
      return resposta.status(404).json({mensagem:"Produto nao encontrado"})
    }
    produto.nome = novoNome || produto.nome
    produto.preco = novoPreco || produto.preco
    resposta.status(200).json({ mensagem: "Produto atualizado com sucesso" })
  } catch (error) {

  }
})

app.delete("/produtos/:id", (requisicao, resposta) => {
 try {
  const id = requisicao.params.id
  const produto = bancoDados.findIndex(elemento => elemento.id === id)
  if(produto === -1){
    return resposta.status(404).json({mensagem:"produto nao encontrado"})
  }
  bancoDados.splice(index, 1)
  resposta.status(200).json({mensagem:"produto deletado com sucesso"})
 } catch (error) {
  resposta.status(500).json({
    mensagem: "erro ao cadastrar produtos",
    erro: error.message,})
  
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
