# Step 1: Use an official Node.js image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the entire project to the container
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Expose the port on which the app will run
EXPOSE 3000

# Step 8: Start the Next.js app
CMD ["npm", "start"]
