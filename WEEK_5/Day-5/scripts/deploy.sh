#!/bin/bash
set -e

echo "Starting production deployment..."

echo "Stopping existing containers..."
docker compose -f docker-compose.prod.yml down

echo " Building images..."
docker compose -f docker-compose.prod.yml build

echo " Starting containers..."
docker compose -f docker-compose.prod.yml up -d

echo " Deployment completed successfully!"
docker compose -f docker-compose.prod.yml ps