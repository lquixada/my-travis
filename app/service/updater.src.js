/*globals Service, TravisAPI */

var UpdaterService = o.Class({
	extend: Service,

	exec: function (callback) {
		var that = this,
			users = Prefs.getUsers();

		TravisAPI.get(users, function (projs) {
			projs = Projs.convertAll(projs);

			users.forEach(function (user) {
				if (!projs[user]) {
					projs[user] = [];
				}
			});

			Projs.set(projs);

			console.log('Request done!');

			that.client.pub('request-done');

			if (callback) {
				callback(projs);
			}
		});	
	},

	init: function () {
		this.client = new LiteMQ.Client();
		this._addBusListeners();
	},

	restart: function () {
		var that = this;

		this.stop();

		// Do a request right away!
		this.exec(function () {
			that.start();
		});
	},

	start: function () {
		var
			users = Prefs.getUsers(),
			interval = parseInt(Prefs.get('interval'), 10) || 60;

		if (users.length) {
			console.log('Updater started. Polling interval: '+interval+'s');
			chrome.alarms.create('travisapi', {periodInMinutes:1/2});
		}
	},

	stop: function () {
		console.log('Updater stopped.');
		chrome.alarms.clear('travisapi');
	},

	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client.sub('update-requested', function () {
				console.log(new Date());
				console.log('Requesting...');

				that.exec();
			})
			.sub(['form-prefs-submitted', 'form-users-submitted'], function () {
				that.restart();
				this.pub('form-submit-done');
			});
	}
});

var Updater = new UpdaterService();
