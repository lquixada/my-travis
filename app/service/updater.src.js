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

			that.client.pub('request-travisapi-done', projs);

			if (callback) {
				callback(projs);
			}
		});	
	},

	init: function () {
		var that = this;

		this.client = new LiteMQ.Client();
		this._addBusListeners();
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
	},

	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client.sub('background-document-ready', function () {
				that.start();
			})
			.sub('form-prefs-submitted', function () {
				that.restart();
			})
			.sub('form-users-submitted', function () {
				that.stop();

				// Do a request right away!
				that.exec(function () {
					that.client.pub('request-user-done');
					that.restart();
				});
			});
	}
});

var Updater = new UpdaterService();
