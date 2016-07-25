FROM nodesource/centos7:4.4.2
RUN yum -y update \
    && yum -y install bzip2 gcc-c++ make 

WORKDIR /

RUN mkdir /app \
    && git clone https://github.com/kvss/k-text-analyzer-server.git /app

WORKDIR /app/src

RUN NODE_ENV=dev npm install
 

EXPOSE 4001