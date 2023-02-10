const fs = require('fs')
const core = require('@actions/core')
const { getOctokit } = require('@actions/github')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const neatCsv = require('neat-csv').default
const { Octokit } = require('@octokit/core')
const countryContinentMap = require('./continent.json')
require('dotenv').config()

let octokit
if (process.env.GITHUB_ACTION) {
  const token = core.getInput('github_token')
  if (!token) {
    console.error( 'Input `github_token` is required' )
    process.exit(1)
  }
  octokit = new getOctokit(token)
} else if (process.env.GITHUB_TOKEN && !process.env.SKIP_GITHUB_ISSUES) {
  octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
}

async function createIssue (input) {
  console.log('Create GitHub Issue:')
  console.log(input)
  const fields = []
  fields.push(`| Field | Value |`)
  fields.push(`| --- | --- |`)
  for (const field in input.fields) {
    fields.push(`| ${field} | ${input.fields[field]} |`)
  }
  let testOutput = '\n## Output from Checks\n\n'
  let extraData = '\n## Extra Data used by Checks\n\n'
  for (const minerResult of input.results) {
    if (minerResult.OutputLines && minerResult.OutputLines.length > 0) {
      const packageLines = {}
      for (const line of minerResult.OutputLines) {
        if (line.Package) {
          if (!packageLines[line.Package]) {
            packageLines[line.Package] = []
          }
          const lines = packageLines[line.Package]
          if (line.Action === 'output') {
            if (line.Test) {
              lines.push(line.Test + ': ' + line.Output.trim())
            } else {
              lines.push(line.Output.trim())
            }
          }
        }
      }

      testOutput += `Miner ID: ${minerResult.Miner.MinerID} ` +
        `(${minerResult.Miner.City}, ${minerResult.Miner.CountryCode})\n\n` +
        '```\n'
      for (const pkg in packageLines) {
        testOutput += `${pkg}:\n\n`
        testOutput += packageLines[pkg].join('\n') + '\n\n'
      }
      testOutput += '```\n'
    }
    if (minerResult.ExtraArtifacts) {
      extraData += `Miner ID: ${minerResult.Miner.MinerID} ` +
        `(${minerResult.Miner.City}, ${minerResult.Miner.CountryCode})\n\n` +
        '```\n'
      extraData += JSON.stringify(minerResult.ExtraArtifacts, null, 2)
      extraData += '\n```\n'
    }
  }
  const data = {
    owner: process.env.GITHUB_REPOSITORY_OWNER,
    repo: process.env.GITHUB_REPOSITORY.split('/').slice(-1)[0],
    title: `Failed: ${input.fields['0_storage_provider_operator_name']}`,
    body: `
A Google Form submission failed automated KYC checks:

## Fields

${fields.join('\n')}

## Errors

${input.errors.map(err => `* ${err}`).join('\n')}

${testOutput}

${extraData}
`,
    labels: [
      'failed checks'
    ]
  }
  if (!octokit || process.env.SKIP_GITHUB_ISSUES) {
    console.log(data)
  } else {
    const response = await octokit.request('POST /repos/{owner}/{repo}/issues', data)

    console.log('Response', response)
  }
}

