# dependency install
FROM node:18 AS install
WORKDIR /app
COPY package*.json ./

RUN npm install -f

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]



# # image create
# FROM node:18-alpine AS build
# WORKDIR /app

# COPY --chown=node:node --from=install /app/node_modules ./node_modules
# COPY --chown=node:node . .

# RUN npm run build

# ENV NODE_ENV production

# RUN npm ci --only=production && npm cache clean