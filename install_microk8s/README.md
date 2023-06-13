UBUNTU

To build project in cluster go to dir ``` build ``` and run:
``` ./build.sh ```

To create project in cluster go to dir ``` create ``` and run:
``` ./create.sh ```


Kubernetes help cmd:
microk8s kubectl create namespace covid-eu
microk8s kubectl delete namespace covid-eu
microk8s kubectl create deployment covid-eu --image=mtesluk/covid-eu
microk8s kubectl apply -f deployment.yaml
kubectl create configmap game-config-2 --from-file=configure-pod-container/configmap/game.properties
docker run -p 8000:80 -it mtesluk/portfolio-gui