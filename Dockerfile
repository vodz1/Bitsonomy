# Dockerfile at 'organization api' root
FROM node:18

WORKDIR /app

# Copy only package.json and package-lock.json to avoid rebuilding on code changes
COPY BackEnd/organization-api/package*.json ./

RUN npm install

# Copy all files from the organization-api project
COPY BackEnd/organization-api/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
