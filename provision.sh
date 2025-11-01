#!/bin/bash

set -e

echo "Atualizando pacotes..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "Instalando pacotes necessários..."
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

echo "Instalando Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

echo "Adicionando vagrant ao grupo docker..."
sudo usermod -aG docker vagrant

echo "Instalando Docker Compose..."
DOCKER_COMPOSE_VERSION="2.24.1"
sudo curl -L "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Instalando kubectl..."
KUBECTL_VERSION="v1.33.1"
curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl

echo "Instalando Minikube..."
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64

echo "Habilitando Minikube com Docker driver..."
sudo -u vagrant -H bash -c 'minikube config set driver docker'

echo "Tudo instalado! Você pode iniciar o Minikube com:"
echo "    minikube start"