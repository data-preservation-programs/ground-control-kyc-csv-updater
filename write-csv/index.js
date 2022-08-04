const fs = require('fs')
const core = require('@actions/core')
const github = require('@actions/github')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const neatCsv = require('neat-csv').default

async function run(inputFile, outputSpListCsv, outputOrgsCsv, outputProcessedCsv) {

  /*
  const inputFields = [
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
  */
  const inputData = fs.readFileSync(inputFile, 'utf8')
  const inputParsed = JSON.parse(inputData)

  // Desired schema:
  // sp_id,sp_organization,sp_org_id,loc_city,loc_country,loc_continent,active,slack_id
 
  // Examples:
  // f01392893,"NGVP Cloud",1,"Utrecht","NL","EU",true,"rob"
  // f01240,"DCENT",2,"Amsterdam","NL","EU",true,"Wijnand Schouten"

  // sp-list.csv
  let oldSpListRecords = []
  if (fs.existsSync(outputSpListCsv)) {
    const csvData = fs.readFileSync(outputSpListCsv, 'utf8')
    oldSpListRecords = await neatCsv(csvData)
  }
  const spListOutputFields = [
    'sp_id',
    'sp_organization',
    'sp_org_id',
    'loc_city',
    'loc_country',
    'loc_continent',
    'active',
    'slack_id'
  ]
  const spListCsvWriter = createCsvWriter({
    path: outputSpListCsv,
    header: spListOutputFields.map(field => ({ id: field, title: field }))
  })
  const newSpListRecords = inputParsed.map(({ ResponseFields: responseFields }) => ({
    sp_id: 1, // FIXME
    sp_organization: responseFields['0_name'],
    sp_org_id: 1, // FIXME
    loc_city: responseFields['1_city'],
    loc_country: responseFields['1_country_code'],
    loc_continent: 'XX', // FIXME
    active: true,
    slack_id: '@FIXME' // FIXME
  }))
  const spListRecords = oldSpListRecords.concat(newSpListRecords)
  await spListCsvWriter.writeRecords(spListRecords)
  console.log(`Wrote ${spListRecords.length} records ` +
              `(${newSpListRecords.length} new) to ${outputSpListCsv}`)

  // processed.csv
  let oldProcessedRecords = []
  if (fs.existsSync(outputProcessedCsv)) {
    const csvData = fs.readFileSync(outputProcessedCsv, 'utf8')
    oldProcessedRecords = await neatCsv(csvData)
  }
  const now = (new Date()).toISOString()
  const processedFields = [
    'processed_time',
    'responseId',
    'timestamp',
    'success',
    'issue_id'
  ]
  const processedCsvWriter = createCsvWriter({
    path: outputProcessedCsv,
    header: processedFields.map(field => ({ id: field, title: field }))
  })
  const newProcessedRecords = inputParsed.map(({ ResponseFields: responseFields }) => ({
    responseId: responseFields.responseId,
    timestamp: responseFields.timestamp,
    processed_time: now,
    success: true
  }))
  const processedRecords = oldProcessedRecords.concat(newProcessedRecords)
  await processedCsvWriter.writeRecords(processedRecords)
  console.log(`Wrote ${processedRecords.length} records ` +
              `(${newProcessedRecords.length} new) to ${outputProcessedCsv}`)

  console.log('Done.')
}

try {
  const testResults = core.getInput('test-results') || process.argv[2]
  if (!testResults) {
    console.error('Missing test-results file path')
    process.exit(1)
  }
  console.log('Path for test-results:', testResults)
  const outputSpListCsv = core.getInput('output-sp-list-csv') || process.argv[3]
  if (!outputSpListCsv) {
    console.error('Missing output-sp-list-csv file path')
    process.exit(1)
  }
  console.log('Path for output-sp-list-csv:', outputSpListCsv)
  const outputOrgsCsv = core.getInput('output-orgs-csv') || process.argv[4]
  if (!outputOrgsCsv) {
    console.error('Missing output-orgs-csv file path')
    process.exit(1)
  }
  console.log('Path for output-orgs-csv:', outputOrgsCsv)
  const outputProcessedCsv = core.getInput('output-processed-csv') || process.argv[5]
  if (!outputProcessedCsv) {
    console.error('Missing output-processed-csv file path')
    process.exit(1)
  }
  console.log('Path for output-processed-csv:', outputProcessedCsv)
  run(testResults, outputSpListCsv, outputOrgsCsv, outputProcessedCsv)
} catch (error) {
  core.setFailed(error.message)
}
