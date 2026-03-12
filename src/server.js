require('dotenv').config()
const express = require('express')
const logger = require('./utils/logger')

const app = express()

app.use(express.json())

app.get("/", (req, res) => {

  logger.info("health_check", {
    service: "wrike-act-integration"
  })

  res.send("Wrike → Act integration server running")

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {

  logger.info("server_started", {
    port: PORT
  })

})

