FROM node:18
RUN mkdir /usr/local/nvm
USER root
RUN apt-get update && \
apt-get upgrade -y
WORKDIR /usr/src/app
COPY [".","/usr/src/app"]

RUN npm install

CMD ["npm","run","dev"]