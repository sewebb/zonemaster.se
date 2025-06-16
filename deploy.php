<?php

namespace Deployer;
require 'recipe/common.php';
require 'contrib/npm.php';
require 'contrib/slack.php';

define('BASEPATH', __DIR__);
require __DIR__ . '/vendor/autoload.php';
use Dotenv\Dotenv;

$dotenv = Dotenv::createUnsafeImmutable(__DIR__);

if (file_exists(__DIR__.'/.env')) {
	$dotenv->load();
} else {
	exit('Please create an .env file to continue');
}

// Project name
set('application', getenv('APPLICATION'));

// Project repository
set('repository', getenv('REPOSITORY'));
set('git_tty', true);

set('allow_anonymous_stats', false);
set('keep_releases', 5);

set('slack_webhook', getenv('SLACK_WEBHOOK'));
set('slack_text', '_{{user}}_ deploying `{{target}}` to *{{host}}*');
set('slack_success_text', 'Deploy to *{{host}}* successful');
set('slack_failure_text', 'Deploy to *{{host}}* failed');
set('slack_color', '#50b2fc');
set('slack_success_color', '#55c7b4');
set('slack_failure_color', '#c27fec');

// Shared files/dirs between deploys
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server
add('writable_dirs', []);

// Hosts
host('stage')
	->setRemoteUser(getenv('DEPLOY_STAGE_USER'))
	->setHostname(getenv('DEPLOY_STAGE_IP'))
	->set('branch', 'feature/new-gui')
	->set('deploy_path', '/var/www/{{application}}')
	->set('host', 'stage');

host('prod')
	->setRemoteUser(getenv('DEPLOY_PROD_USER'))
	->setHostname(getenv('DEPLOY_PROD_IP'))
	->set('branch', 'main')
	->set('deploy_path', '/var/www/{{application}}')
	->set('host', 'prod');


task(
	'git:tag',
	function () {
		$host = get('host');

		if ($host !== 'prod') {
			return;
		}

		$date = runLocally('date +"%y%m%d%H%M"');
		$release = get('release_name');
		$release_tag = 'v-'.$date.'-'.$release;
		$branch = get('branch', 'unknown');
		$message = 'Deployed branch '.$branch.' to '.$host;

		runLocally("git tag $release_tag -m '{$message}'");
		runLocally('git push origin --tags');
	}
)->desc('Create release tag');

task(
	'npm:production',
	function () {
		run('cd {{release_path}} && npm run production');
	}
);



before('deploy', 'slack:notify');
after('deploy:success', 'slack:notify:success');
after('deploy:success', 'git:tag');
after('deploy:failed', 'slack:notify:failure');

after('deploy:update_code', 'npm:install');
after('deploy:update_code', 'npm:production');

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

