pipeline {
  agent any

  environment {
    IMAGE_NAME = "nh360-services"
    CONTAINER_NAME = "nh360-services"
    DOMAIN_NAME = "services.nh360fastag.com"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/talonmindhq/nh360.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${IMAGE_NAME}:latest")
        }
      }
    }

    stage('Stop Old Container') {
      steps {
        sh """
          docker stop ${CONTAINER_NAME} || true
          docker rm ${CONTAINER_NAME} || true
        """
      }
    }

    stage('Run New Container (Traefik)') {
      steps {
        sh """
          docker run -d \
            --name ${CONTAINER_NAME} \
            --network traefik \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -l "traefik.enable=true" \
            -l "traefik.http.routers.${CONTAINER_NAME}.rule=Host(\`${DOMAIN_NAME}\`)" \
            -l "traefik.http.routers.${CONTAINER_NAME}.entrypoints=websecure" \
            -l "traefik.http.routers.${CONTAINER_NAME}.tls.certresolver=letsencrypt" \
            ${IMAGE_NAME}:latest
        """
      }
    }
  }
}
