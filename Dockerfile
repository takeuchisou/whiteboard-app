FROM node:16-alpine

WORKDIR /app

# Copy server files
COPY server/ ./server/

# Install dependencies
RUN cd server && npm install

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server/server.js"]