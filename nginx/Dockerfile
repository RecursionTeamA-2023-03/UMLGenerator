FROM nginx:1.23.4-alpine

COPY ./entrypoint-nginx.sh /

RUN set -ex && \
	apk add --no-cache bash && \
	chmod +x /entrypoint-nginx.sh

COPY ./vhost.production.template /etc/nginx/conf.d/vhost.template

CMD ["/entrypoint-nginx.sh"]