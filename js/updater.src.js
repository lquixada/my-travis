Updater = {
	url: 'https://api.travis-ci.org/repos',

	getUrl: function (users) {
		users = users.split(',');

		return this.url+('?owner_name[]='+users.join('&owner_name[]='));
	},

	render: function () {
		var popupUrl = chrome.extension.getURL('popup.html');
		var views = chrome.extension.getViews();

		views.forEach(function (view) {
			if (view.location.href == popupUrl) {
				view.projectController.render();
			}
		});
	},

	request: function (options) {
		var req, that = this;

		if (options.users) {
			req = new XMLHttpRequest();
			req.open('GET', this.getUrl(options.users), true);
			req.onload = function (e) {
				var projs = JSON.parse(e.target.responseText);

				Projs.set(projs);
				that.render();

				Badge.update(projs);
				
				if (options.onComplete) {
					options.onComplete(projs);
				}
			};
			req.send(null);
		}
	},

	restart: function () {
		this.stop();
		this.start();
	},

	start: function () {
		var options = {},
			that = this,
			prefs = Prefs.get(),
			users = prefs.users,
			interval = parseInt(prefs.interval, 10);

		if (users) {
			console.log( 'Updater started. Polling interval: '+interval+'s' );

			this.timer = setInterval(function () {
				that.request({users:users});
			}, interval*1000); 
		}
	},

	stop: function () {
		console.log( 'Updater stopped.' );

		clearInterval(this.timer);
	}
};
