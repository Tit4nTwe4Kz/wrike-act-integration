require('dotenv').config()
const axios = require('axios')
const { getActToken } = require('./services/actAuth')

async function fetchEntity(endpoint) {

  const token = await getActToken()

  const url = `${process.env.ACT_API_BASE}${endpoint}`

  const response = await axios.get(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Act-Database-Name": process.env.ACT_DATABASE,
      "Content-Type": "application/json"
    }
  })

  return response.data
}

function collectCustomFields(records) {

  const fields = new Set()

  records.forEach(record => {

    if (record.customFields) {
      Object.keys(record.customFields).forEach(key => {
        fields.add(key)
      })
    }

  })

  return Array.from(fields)
}

async function run() {

  const endpoints = {
    contacts: "/api/contacts",
    companies: "/api/companies",
    opportunities: "/api/opportunities",
    groups: "/api/groups",
    tasks: "/api/activities",
    history: "/api/history"
  }

  for (const [entity, endpoint] of Object.entries(endpoints)) {

    try {

      const records = await fetchEntity(endpoint)

      const fields = collectCustomFields(records)

      console.log("\n============================")
      console.log(`ENTITY: ${entity}`)
      console.log("============================")

      if (fields.length === 0) {
        console.log("No custom fields detected")
      } else {
        fields.forEach(f => console.log(f))
      }

    } catch(err) {

      console.log(`\n${entity} endpoint failed`)
      console.log(err.response?.data || err.message)

    }

  }

}

run()

