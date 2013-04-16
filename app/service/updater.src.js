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
			// Then begin the polling again
			that.start();
		});
	},

	start: function () {
		var
			users = Prefs.getUsers(),
			interval = parseFloat(Prefs.get('interval'), 10) || 1;

		if (users.length) {
			this._createAlarm(interval);
		}
	},

	stop: function () {
		this._clearAlarm();
	},

	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client.sub('extension-installed', function () {
				that._addAlarmListeners();
				that.restart();
			})
			.sub('update-requested', function () {
				console.log(new Date());
				console.log('Requesting...');

				that.exec();
			})
			.sub(['form-prefs-submitted', 'form-users-submitted'], function () {
				that.restart();
				this.pub('form-submit-done');
			});
	},

	_addAlarmListeners: function () {
		var that = this;

		chrome.alarms.onAlarm.addListener(function (alarm) {
			if (alarm && alarm.name === 'travisapi') {
				console.log(new Date());
				console.log('Requesting...');

				that.exec();
			}
		});	
	},

	_clearAlarm: function () {
		console.log('Updater stopped.');
		chrome.alarms.clear('travisapi');
	},

	_createAlarm: function (interval) {
		console.log('Updater started. Polling interval: '+interval+'min');
		chrome.alarms.create('travisapi', {periodInMinutes:interval});
	}
});

new UpdaterService();
