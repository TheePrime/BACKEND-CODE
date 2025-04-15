# use an official node.js runtime as a parent image
FROM node:22-alpine

#Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

#Install the dependencies
RUN npm install



# Copy the current directory contents into the container at /app
COPY . .

#Initialize the prisma 
RUN npx prisma generate


# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node ./src/server.js"]
