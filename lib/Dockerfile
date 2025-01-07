FROM quay.io/gurusensei/gurubhay:latest

RUN git clone https://github.com/themxgamecoder/MX-2.0 /root/mx

WORKDIR /root/mx/

RUN npm install --platform=linuxmusl

EXPOSE 5000

CMD ["npm", "start"]
