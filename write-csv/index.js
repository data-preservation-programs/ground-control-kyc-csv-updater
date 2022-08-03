const fs = require('fs')
const core = require('@actions/core')
const github = require('@actions/github')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

async function run(inputFile, outputSpListCsv) {
  const data = fs.readFileSync(inputFile, 'utf8')
  const parsed = JSON.parse(data)

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

  // Desired schema:
  // sp_id,sp_organization,sp_org_id,loc_city,loc_country,loc_continent,active,slack_id
 
  // Examples:
  // f01392893,"NGVP Cloud",1,"Utrecht","NL","EU",true,"rob"
  // f01240,"DCENT",2,"Amsterdam","NL","EU",true,"Wijnand Schouten"

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
  const spListRecords = parsed.map(({ ResponseFields: responseFields }) => ({
    sp_id: 1, // FIXME
    sp_organization: responseFields['0_name'],
    sp_org_id: 1, // FIXME
    loc_city: responseFields['1_city'],
    loc_county: responseFields['1_country_code'],
    loc_continent: 'XX', // FIXME
    active: true,
    slack_id: '@FIXME' // FIXME
  }))
  await spListCsvWriter.writeRecords(spListRecords)
  console.log('Done.')
}

try {
  const testResults = core.getInput('test-results') || process.argv[2]
  const outputSpListCsv = core.getInput('output-sp-list-csv') || process.argv[3]
  const outputOrgsCsv = core.getInput('output-orgs-csv') || process.argv[4]
  const outputProcessedCsv = core.getInput('processed-csv') || process.argv[5]
  run(testResults, outputSpListCsv)
} catch (error) {
  core.setFailed(error.message)
}
