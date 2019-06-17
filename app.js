// include modules and setup server variables 
const express = require('express')
const app = express()
const port = 3000

// routes 
app.get('/', (req, res) => {
  res.send('Hello world!')
})

// listening on localhost
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})