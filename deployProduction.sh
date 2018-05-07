# Production build
CONTAINER_NAME=production
sudo CONTAINER_NAME=$CONTAINER_NAME PORT=8080 docker-compose -p $CONTAINER_NAME up -d --build