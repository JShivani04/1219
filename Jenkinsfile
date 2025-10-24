pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image..."
                bat 'docker build -t kubedemoapp:v1 C:\\Users\\SHIVANI\\Desktop\\case_study_1219'
            }
        }

        stage('Docker Login') {
            steps {
                echo "Logging in to Docker Hub..."
                bat 'docker login -u shivanij454 -p Logan@2020'
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                echo "Pushing Docker Image to Docker Hub..."
                bat "docker tag kubedemoapp:v1 shivanij454/case-study:latest"
                bat "docker push shivanij454/case-study:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Deploying to Kubernetes..."
                bat 'kubectl --kubeconfig=C:\\Users\\SHIVANI\\.kube\\config apply -f C:\\Users\\SHIVANI\\Desktop\\case_study_1219\\deployment.yaml --validate=false'
                bat 'kubectl --kubeconfig=C:\\Users\\SHIVANI\\.kube\\config apply -f C:\\Users\\SHIVANI\\Desktop\\case_study_1219\\service.yaml'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
