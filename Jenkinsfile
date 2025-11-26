pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'vestidos-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    docker.image('node:20-alpine').inside {
                        sh 'npm ci'
                    }
                }
            }
        }
        
        stage('Lint & Type Check') {
            steps {
                script {
                    docker.image('node:20-alpine').inside {
                        sh 'npm run lint'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    docker.image('node:20-alpine').inside {
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Test E2E') {
            steps {
                script {
                    docker.image('mcr.microsoft.com/playwright:v1.48.0-noble').inside {
                        sh 'npm ci'
                        sh 'npm run test:e2e'
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage('Deploy') {
            steps {
                sh "docker stop ${DOCKER_IMAGE} || true"
                sh "docker rm ${DOCKER_IMAGE} || true"
                sh "docker run -d -p 3000:3000 --name ${DOCKER_IMAGE} ${DOCKER_IMAGE}:latest"
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}
