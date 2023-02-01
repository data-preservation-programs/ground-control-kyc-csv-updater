/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 413:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 494:
/***/ ((module) => {

module.exports = eval("require")("@octokit/core");


/***/ }),

/***/ 495:
/***/ ((module) => {

module.exports = eval("require")("csv-writer");


/***/ }),

/***/ 814:
/***/ ((module) => {

module.exports = eval("require")("dotenv");


/***/ }),

/***/ 108:
/***/ ((module) => {

module.exports = eval("require")("neat-csv");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 397:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"BD":"AS","BE":"EU","BF":"AF","BG":"EU","BA":"EU","BB":"NA","WF":"OC","BL":"NA","BM":"NA","BN":"AS","BO":"SA","BH":"AS","BI":"AF","BJ":"AF","BT":"AS","JM":"NA","BV":"AN","BW":"AF","WS":"OC","BQ":"NA","BR":"SA","BS":"NA","JE":"EU","BY":"EU","BZ":"NA","RU":"EU","RW":"AF","RS":"EU","TL":"OC","RE":"AF","TM":"AS","TJ":"AS","RO":"EU","TK":"OC","GW":"AF","GU":"OC","GT":"NA","GS":"AN","GR":"EU","GQ":"AF","GP":"NA","JP":"AS","GY":"SA","GG":"EU","GF":"SA","GE":"AS","GD":"NA","GB":"EU","GA":"AF","SV":"NA","GN":"AF","GM":"AF","GL":"NA","GI":"EU","GH":"AF","OM":"AS","TN":"AF","JO":"AS","HR":"EU","HT":"NA","HU":"EU","HK":"AS","HN":"NA","HM":"AN","VE":"SA","PR":"NA","PS":"AS","PW":"OC","PT":"EU","SJ":"EU","PY":"SA","IQ":"AS","PA":"NA","PF":"OC","PG":"OC","PE":"SA","PK":"AS","PH":"AS","PN":"OC","PL":"EU","PM":"NA","ZM":"AF","EH":"AF","EE":"EU","EG":"AF","ZA":"AF","EC":"SA","IT":"EU","VN":"AS","SB":"OC","ET":"AF","SO":"AF","ZW":"AF","SA":"AS","ES":"EU","ER":"AF","ME":"EU","MD":"EU","MG":"AF","MF":"NA","MA":"AF","MC":"EU","UZ":"AS","MM":"AS","ML":"AF","MO":"AS","MN":"AS","MH":"OC","MK":"EU","MU":"AF","MT":"EU","MW":"AF","MV":"AS","MQ":"NA","MP":"OC","MS":"NA","MR":"AF","IM":"EU","UG":"AF","TZ":"AF","MY":"AS","MX":"NA","IL":"AS","FR":"EU","IO":"AS","SH":"AF","FI":"EU","FJ":"OC","FK":"SA","FM":"OC","FO":"EU","NI":"NA","NL":"EU","NO":"EU","NA":"AF","VU":"OC","NC":"OC","NE":"AF","NF":"OC","NG":"AF","NZ":"OC","NP":"AS","NR":"OC","NU":"OC","CK":"OC","XK":"EU","CI":"AF","CH":"EU","CO":"SA","CN":"AS","CM":"AF","CL":"SA","CC":"AS","CA":"NA","CG":"AF","CF":"AF","CD":"AF","CZ":"EU","CY":"EU","CX":"AS","CR":"NA","CW":"NA","CV":"AF","CU":"NA","SZ":"AF","SY":"AS","SX":"NA","KG":"AS","KE":"AF","SS":"AF","SR":"SA","KI":"OC","KH":"AS","KN":"NA","KM":"AF","ST":"AF","SK":"EU","KR":"AS","SI":"EU","KP":"AS","KW":"AS","SN":"AF","SM":"EU","SL":"AF","SC":"AF","KZ":"AS","KY":"NA","SG":"AS","SE":"EU","SD":"AF","DO":"NA","DM":"NA","DJ":"AF","DK":"EU","VG":"NA","DE":"EU","YE":"AS","DZ":"AF","US":"NA","UY":"SA","YT":"AF","UM":"OC","LB":"AS","LC":"NA","LA":"AS","TV":"OC","TW":"AS","TT":"NA","TR":"AS","LK":"AS","LI":"EU","LV":"EU","TO":"OC","LT":"EU","LU":"EU","LR":"AF","LS":"AF","TH":"AS","TF":"AN","TG":"AF","TD":"AF","TC":"NA","LY":"AF","VA":"EU","VC":"NA","AE":"AS","AD":"EU","AG":"NA","AF":"AS","AI":"NA","VI":"NA","IS":"EU","IR":"AS","AM":"AS","AL":"EU","AO":"AF","AQ":"AN","AS":"OC","AR":"SA","AU":"OC","AT":"EU","AW":"NA","IN":"AS","AX":"EU","AZ":"AS","IE":"EU","ID":"AS","UA":"EU","QA":"AS","MZ":"AF"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const fs = __nccwpck_require__(147)
const core = __nccwpck_require__(413)
const { getOctokit } = __nccwpck_require__(716)
const createCsvWriter = (__nccwpck_require__(495).createObjectCsvWriter)
const neatCsv = (__nccwpck_require__(108)["default"])
const { Octokit } = __nccwpck_require__(494)
const countryContinentMap = __nccwpck_require__(397)
__nccwpck_require__(814).config()

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
      for (const package in packageLines) {
        testOutput += `${package}:\n\n`
        testOutput += packageLines[package].join('\n') + '\n\n'
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


})();

module.exports = __webpack_exports__;
/******/ })()
;