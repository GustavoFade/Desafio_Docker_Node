const express = require('express')
const app = express()
const port = 3000
const sequelize = require('./database')

app.get('/', (req, res) => {
  insertNameDatabase()
  res.writeHead(200, {"Content-type":"text/plain"})
  return res.end("<h1>Full Cycle Rocks!</h1>")
})

sequelize.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));
function insertNameDatabase(){
  const nome = "João da Silva"
  const sql = `INSERT INTO people (nome) VALUES ("${nome}");`
  sequelize.query(sql, {
    type: sequelize.QueryTypes.INSERT
  })
}

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})