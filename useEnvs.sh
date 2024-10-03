#!/bin/bash

# Define your services
services=("mw-webapp" "mw-survey" "mw-storage" "mw-notification" "mw-notification-bff" "mw-server" "mw-chat-websocket" "mw-chat-bff" "mw-chat" "grafana")

# Define the environment file templates
if [ "$1" = "local" ]; then
  env_file_example=".env.local.example"
elif [ "$1" = "docker" ]; then
  env_file_example=".env.local.docker.example"
else
  echo "Invalid option. Use 'local' or 'docker'."
  exit 1
fi

# Loop through each service and apply the environment configuration
for service in "${services[@]}"; do
  rm "$service/.env"
  cp "$service/$env_file_example" "$service/.env"
  echo "Envs changed in $service"
done
