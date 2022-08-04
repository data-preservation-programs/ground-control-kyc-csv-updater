const fs = require('fs')
const core = require('@actions/core')
const github = require('@actions/github')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const neatCsv = require('neat-csv').default

async function run (
  inputFile,
  outputSpListCsv,
  outputOrgsCsv,
  outputProcessedCsv
) {
  // organizations.csv
  let oldOrgsRecords = []
  if (fs.existsSync(outputOrgsCsv)) {
    const csvData = fs.readFileSync(outputOrgsCsv, 'utf8')
    oldOrgsRecords = await neatCsv(csvData)
  }

  // sp-list.csv
  let oldSpListRecords = []
  if (fs.existsSync(outputSpListCsv)) {
    const csvData = fs.readFileSync(outputSpListCsv, 'utf8')
    oldSpListRecords = await neatCsv(csvData)
  }

  // Read input records
  /*
  const inputFields = [
    "responseId",
    "timestamp",
    "0_name",
    "0_slack_id",
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
  const inputs = []
  const newOrgsRecords = []
  const newSpListRecords = []

  for (const inputRecord of inputParsed) {
    const fields = inputRecord.ResponseFields
    const input = { fields }
    let pass = true
    const errors = []

    const minerCheckResults = {}
    for (const minerCheck of inputRecord.MinerCheckResults) {
      minerCheckResults[minerCheck.Miner.MinerID] = minerCheck.Success
    }

    const miners = []
    for (let i = 1; i <= 3; i++) {
      if (fields[`${i}_minerid`]) {
        const minerId = fields[`${i}_minerid`]
        const miner = {
          minerId,
          city: fields[`${i}_city`],
          countryCode: fields[`${i}_country_code`]
        }
        miner.pass = !!minerCheckResults[minerId]
        if (!miner.pass) {
          errors.push(`${minerId} failed`)
          pass = false
        }
        miners.push(miner)
      }
    }

    input.pass = pass
    input.errors = errors
    if (pass) {
      const orgId = oldOrgsRecords.length + newOrgsRecords.length + 1
      newOrgsRecords.push({
        sp_org_id: orgId,
        sp_organization: fields['0_name'],
        slack_id: fields['0_slack_id']
      })
      for (const miner of miners) {
        newSpListRecords.push({
          sp_id: miner.minerId,
          sp_organization: fields['0_name'],
          sp_org_id: orgId,
          loc_city: miner.city,
          loc_country: miner.countryCode,
          loc_continent: 'XX', // FIXME
          active: true,
          slack_id: fields['0_slack_id']
        })
      }
    }
    inputs.push(input)
  }

  // Write organizations.csv
  const orgsRecords = oldOrgsRecords.concat(newOrgsRecords)
  const orgsOutputFields = ['sp_org_id', 'sp_organization', 'slack_id']
  const orgsCsvWriter = createCsvWriter({
    path: outputOrgsCsv,
    header: orgsOutputFields.map(field => ({ id: field, title: field }))
  })
  await orgsCsvWriter.writeRecords(orgsRecords)
  console.log(
    `Wrote ${orgsRecords.length} records ` +
      `(${newOrgsRecords.length} new) to ${outputOrgsCsv}`
  )

  // Write sp-list.csv
  const spListRecords = oldSpListRecords.concat(newSpListRecords)
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
  await spListCsvWriter.writeRecords(spListRecords)
  console.log(
    `Wrote ${spListRecords.length} records ` +
      `(${newSpListRecords.length} new) to ${outputSpListCsv}`
  )

  // processed.csv
  let oldProcessedRecords = []
  if (fs.existsSync(outputProcessedCsv)) {
    const csvData = fs.readFileSync(outputProcessedCsv, 'utf8')
    oldProcessedRecords = await neatCsv(csvData)
  }
  const now = new Date().toISOString()
  const processedFields = [
    'processed_time',
    'response_id',
    'timestamp',
    'success',
    'error_message',
    'issue_id'
  ]
  const processedCsvWriter = createCsvWriter({
    path: outputProcessedCsv,
    header: processedFields.map(field => ({ id: field, title: field }))
  })
  const newProcessedRecords = inputs.map(
    ({ fields, pass, errors }) => ({
      responseId: fields.responseId,
      timestamp: fields.timestamp,
      processed_time: now,
      success: pass,
      error_message: errors ? errors.join(',') : undefined
    })
  )
  const processedRecords = oldProcessedRecords.concat(newProcessedRecords)
  await processedCsvWriter.writeRecords(processedRecords)
  console.log(
    `Wrote ${processedRecords.length} records ` +
      `(${newProcessedRecords.length} new) to ${outputProcessedCsv}`
  )

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

  const outputProcessedCsv =
    core.getInput('output-processed-csv') || process.argv[5]
  if (!outputProcessedCsv) {
    console.error('Missing output-processed-csv file path')
    process.exit(1)
  }
  console.log('Path for output-processed-csv:', outputProcessedCsv)

  run(testResults, outputSpListCsv, outputOrgsCsv, outputProcessedCsv)
} catch (error) {
  core.setFailed(error.message)
}
