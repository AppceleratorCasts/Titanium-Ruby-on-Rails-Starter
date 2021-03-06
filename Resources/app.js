/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.
 * A starting point for tab-based application with multiple top-level windows.
 *
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *
 */
var _ = require('/lib/underscore')._;
var log = require('/lib/log');
var app = require('/context');
var Network = require('/services/Network');
var AppTabGroup = require('ui/AppTabGroup');

log.info('---------------------'+app.appName+'---------------------');
log.mem();

var verifyInternet = function() {
	if(!Ti.Network.online) {
		var msg = Ti.UI.createAlertDialog({
			title: app.appName,
			message: 'Please connect to the Internet to use '+app.appName
		});
		msg.show();
	}
}
var reloadTabs = function(user){
    log.info('app.js -> [app:user:login] | loading tabs');

    appTabs.close();
	appTabs = new AppTabGroup();

	log.info('we made the new tabgroup: '+appTabs);
	appTabs.open();
	log.info('we opened the tabgroup')
}

app.settings.set('network.host', 'http://www.gobusybee.com'); // this can only be used in the simulator
Network.setBaseUrl(app.settings.get('network.host'));

var appTabs = new AppTabGroup();
appTabs.open();

verifyInternet();

Ti.App.addEventListener('app:user.login',  reloadTabs);
Ti.App.addEventListener('app:user.logout', reloadTabs);

Ti.App.addEventListener('resumed', function(){
	verifyInternet();
});