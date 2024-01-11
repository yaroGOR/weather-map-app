FROM node:18-alpine

RUN npm install -g yarn --force

RUN mkdir -p /opt/app && chown -R node:node /opt/app

USER node

WORKDIR /opt/app

COPY --chown=node:node ./yarn.lock ./

# RUN yarn

COPY --chown=node:node ./package.json ./

RUN yarn 

ENV PATH /opt/app/node_modules/.bin:$PATH

COPY --chown=node:node . .

EXPOSE $PORT

COPY --chown=node:node /docker/scripts/development-init.sh /init.sh

CMD ["/bin/sh", "/init.sh"]