async function run (
  inputFile,
  outputSpListCsv,
  outputOrgsCsv,
  outputProcessedCsv
) {
  // organizations.csv
  let oldOrgsRecords = []
  let oldOrgsMaxId = 0
  const organizationsByName = new Map()
  if (fs.existsSync(outputOrgsCsv)) {
    const csvData = fs.readFileSync(outputOrgsCsv, 'utf8')
    oldOrgsRecords = await neatCsv(csvData)
    for (const orgRecord of oldOrgsRecords) {
      org = orgRecord.sp_organization ? orgRecord.sp_organization.toLowerCase() : ''
      organizationsByName.set(
        org,
        orgRecord
      )
      oldOrgsMaxId = Math.max(oldOrgsMaxId, orgRecord.sp_org_id)
    }
  }

  // sp-list.csv
  let oldSpListRecords = []
  const spByMinerId = new Map()
  if (fs.existsSync(outputSpListCsv)) {
    const csvData = fs.readFileSync(outputSpListCsv, 'utf8')
    oldSpListRecords = await neatCsv(csvData)
    for (const spListRecord of oldSpListRecords) {
      spByMinerId.set(spListRecord.sp_id, spListRecord)
    }
  }

  // Read input records
  /*
  const inputFields = [
    "responseId",
    "timestamp",
    "0_storage_provider_operator_name",
    "0_your_name",
    "0_your_handle_on_filecoin_io_slack",
    "0_your_email",
    "1_minerid",
    "1_city",
    "1_country",
    "2_minerid",
    "2_city",
    "2_country",
  ]
  */
  const inputData = fs.readFileSync(inputFile, 'utf8')
  const inputParsed = JSON.parse(inputData)
  const inputs = []
  const newOrgsRecords = []
  const newSpListRecords = []

  for (const inputRecord of inputParsed) {
    const fields = inputRecord.ResponseFields
    const results = inputRecord.MinerCheckResults
    const input = { fields, results }
    const errors = []

    const minerCheckResults = {}
    for (const minerCheck of inputRecord.MinerCheckResults) {
      minerCheckResults[minerCheck.Miner.MinerID] = minerCheck.Success
    }

    const miners = []
    const minerIds = new Set()
    for (let i = 1; i <= 3; i++) {
      if (fields[`${i}_minerid`]) {
        const minerId = fields[`${i}_minerid`]
        const miner = {
          minerId,
          city: fields[`${i}_city`],
          countryCode: fields[`${i}_country`]
        }
        miner.pass = !!minerCheckResults[minerId]
        if (!miner.pass) {
          errors.push(`${minerId} failed`)
        }
        if (spByMinerId.has(minerId)) {
          errors.push(`${minerId} already listed`)
        }
        if (minerIds.has(minerId)) {
          errors.push(`${minerId} submitted more than once`)
        } else {
          minerIds.add(minerId)
          miners.push(miner)
        }
      }
    }

    let orgId
    if (errors.length === 0) {
      const orgName = fields['0_storage_provider_operator_name']
      if (organizationsByName.has(orgName.toLowerCase())) {
        const existingOrg = organizationsByName.get(orgName.toLowerCase())
        console.log("existingOrg", existingOrg, existingOrg?.sp_org_id)
        orgId = existingOrg.sp_org_id
        if (existingOrg.contact_name !== fields['0_your_name']) {
          existingOrg.contact_name = fields['0_your_name']
        } else if (
          existingOrg.contact_slack_id !==
          fields['0_your_handle_on_filecoin_io_slack']
        ) {
          existingOrg.contact_slack_id = fields['0_your_handle_on_filecoin_io_slack']
//           errors.push(
//             `Organization Slack ID differs, ` +
//               `"${fields['0_your_handle_on_filecoin_io_slack']}" != ` +
//               `"${existingOrg.contact_slack_id}"`
//           )
        } else if (existingOrg.contact_email !== fields['0_your_email']) {
          existingOrg.contact_email = fields['0_your_email']
        }
      } else {
        console.log("oldOrgMaxId", oldOrgsMaxId, newOrgsRecords.length + 1)
        orgId = oldOrgsMaxId + newOrgsRecords.length + 1
        newOrgRecord = {
          sp_org_id: orgId,
          sp_organization: fields['0_storage_provider_operator_name'],
          contact_name: fields['0_your_name'],
          contact_slack_id: fields['0_your_handle_on_filecoin_io_slack'],
          contact_email: fields['0_your_email']
        }
        newOrgsRecords.push(newOrgRecord)
        organizationsByName.set(orgName.toLowerCase(), newOrgRecord)
      }
    }
    input.pass = errors.length === 0
    input.errors = errors
    if (input.pass) {
      for (const miner of miners) {
        const spListRecord = {
          sp_id: miner.minerId,
          sp_organization: fields['0_storage_provider_operator_name'],
          sp_org_id: orgId,
          loc_city: miner.city,
          loc_country: miner.countryCode,
          loc_continent: countryContinentMap[miner.countryCode],
          active: true,
          slack_id: fields['0_your_handle_on_filecoin_io_slack']
        }
        newSpListRecords.push(spListRecord)
        spByMinerId.set(miner.minerId, spListRecord)
      }
    }
    inputs.push(input)
  }

  // Write organizations.csv
  const orgsRecords = oldOrgsRecords.concat(newOrgsRecords)
  const orgsOutputFields = [
    'sp_org_id',
    'sp_organization',
    'contact_name',
    'contact_slack_id',
    'contact_email'
  ]
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
  const newProcessedRecords = inputs.map(({ fields, pass, errors }) => ({
    response_id: fields.responseId,
    timestamp: fields.timestamp,
    processed_time: now,
    success: pass,
    error_message: errors ? errors.join(',') : undefined
  }))
  const processedRecords = oldProcessedRecords.concat(newProcessedRecords)
  await processedCsvWriter.writeRecords(processedRecords)
  console.log(
    `Wrote ${processedRecords.length} records ` +
      `(${newProcessedRecords.length} new) to ${outputProcessedCsv}`
  )

  for (const input of inputs) {
    if (!input.pass) {
      await createIssue(input)
    }
  }

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

