FROM ubuntu
WORKDIR /app
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install apache2 -y
RUN apt-get install apache2-utils -y
RUN apt-get clean
EXPOSE 80
CMD ["apache2ctl","-D","FOREGROUND"]
COPY /Flux-website/ /var/www/html/
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
