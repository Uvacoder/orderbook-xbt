# Dockerfile

# base image
FROM node:alpine

RUN apk add --no-cache libc6-compat

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install PM2 globally - If our app crashes for some reason, our Node.js process will exit and our app will no longer be available.
# PM2 solves this problem by ensuring that our app is always restarted after crashing.
RUN npm install --global pm2

# Copy package.json and yarn.lock before other files
COPY ./package*.json /usr/src
COPY ./yarn.lock /usr/src

# Install dependencies
RUN yarn --production

# Copy all files
COPY . /usr/src

# Set any env variables like so if we had them
# ARG WSS_URL
# ENV WSS_URL $WSS_URL

# Build app
RUN npm run build

# Give permission to Nextjs to modify cache files
RUN chmod -R 775 /usr/src/.next/cache
RUN chown -R node:root /usr/src/.next/cache

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
