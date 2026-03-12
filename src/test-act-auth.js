require('dotenv').config()
const axios = require('axios')

async function getToken() {

  const url = `${process.env.ACT_API_BASE}/authorize`

  try {

    const response = await axios.get(url, {
      auth: {
        username: process.env.ACT_USERNAME,
        password: process.env.ACT_PASSWORD
      },
      headers: {
        "Act-Database-Name": process.env.ACT_DATABASE
      }
    })

    console.log("STATUS:", response.status)
    console.log("TOKEN START:", response.data.substring(0,60))

  } catch(err) {

    if (err.response) {
      console.error("ACT ERROR:", err.response.status)
      console.error(err.response.data)
    } else {
      console.error(err.message)
    }

  }

}

getToken()

