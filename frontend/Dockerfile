# Use Node 18 for compatibility
FROM node:18-alpine

# Set working directory for frontend
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code to the working directory
COPY . .

# Expose port 3001
EXPOSE 3001

# Start the application in development mode
CMD ["npm", "run", "dev"]
