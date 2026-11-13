FROM node:22-alpine@sha256:1314fb30ec37592d5845e5a160d522c0e680972aa534549940b8d73bde88481a
WORKDIR /app
COPY --chown=node:node src/index.js ./index.js
USER node
EXPOSE 3000
CMD ["node", "index.js"]
