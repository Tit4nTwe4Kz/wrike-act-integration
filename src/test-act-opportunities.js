const { getOpportunities } = require('./services/actClient')

async function run() {

  const data = await getOpportunities()

  console.log(JSON.stringify(data, null, 2))

}

run().catch(err => {
  console.error(err.response?.data || err.message)
})

