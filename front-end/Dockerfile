FROM node as build

RUN npm i -g yarn

WORKDIR /usr/src/app
COPY . .

RUN yarn
RUN yarn build

FROM nginx
WORKDIR /usr/share/nginx/html

COPY --from=build /usr/src/app/build .

#FROM nginx
#CMD curl -L https://git.io/n-install | bash
#CMD n lts
#CMD npm i -g yarn

#WORKDIR /opt/starter

#COPY . .

#CMD yarn
#CMD yarn build

#CMD cp ./build /usr/share/nginx/html
#CMD rm -r /opt/starter