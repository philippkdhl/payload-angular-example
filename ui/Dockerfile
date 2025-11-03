FROM docker.artifactory.dhl.com/ibm-semeru-runtimes:open-21-jre-focal AS local-cert-generator

RUN   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /tmp/tls.key -out /tmp/tls.crt -subj "/CN=localhost" && \
      cat /tmp/tls.crt /tmp/tls.key > /tmp/self-signed-certificate.pem


###################################################
#see https://hub.docker.com/_/nginx?tab=tag
FROM docker.artifactory.dhl.com/nginx:stable-alpine3.21-slim
USER root

# delete default conf to be sure, anyways /etc/nginx/conf.d/ will not be included
RUN rm /etc/nginx/conf.d/default.conf && \
    chmod a+rwx /etc/nginx/ -R && ls -la /etc/nginx/ && \
    rm -rf /usr/share/nginx/html/*

# add default configuration for local testing
ENV applicationEnvironment=dev\
  loggingLevel='2'


RUN mkdir -p /etc/nginx/ssl && chmod 777 /etc/nginx/ssl
COPY --from=local-cert-generator /tmp/self-signed-certificate.pem /etc/nginx/ssl/self-signed-certificate.pem

COPY deployment/nginx.conf           /template/
COPY deployment/entrypoint.sh     /docker-entrypoint.d/docker-entrypoint-custom.sh
RUN chmod +x /docker-entrypoint.d/docker-entrypoint-custom.sh

COPY dist/ui/browser /usr/share/nginx/html/

RUN chmod a+rwx /usr/share/nginx/html/ -R

# set user to id which does not exists, like in openshift
USER 123123
# expose ports from nginx.conf
EXPOSE 8443
