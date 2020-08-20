FROM node:12

RUN apt-get update && apt-get -y upgrade && apt-get -y install texlive-xetex texlive-latex-base
ADD app /opt/app
WORKDIR /opt/app/lib

CMD node index.js

