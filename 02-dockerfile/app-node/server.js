const express = require("express")
const os = require("os")

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.json({
    message: "Hello from Node.js!",
    hostname: os.hostname(),
    port: PORT,
    nodeVersion: process.version,
  })
})

app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
