FROM node:8
EXPOSE 8888
ENV HOME /home
COPY trainSchedulesServer.bin.js $HOME/
WORKDIR $HOME
ENTRYPOINT [ "node", "./trainSchedulesServer.bin.js" ]
