const core = require('@actions/core');
const httpm = require('@actions/http-client');
const auth = require('@actions/http-client/auth');

async function main() {
  try {
    const organizationSlug = core.getInput('organization-slug');
    const deploymentSlug = core.getInput('deployment-slug');
    const environment = core.getInput('environment');
    const email = core.getInput('email');
    const apiKey = core.getInput('api-key');
    const sha = core.getInput('sha');

    const requestUrl = `https://app.sleuth.io/api/1/deployments/${organizationSlug}/${deploymentSlug}/register_deploy`;
    core.info(`Sleuth API URL ${requestUrl}`);

    const data = {
      sha,
      environment,
      email,
    };

    Object.entries(data).forEach(([name, value]) => {
      core.info(`> Sleuth API request payload ${name}: ${value}`);
    });

    const authHeader = new auth.BasicCredentialHandler(apiKey);
    const http = new httpm.HttpClient('sleuth-http-client', [authHeader]);

    const response = await http.postJson(requestUrl, data);

    core.setOutput('status', response.statusCode);

    if (response.statusCode !== httpm.HttpCodes.OK) {
      throw new httpm.HttpClientError('Failed to ping Sleuth', response.statusCode);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
