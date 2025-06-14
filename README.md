# zonemaster.se

This project is built on the Zonemaster GUI repo https://github.com/zonemaster/zonemaster-gui and is basically a skinned barebone version of that repo.

## Installation
Clone the repo and run `npm install`. To compile CSS and JS-files, run `npm run production`. There is also a watch task `npm start` if you need to monitor file changes.

## Deployment
* Stage: Commit and push to `develop` to deploy https://stage.zonemaster.se. Deployment is done automatically through Envoyer.
* Production: Merge `develop` to `main` and push. Log in to Envoyer and manually deploy the `main` branch.

## UI configuration
Basic configuration such as logotypes, languages etc. is done in the `app.config.json` file located in the `public/assets` folder.

## Nginx configuration

A reverse proxy must be set up to one of the available environments.
`{dev}`, `{stg}`, `{prd}` e.g https://zonemaster-service.iis.se

Routes for the selected languages must also be configured.

Add the following to your Nginx configuration file in the server block:

```
listen 80;
listen 443 ssl http2;
server_name .zonemaster.test;
root "/home/vagrant/www/zonemaster.se/public";

rewrite ^/(.+)(/assets/.+)$ $2 redirect;
rewrite ^/run-test/?$ / redirect;

location = / {
		if ($arg_resultid) {
				return 302 /sv/result/$arg_resultid;
		}
		return 302 /sv/;
}

location /en {
		if ( $arg_resultid ) {
				return 302  /en/result/$arg_resultid;
		}
		try_files $uri $uri/ /en/index.html?$query_string;
}

 location /sv {
	try_files $uri $uri/ /sv/index.html?$query_string;
}

location /api {
	proxy_pass https://zonemaster-service.iis.se;

}

index index.php index.html;
	satisfy any;
	allow 127.0.0.1;
	allow 46.21.104.169;
	deny all;
	auth_basic "IIS Web Team.";
	auth_basic_user_file /var/www/.htpasswd;
	include global/restrictions.conf;
```

If you are using Homestead you can add [this file](homestead/zonemaster.sh) to `Homestead/scripts/site-types` and add `type: "zonemaster"` in Homestead.yaml where you map the Zonemaster site. Reload the Vagrant box (add `--provision` if simply reloading the box doesn't work).

## Get the latest files from the Zonemaster GUI repo
This project is built on the Zonemaster GUI repo. https://github.com/zonemaster/zonemaster-gui.

The latest release of Zonemaster GUI can be accessed through Github. There is a compiled zip-file `zonemaster_web_gui.zip` that contains the files needed located at e.g https://github.com/zonemaster/zonemaster-gui/releases/.
Get the latest zip and unpack it. The files needed is found in the language folders e.g. `sv`. There are 3 javascript files per language and these myúst be copied to the corresponding folder in this project. The file names start with `main` `polyfills` and `runtime`. After copying these assets you need to change the paths in the `index.html` files located in the `public/{lang}` sub folders.

Now grab the latest `faq` HTML-files. These contain the translations for the FAQ-pages. They are found in the `dist/assets/faqs` folder of the zip file. Copy the ones you need to th appropriate sub folder in the faqs folder `public/assets/faqs/{lang}`.


