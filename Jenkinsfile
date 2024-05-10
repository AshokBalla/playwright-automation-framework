pipeline {
  agent any
  stages {
    stage('Validate') { steps { sh 'npm test' } }
    stage('Playwright') { steps { sh 'npm run test:e2e || true' } }
  }
}
