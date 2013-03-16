/*globals Service, Badge, Notification, Prefs, Projs, TravisAPI, updaterController */

var UpdaterService = o.Class({
	extend: Service,

	exec: function (callback) {
		var users = Prefs.getUsers();

		TravisAPI.get(users, function (projs) {
			projs = Projs.store(projs);

			Badge.update(projs);
			Notification.update(projs);

			updaterController.render();

			if (callback) {
				callback(projs);
			}
		});	
	},

	restart: function () {
		this.stop();
		this.start();
	},

	start: function () {
		var that = this,
			users = Prefs.getUsers(),
			interval = parseInt(Prefs.get('interval'), 10) || 60;

		if (users.length) {
			console.log('Updater started. Polling interval: '+interval+'s');

			this.timer = setInterval(function () {
				that.exec();
			}, interval*1000); 
		}
	},

	stop: function () {
		console.log('Updater stopped.');

		clearInterval(this.timer);
	}
});

var Updater = new UpdaterService();
