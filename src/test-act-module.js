const { getActToken } = require('./services/actAuth')

async function run() {

  const token = await getActToken()

  console.log("TOKEN START:", token.substring(0,60))

}

run().catch(err => {
  console.error(err)
})

