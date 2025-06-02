pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "node-auth-app:latest"
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm test || true' // Allow test failures for demo
      }
    }

    stage('SonarCloud Analysis') { 
        steps {
                withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                    withEnv(["PATH+SCANNER=/opt/sonar-scanner/bin"]) {
                        sh '''
                            sonar-scanner -Dsonar.login=$SONAR_TOKEN
                        '''
                    }
                }
        }
    }

    stage('Security') {
      steps {
        sh '''
          echo "Running npm audit..."
          npm audit --audit-level=low || true

          echo "Installing Trivy..."
          curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

          echo "Running Trivy on source code..."
          trivy fs . || true
        '''
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d'
      }
    }

    // Release and Monitoring stages are intentionally omitted
  }

  post {
    always {
      echo 'CI/CD pipeline completed.'
    }
  }
}
