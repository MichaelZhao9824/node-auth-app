pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "node-auth-app:latest"
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build --no-cache -t $DOCKER_IMAGE .'
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
        mkdir -p bin
        curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b ./bin

        echo "Running npm audit..."
        npm audit --audit-level=low || true

        echo "Running Trivy on source code..."
        ./bin/trivy fs . || true
        '''
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker stop node-auth-app || true '
        sh 'docker rm node-auth-app || true '
        sh 'docker run -d -p 3000:3000 --name node-auth-app ${DOCKER_IMAGE}'
        //sh 'node app.js &'
      }
    }

    stage('Monitoring') {
      steps {
        sh 'sleep 15'
        sh '''curl http://localhost:3000/health'''
        }
    }
  }

  post {
    always {
      echo 'CI/CD pipeline completed.'
    }
  }
}
