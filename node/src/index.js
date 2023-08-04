const express = require('express')
const app = express()
const port = 3000
const sequelize = require('./database')

app.get('/', async (req, res) => {
  insertNameDatabase()
  const listaHtmlPeople = await formatarRegistos()
  res.writeHead(200, {"Content-type":"text/html"})
  return res.end("<h1>Full Cycle Rocks!</h1>" + "</br>" + listaHtmlPeople)
})

sequelize.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

async function formatarRegistos() {
  const peoples = await obterTodosRegistrosPeople()
  let lista = "<ul>"
  peoples.forEach(element => {
    let peopleAtual = `<li>${element.nome}</li>`
    lista += peopleAtual
  });
  lista += "</ul>"
  return lista
}

async function obterTodosRegistrosPeople(){
  const sql = `SELECT * FROM people;`
  const peoples = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT
  })
  return peoples;
}
function insertNameDatabase(){
  const nome = "Maria Joaquina"
  const sql = `INSERT INTO people (nome) VALUES ("${nome}");`
  sequelize.query(sql, {
    type: sequelize.QueryTypes.INSERT
  })
}

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})