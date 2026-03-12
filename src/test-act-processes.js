const axios = require('axios')
require('dotenv').config()

const { getActToken } = require('./services/actAuth')

async function run() {

  const token = await getActToken()

  const url = `${process.env.ACT_API_BASE}/api/processes`

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Act-Database-Name": process.env.ACT_DATABASE
    }
  })

  console.log(JSON.stringify(response.data, null, 2))

}

run().catch(err => {
  console.error(err.response?.data || err.message)
})

