
const {rootController} = require("./controllers/root");

const express = require('express')

const app = express()
const port = 3000

app.get('/', rootController)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
