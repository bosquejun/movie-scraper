#!/bin/bash


# Define colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Installing dependencies from the Docker container...${NC}"

# Run installation and start containers
docker compose run api yarn install && docker compose up -d

echo -e "${GREEN}Local live development with hot reload is now set up.${NC}"
echo -e "${GREEN}You can now access the applications and start development.${NC}"

# Display URLs
echo -e "${GREEN}Frontend URL: http://localhost:5173${NC}"
echo -e "${GREEN}Backend URL: http://localhost:3001${NC}"
