FROM node:24-alpine as build-backend
COPY ./package*.json .
RUN npm install
COPY ./src/ src/
COPY ./images/ images/
COPY ./docs/ docs/
COPY ./*.js ./
COPY ./*.json ./
RUN npm run build-deploy
# The results is in /dist folder

FROM node:24-alpine
WORKDIR /app
RUN npm install http-server
ENTRYPOINT ["npx", "http-server", "-p", "8000"]
RUN chown node:node .
USER node
COPY --from=build-backend /dist/. ./
