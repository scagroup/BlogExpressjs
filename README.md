# BlogExpressjs
Blog with nodejs + expressjs and mongodb

## Config mongodb
config mongodb in file moduls/getRoutesMangiDB/index.js

    const client = require('mongodb').MongoClient;
    const url_database = 'mongodb://YouDataConnectDataBase';
    const nameDB = 'YouNameDB';
    const nameCollection = 'YouNameCollectionDB'

## Config nginx
This file cofig nginx it work iSPManager

    server {
        server_name dev.klinsight.ru www.YOUADDRESSITE.ru;
        include /etc/nginx/vhosts-includes/\*.conf;
        include /etc/nginx/vhosts-resources/YOUADDRESSITE/\*.conf;
        access_log /var/www/httpd-logs/YOUADDRESSITE.access.log;
        error_log /var/www/httpd-logs/YOUADDRESSITE.error.log notice;
        ssi off;
        set $root_path /var/www/www-root/data/www/YOUADDRESSITE;
        root $root_path;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        
        location ~* ^.+\.(jpg|jpeg|gif|png|ico|txt|woff|otf|eot|svg|ttf|html|xml|css|js|ico|txt|woff|woff2)$ {
            set $root_path1 /var/www/www-root/data/www/YOUADDRESSITE/public;
            root $root_path1;
            expires 30d;
            error_page 404 @notfound;
        }

        location / {
            proxy_pass http://localhost:3000;
            proxy_redirect off;
            error_page 404 @notfound;
        }

        location @notfound {
            proxy_pass http://localhost:3000$request_uri;
        }
	    charset off;
	    disable_symlinks if_not_owner from=$root_path;
	    listen YOUIPADRESSERVER:80;
    }
    server {
        server_name "~^www\.(.*)$";
        return 301 $scheme://$1$request_uri;
    }
