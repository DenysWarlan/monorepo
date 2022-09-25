FROM node:16.14.0 As development

ENV PORT=3333
ENV PORT_SSR=4000

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]
# COPY nx.json .
RUN npm rm -rf node_modules
RUN npm cache clean --force

RUN npm install

COPY . .

RUN npm install -g @angular/cli
RUN npm install -g @nrwl/cli@12.0.1

RUN npm run build-api --prod --verbose
RUN npm run build-library-web --prod --verbose
CMD nx serve library-api
