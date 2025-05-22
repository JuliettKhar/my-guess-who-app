
# Dockerfile for stable long-term usage
FROM node:18

WORKDIR /app
COPY . .

# Install dependencies using lockfile
RUN npm ci

# Expose default Vite port
EXPOSE 5173

# Run development server
CMD ["npm", "run", "dev"]
