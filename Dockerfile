# dependency install
FROM node:18-slim AS install
WORKDIR /app
COPY package*.json ./

RUN npm install

# # image create
FROM node:18-slim AS build
WORKDIR /app

COPY --chown=node:node --from=install /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

RUN npm ci --only=production --frozen-lockfile

FROM node:18-slim AS run
WORKDIR /app

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

ARG NODE_ENV=production
ENV NODE_ENV NODE_ENV

CMD ["node", "dist/main.js"]
