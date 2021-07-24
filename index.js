const core = require('@actions/core');
const httpm = require('@actions/http-client')

async function main() {
  try {
    const organizationSlug = core.getInput('organizationSlug');
    const deploymentSlug = core.getInput('deploymentSlug');
    const environment = core.getInput('environment');
    const email = core.getInput('email');
    const apiKey = core.getInput('apiKey');
    const sha = core.getInput('sha');

    const requestUrl = `https://app.sleuth.io/api/1/${organizationSlug}/${deploymentSlug}/register_deploy`;
    const data = {
      api_key: apiKey,
      sha: sha,
      environment: environment,
      email: email
    };

    let http = new httpm.HttpClient();
    let response = await http.post(requestUrl, data);

    core.setOutput('status', response.message.statusCode);

    let body = await response.readBody();
    core.setOutput('body', body);

  }
  catch (error) {
    core.setFailed(error.message);
  }
}

main();
