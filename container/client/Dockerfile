FROM nginx:latest

ADD default.tpl /etc/nginx/conf.d/default.tpl
ADD build /opt/app

CMD /bin/sh -c "envsubst '\$API_HOST'< /etc/nginx/conf.d/default.tpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

