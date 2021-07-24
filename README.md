# sleuth-action
A GitHub action to register a deploy to Sleuth

## Usage

An example might look something like this:

```yml
# This is a basic workflow to help you get started with Actions

name: CD

# Controls when the workflow will run
on:
  # Triggers the workflow on push but only for the main branch
  push:
    branches: [ main ]
 
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "deploy"
  deploy:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - name: Register deploy to Sleuth
        id: sleuth
        uses: baratrion/sleuth-action@main  # This should be a version tag
        with:
          organizationSlug: 'your-sleuth-organization'
          deploymentSlug: 'your-deployment-slug'
          apiKey: ${{ secrets.SLEUTH_API_KEY }}
          sha: ${{ github.sha }}
      # Use the output from the `sleuth` step
      - name: Get the response status
        run: echo "Status code ${{ steps.sleuth.outputs.status }}"

```


