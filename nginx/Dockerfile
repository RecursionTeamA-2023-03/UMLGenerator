FROM nginx:alpine

COPY ./entrypoint-nginx.sh /

RUN set -ex && \
	apk add --no-cache bash && \
	chmod +x /entrypoint-nginx.sh

COPY ./vhost.template /etc/nginx/conf.d/vhost.template

CMD ["/entrypoint-nginx.sh"]