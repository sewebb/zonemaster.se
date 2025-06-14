#!/usr/bin/env bash

declare -A params=$6       # Create an associative array
declare -A headers=${9}    # Create an associative array
declare -A rewrites=${10}  # Create an associative array
paramsTXT=""
if [ -n "$6" ]; then
   for element in "${!params[@]}"
   do
      paramsTXT="${paramsTXT}
      fastcgi_param ${element} ${params[$element]};"
   done
fi
headersTXT=""
if [ -n "${9}" ]; then
   for element in "${!headers[@]}"
   do
      headersTXT="${headersTXT}
      add_header ${element} ${headers[$element]};"
   done
fi
rewritesTXT=""
if [ -n "${10}" ]; then
   for element in "${!rewrites[@]}"
   do
      rewritesTXT="${rewritesTXT}
      location ~ ${element} { if (!-f \$request_filename) { return 301 ${rewrites[$element]}; } }"
   done
fi

if [ "$7" = "true" ]
then configureXhgui="
location /xhgui {
        try_files \$uri \$uri/ /xhgui/index.php?\$args;
}
"
else configureXhgui=""
fi

block="server {
    listen 80;
    listen 443 ssl http2;
    server_name .zonemaster.test;
    root "/home/vagrant/www/zonemaster.se/public";

    index index.html index.htm index.php;

    charset utf-8;
    rewrite ^/(.+)(/assets/.+)$ \$2 redirect;

    location = / {
        return 302 /sv/;
    }

    location /en {
        try_files \$uri \$uri/ /en/index.html?\$query_string;
    }

     location /sv {
        try_files \$uri \$uri/ /sv/index.html?\$query_string;
    }

    location /es {
        try_files \$uri \$uri/ /es/index.html?\$query_string;
    }

     location /fi {
        try_files \$uri \$uri/ /fi/index.html?\$query_string;
    }

	location /fr {
		try_files \$uri \$uri/ /fr/index.html?\$query_string;
	}

	 location /nb {
		try_files \$uri \$uri/ /nb/index.html?\$query_string;
    }

	 location /da {
		try_files \$uri \$uri/ /da/index.html?\$query_string;
    }

    location /api {
        proxy_pass https://zmbackend03-dev.iis.se:8443;

    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/zonemaster.test-error.log error;

    sendfile off;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;


        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }

    ssl_certificate     /etc/ssl/certs/zonemaster.test.crt;
    ssl_certificate_key /etc/ssl/certs/zonemaster.test.key;

}"

echo "$block" > "/etc/nginx/sites-available/$1"
ln -fs "/etc/nginx/sites-available/$1" "/etc/nginx/sites-enabled/$1"
