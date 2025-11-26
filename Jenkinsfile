pipeline {
    agent any

    environment {
        APP_NAME = "vestidos-app"
        TAG      = "${BUILD_NUMBER}"
        IMAGE    = "${APP_NAME}:${TAG}"
    }

    stages {

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build CI/Runtime Image') {
            steps {
                sh """docker build -t ${IMAGE} ."""
            }
        }

        stage('Lint') {
            steps {
                sh """docker run --rm ${IMAGE} sh -c 'npm run lint'"""
            }
        }

        // Playwright runs using a dedicated image with browsers installed
        stage('E2E Tests') {
            steps {
                sh """
                    docker build -f dockerfile.e2e -t vestidos-e2e:${TAG} .
                    docker run --rm vestidos-e2e:${TAG}
                """
            }
        }

        stage('Deploy') {
            when { branch 'main' }
            steps {
                sh """
                    docker tag ${IMAGE} ${APP_NAME}:latest

                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker run -d -p 3000:3000 --name ${APP_NAME} ${APP_NAME}:latest
                """
            }
        }
    }

    post {
        success { echo "🚀 Full Pipeline Passed (Lint + E2E + Deploy)" }
        failure { echo "❌ Pipeline Failed" }
        always { sh "docker image prune -f || true" }
    }
}
