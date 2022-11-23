FROM node:19.1-alpine as base
WORKDIR /app-builder
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY tsconfig.json .
COPY build.ts .
COPY src ./src

FROM base as builder
RUN npm run build
RUN npm prune --production

FROM base as linter
CMD ["npm", "run", "lint"]

FROM base as tester
CMD ["npm", "run", "test"]

FROM node:19.1-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app-builder/index.js /app/index.js
COPY --from=builder /app-builder/index.js.map /app/index.js.map
CMD ["node", "index.js"]
