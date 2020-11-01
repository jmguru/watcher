FROM hypriot/rpi-node:8

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 2115
CMD [ "node", "index.js" ]
