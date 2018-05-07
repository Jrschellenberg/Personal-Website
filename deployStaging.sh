# staging
CONTAINER_NAME=staging
sudo CONTAINER_NAME=$CONTAINER_NAME PORT=8081 docker-compose -p $CONTAINER_NAME up -d --build