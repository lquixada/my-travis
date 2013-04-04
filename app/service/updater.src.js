/*globals Service, Prefs, Projs, TravisAPI */

var UpdaterService = o.Class({
	extend: Service,

	exec: function (callback) {
		var that = this,
			users = Prefs.getUsers();

		TravisAPI.get(users, function (projs) {
			projs = Projs.store(projs);

			that.client.pub('request-travisapi-done', projs);

			if (callback) {
				callback(projs);
			}
		});	
	},

	init: function () {
		var that = this;

		this.client = new LiteMQ.Client();
		this._addListeners();
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
	
	_addListeners: function () {
		var that = this;
		
		this.client.sub('background-document-ready', function () {
			that.start();
		});

		this.client.sub('form-prefs-submitted', function () {
			that.restart();
		});

		this.client.sub('form-users-submitted', function () {
			that.stop();

			// Do a request right away!
			that.exec(function () {
				that.restart();
			});
		});
	}
});

var Updater = new UpdaterService();
