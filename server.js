const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pool = require('./configs/mysql')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(router)

app.get('/api/v1.0/blog', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM user')
  res.json(data)
  next()
})

app.get('/', (req, res) => {
  res.send('homepage')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
