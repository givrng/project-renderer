# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.17.1

################################################################################
# Base
################################################################################

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app


################################################################################
# Dependencies
################################################################################

FROM base AS deps

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


################################################################################
# Build
################################################################################

FROM deps AS build

COPY . .

RUN yarn build


################################################################################
# Production dependencies
################################################################################

FROM base AS prod-deps

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile


################################################################################
# Production
################################################################################

FROM base AS final

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install Chromium and its runtime dependencies.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

USER node

COPY --chown=node:node package.json ./

COPY --from=prod-deps --chown=node:node \
    /usr/src/app/node_modules \
    ./node_modules

COPY --from=build --chown=node:node \
    /usr/src/app/dist \
    ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
