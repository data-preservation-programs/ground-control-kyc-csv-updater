const fs = require('fs')
const core = require('@actions/core')
const github = require('@actions/github')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

async function run(inputFile, outputCsv) {
  // console.log('Input file:', inputFile)
  const data = fs.readFileSync(inputFile, 'utf8')
  const parsed = JSON.parse(data)
  // console.log(JSON.stringify(parsed, null, 2))
  //const fields = Object.keys(parsed[0].ResponseFields)
  // console.log('Fields', fields)
  const fields = [
    "responseId",
    "timestamp",
    "0_name",
    "1_minerid",
    "1_city",
    "1_country_code",
    "2_minerid",
    "2_city",
    "2_country_code",
    "3_anything_else_you_want_us_to"
  ]
  const csvWriter = createCsvWriter({
    path: outputCsv,
    header: fields.map(field => ({ id: field, title: field }))
  })
  const records = parsed.map(({ ResponseFields: responseFields }) => ({
    ...responseFields
  }))
  await csvWriter.writeRecords(records)
  console.log('Done.')
}

try {
  const testResults = core.getInput('test-results') || process.argv[2]
  const outputCsv = core.getInput('output-csv') || process.argv[3]
  run(testResults, outputCsv)
} catch (error) {
  core.setFailed(error.message)
}
