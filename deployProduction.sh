# Production build
sudo CONTAINER_NAME=production PORT=8080 docker-compose -p $CONTAINER_NAME up -d --build