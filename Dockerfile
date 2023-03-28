FROM ubuntu:latest

COPY --chown=node:node . /usr/src/ml/

WORKDIR /usr/src/ml

COPY package*.json ./

RUN apt-get update && apt-get install -y \
 locales \
 python3-pip \
 libgdal1-dev \
 libxft-dev \
 libfreetype6-dev \
 libffi-dev \
 vim \
 nodejs \
 npm \
 curl \
 wget

RUN npm install

COPY . .

RUN set -xe \
    && apt-get update \
    && apt-get install --yes python-pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE ${PORT}

RUN python Programmer.py newlist.xlsx

CMD [ "node", "index.js" ]

