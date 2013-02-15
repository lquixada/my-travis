NotificationController = o.clazz({
	extend: Controller,
	dom: 'body',

	boot: function () {
		var that = this,
			failed = Prefs.get('failed');

		this.render(failed);

		setTimeout(function () {
			that.close();
		}, 3000);
	},

	close: function () {
		window.close();
	},

	getFailed: function (projs) {
		var failed = [];

		for (var key in projs) {
			projs[key].forEach(function (proj) {
				if (proj.status === 'failed') {
					failed.push(proj.name);
				}
			});
		}

		return failed;
	},

	isSame: function (arr1, arr2) {
		return ($(arr1).not(arr2).length == 0
				&& $(arr2).not(arr1).length == 0);
	},

	open: function () {
		var notification = webkitNotifications.createHTMLNotification('../html/notification.html');
		notification.show();
	},

	render: function (failed) {
		var len = failed.length;

		if (len) {
			this.setIcon('failed');
			this.setTitle(len+(len>1?' builds':' build')+' failing.');
			this.setText('Projects: '+failed.join(', '));
		} else {
			this.setIcon('passed');
			this.setTitle('All builds passing.');
			this.setText('Congratulations!');
		}
	},

	setIcon: function (status) {
		this.el().find('span.status').addClass(status);
	},

	setText: function (msg) {
		this.el().find('p').html(msg);
	},

	setTitle: function (msg) {
		this.el().find('h1').html(msg);
	},

	update: function (projs) {
		var prefs = Prefs.get(),
			failedOld = prefs.failed,
			failedNew = this.getFailed(projs);

		if (!prefs.notifications) {
			return;
		}

		if (!failedOld) {
			// Save for later
			Prefs.set('failed', failedOld = failedNew);
		}

		// Only open, if there's something new
		if (!this.isSame(failedOld, failedNew)) {
			// Update registry
			Prefs.set('failed', failedNew);

			// Open notification
			this.open();
		}
	}
});

Notification = new NotificationController();
