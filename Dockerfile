FROM node:20

WORKDIR /app

# Copy package.json & lock files and install node dependencies
COPY package*.json ./

RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start Application
CMD ["npm", "start"]