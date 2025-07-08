pipeline {
  agent any

  environment {
    DOMAIN = "services"
    BASE_DOMAIN = "nh360fastag.com"
    CONTAINER_NAME = "services"
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/talonmindhq/nh360.git'
      }
    }

    stage('Deploy Service') {
      steps {
        script {
          sh '''
            echo "🌀 Pulling latest code"
            git pull origin main || true

            echo "🔻 Stopping old containers"
            docker compose down || true

            echo "🚀 Rebuilding and starting updated containers"
            docker compose up -d --build
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deployed successfully at https://${DOMAIN}.${BASE_DOMAIN}"
    }
    failure {
      echo "❌ Deployment failed!"
    }
  }
}
