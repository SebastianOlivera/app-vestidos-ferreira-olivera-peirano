pipeline {
    agent any

    environment {
        APP_NAME = "vestidos-app"
        TAG      = "${BUILD_NUMBER}"
        IMAGE    = "${APP_NAME}:${TAG}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Build one image that already has the code + node_modules + build
        stage('Build CI/Runtime Image') {
            steps {
                sh """
                    docker build -t ${IMAGE} .
                """
            }
        }

        // Run lint inside the built image (no mounts)
        stage('Lint') {
            steps {
                sh """
                    docker run --rm ${IMAGE} sh -c '
                        npm run lint
                    '
                """
            }
        }

        // Run Playwright E2E inside the same image
        stage('E2E Tests') {
            steps {
                sh """
                    docker run --rm --ipc=host --shm-size=2gb ${IMAGE} sh -c '
                        npx playwright install --with-deps &&
                        npm run test:e2e
                    '
                """
            }
        }

        // Only if everything above passed, tag and deploy
        stage('Deploy') {
            when {
                branch 'main'   // optional, but safer
            }
            steps {
                sh """
                    docker tag ${IMAGE} ${APP_NAME}:latest

                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME}   || true

                    docker run -d -p 3000:3000 --name ${APP_NAME} ${APP_NAME}:latest
                """
            }
        }
    }

    post {
        success {
            echo "🚀 Pipeline passed (lint + E2E) and deployment completed."
        }
        failure {
            echo "❌ Pipeline failed. App was not (re)deployed."
        }
        always {
            // Clean dangling images but don't break the build if this fails
            sh "docker image prune -f || true"
        }
    }
}
