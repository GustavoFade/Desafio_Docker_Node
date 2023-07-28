const express = require('express')
const app = express()
const port = 3000
const Sequelize = require('sequelize')


const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: dbHost,
});

app.use(express.json())
app.get('/', (req, res) => {
  return res.json({ name: "Ciclano Fulano" });
})

sequelize.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

(()=>{

  const sql = `
  INSERT INTO people (nome)
  VALUES ("testesss");
`
sequelize.query(sql, {
  type: sequelize.QueryTypes.INSERT
})
})()

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})