pipeline {
    agent any

    environment {
        APP_NAME = "vestidos-app"
        TAG = "${BUILD_NUMBER}"
        APP_DIR = "app-alquiler"   // <-- project folder
    }

    stages {

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install deps & Lint') {
            steps {
                sh """
                    docker run --rm \
                        -v \$(pwd)/${APP_DIR}:/app \
                        -w /app node:20-alpine sh -c "
                            npm install &&
                            npm run lint
                        "
                """
            }
        }

        stage('Run E2E Tests') {
            steps {
                sh """
                    docker run --rm --ipc=host --shm-size=2gb \
                        -v \$(pwd)/${APP_DIR}:/app \
                        -w /app mcr.microsoft.com/playwright:v1.48.0-noble sh -c "
                            npm install &&
                            npx playwright install --with-deps &&
                            npm run test:e2e
                        "
                """
            }
        }

        stage('Build Production Image') {
            steps {
                sh "docker build -t ${APP_NAME}:${TAG} ."
                sh "docker tag ${APP_NAME}:${TAG} ${APP_NAME}:latest"
            }
        }

        stage('Deploy') {
            when { branch 'main' } // safer
            steps {
                sh "docker stop ${APP_NAME} || true"
                sh "docker rm ${APP_NAME} || true"
                sh "docker run -d -p 3000:3000 --name ${APP_NAME} ${APP_NAME}:latest"
            }
        }
    }

    post {
        success { echo "🚀 Deployed successfully after tests passed" }
        failure { echo "❌ Build FAILED — App not deployed" }
        always { sh "docker image prune -f || true" }
    }
}
