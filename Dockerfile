FROM node:14.15.4-slim

RUN apt-get update && apt-get upgrade -y && \
        apt-get install git -y

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]