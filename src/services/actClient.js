require('dotenv').config()
const axios = require('axios')
const { getActToken } = require('./actAuth')

async function getOpportunities() {

  const token = await getActToken()

  const url = `${process.env.ACT_API_BASE}/api/opportunities`

  const response = await axios.get(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Act-Database-Name": process.env.ACT_DATABASE,
      "Content-Type": "application/json"
    }
  })

  return response.data
}

module.exports = {
  getOpportunities
}

