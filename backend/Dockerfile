FROM node:alpine
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3001
ENTRYPOINT ["node", "index.js"]
