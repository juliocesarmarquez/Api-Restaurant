FROM node:alpine

WORKDIR /app
COPY . .
RUN "npm i"

ENV PORT=3000
ENV DB_USERNAME = "admin"
ENV DB_PASSWORD = "password"
ENV DB_NAME = "test"
ENV DB_PORT = 3306
ENV DB_HOST = "localhost"
ENV JWT_SECRET = "H0l41Q2:;#$12ERjEioErtE9229w"
ENV PAYPAL_CLIENTID = "ATPHPjZY0K0lmYwQD7oMT4dYFHFEq1IX7v4_8GmZjAOZIImkiVSGj_s6k3B9NUkY2dgkdrnOKwPv-4n1"
ENV PAYPAL_API = "https://api-m.sandbox.paypal.com"
ENV PAYPAL_SECRET = "ELu_qqEZ2N_2CynVWdE_f2vTKjQ22tb3GpXCLle0LyA00GGpnL862hAb0W4MjwQ2x21iXxv_orvTMsYt"

CMD [ "npm", "start" ]