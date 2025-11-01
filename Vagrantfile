Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.hostname = "minikube-vm"

  # IP fixo para a rede privada
  config.vm.network "private_network", ip: "192.168.56.10"

  # sincronização de pasta em /vagrant
  config.vm.synced_folder ".", "/vagrant"

  # Expondo porta para acesso do host
  # kubectl port-forward --address 0.0.0.0 svc/<nome-do-service-minikube> <porta-host>:<porta-service> <- este comando na vm
  # config.vm.network "forwarded_port", guest: 8082, host: 8080 # gateway
  config.vm.network "forwarded_port", guest: 80, host: 30080 # Ingress Controller


  config.vm.provider "virtualbox" do |vb|
    vb.memory = "8192"
    vb.cpus = 4
  end

  config.vm.provision "shell", path: "provision.sh"
end