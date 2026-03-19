version: '3.8'
services:
  app:
    build: .
    container_name: webex-ack-bot
    env_file: .env
    ports:
      - "3000:3000"
    restart: unless-stopped
    volumes:
      - ./data:/app/data
#  mongo:
#    image: mongo:7
#    ports:
#      - "27017:27017"
#    volumes:
#      - mongo_data:/data/db
#volumes:
#  mongo_data:
