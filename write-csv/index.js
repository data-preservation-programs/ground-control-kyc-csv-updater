const core = require('@actions/core')
const github = require('@actions/github')

async function run(inputFile) {
  console.log('Input file:', inputFile)
}

try {
  const testResults = core.getInput('test-results') || process.argv[2]
  run(testResults)
} catch (error) {
  core.setFailed(error.message);
}
