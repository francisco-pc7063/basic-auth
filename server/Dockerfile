FROM debian:buster

# Configuracao de ambiente
RUN apt update && apt upgrade -y
RUN apt install -y sudo curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
apt install -y nodejs

# Testes
RUN npm -v
RUN node -v


WORKDIR /opt

ENV NODE_ENV "PRODUCTION"

CMD ["node server.js"]