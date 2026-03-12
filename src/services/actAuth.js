require('dotenv').config()
const axios = require('axios')

let cachedToken = null
let tokenCreatedAt = null

async function getActToken() {

  const TOKEN_LIFETIME_MS = 1000 * 60 * 50

  if (cachedToken && (Date.now() - tokenCreatedAt) < TOKEN_LIFETIME_MS) {
    return cachedToken
  }

  const url = `${process.env.ACT_API_BASE}/authorize`

  const response = await axios.get(url, {
    auth: {
      username: process.env.ACT_USERNAME,
      password: process.env.ACT_PASSWORD
    },
    headers: {
      "Act-Database-Name": process.env.ACT_DATABASE
    }
  })

  cachedToken = response.data
  tokenCreatedAt = Date.now()

  return cachedToken
}

module.exports = {
  getActToken
}

