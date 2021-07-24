const core = require('@actions/core');
const httpm = require('@actions/http-client');

async function main() {
  try {
    const organizationSlug = core.getInput('organizationSlug');
    const deploymentSlug = core.getInput('deploymentSlug');
    const environment = core.getInput('environment');
    const email = core.getInput('email');
    const apiKey = core.getInput('apiKey');
    const sha = core.getInput('sha');

    const requestUrl = `https://app.sleuth.io/api/1/deployments/${organizationSlug}/${deploymentSlug}/register_deploy`;
    core.info(`Sleuth API URL ${requestUrl}`);

    const data = {
      api_key: apiKey,
      sha,
      environment,
      email,
    };

    Object.entries(data).forEach(([name, value]) => {
      core.info(`> Sleuth API payload ${name}: ${value}`);
    });

    const http = new httpm.HttpClient();
    const response = await http.postJson(requestUrl, data);

    core.setOutput('status', response.statusCode);
    core.setOutput('body', response.result);

    if (response.statusCode !== httpm.HttpCodes.OK) {
      throw new httpm.HttpClientError('Failed to ping Sleuth', response.statusCode);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
