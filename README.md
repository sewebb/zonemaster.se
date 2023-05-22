# zonemaster.se

This project is built on the Zonemaster GUI repo. https://github.com/zonemaster/zonemaster-gui and is basically a skinned barebone version of that repo.

## Installation
Clone the repo and run `npm install`. To compile CSS and JS-files, run `npm run production`. There is also a watch task `npm start` if you need to monitor file changes.

## Deployment
Stage: Commit and push to `develop` to deploy https://stagezonemaster.se. Deployment is done through Envoyer.
Production: Merge develop to master and push. Log in to Envoyer and manually deploy the master branch.

## Nginx configuration

A reverse proxy must be set up to one of the available environments.
`{dev}`, `{stg}`, `{prd}` e.g https://zmbackend03-dev.iis.se:8443

Routes for the selected languages must also be configured.

Add the following to your Nginx configuration file in the server block:

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

## Get the latest files from the Zonemaster GUI repo
This project is built on the Zonemaster GUI repo. https://github.com/zonemaster/zonemaster-gui.

The latest release of Zonemaster GUI can be accessed through Github. There is a compiled zip-file `zonemaster_web_gui.zip` that contains the files needed located at e.g https://github.com/zonemaster/zonemaster-gui/releases/.
Get the latest zip and unpack it. The files needed is found in the language folders e.g. `sv`. There are 3 javascript files per language and these myúst be copied to the corresponding folder in this project. The file names start with `main` `polyfills` and `runtime`. After copying these assets you need to change the paths in the `index.html` files located in the `public/{lang}` sub folders.

Now grab the latest `faq` HTML-files. These contain the translations for the FAQ-pages. They are found in the `dist/assets/faqs` folder of the zip file. Copy the ones you need to th appropriate sub folder in the faqs folder `public/assets/faqs/{lang}`.


