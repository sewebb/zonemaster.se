# zonemaster.se

## Nginx configuration

A reverse proxy must be set up to one of the available environments.
{dev}, {stg}, {prd} e.g https://zmbackend03-dev.iis.se:8443

Add the following to the Nginx configuration file in the server block:

```
listen 80;
listen 443 ssl http2;
server_name .zonemaster.test;
root "/home/vagrant/www/zonemaster.se/public";

rewrite ^/(.+)(/assets/.+)$ $2 redirect;

location = / {
	return 302 /sv/;
}

location /en {
	try_files $uri $uri/ /en/index.html?$query_string;
}

 location /sv {
	try_files $uri $uri/ /sv/index.html?$query_string;
}

location /api {
	proxy_pass https://zmbackend03-dev.iis.se:8443;

}
```

If you are using Homestead you can add [this file](homestead/zonemaster.sh) to `Homestead/scripts/site-types` and add `type: "zonemaster"` in Homestead.yaml where you map the Zonemaster site. Reload the Vagrant box (add `--provision` if simply reloading the box doesn't work).
