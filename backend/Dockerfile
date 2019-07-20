FROM node:8.15

# Set working directory
WORKDIR /home/node/app

# Copy file and install dependencies
COPY package.json .
RUN npm install

# Start node server
CMD ["npm", "start"]
