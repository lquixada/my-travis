NotificationController = o.Class({
	extend: Controller,

	compare: function (stored, fetched) {
		var storedStatus, fetchedStatus;
		var result = {
			passed: [],
			failed: []
		};

		for (var slug in fetched) {
			storedStatus = stored[slug];
			fetchedStatus = fetched[slug];

			if (storedStatus == 'passed' && fetchedStatus == 'failed') {
				result.failed.push(slug);
				continue;
			}

			if (storedStatus == 'failed' && fetchedStatus == 'passed') {
				result.passed.push(slug);
				continue;
			}
		}

		return result;
	},

	// Creates a hash-table for tracking projects status
	format: function (projs) {
		var formatted = {};

		for (var user in projs) {
			projs[user].forEach(function (proj) {
				formatted[proj.user+'/'+proj.name] = this.getStatus(proj);
			}, this);
		}

		return formatted;
	},

	getResult: function () {
		return this.result || {passed: [], failed: []};
	},

	getStatus: function (proj) {
		switch (proj.status) {
			case 'passed':
				return 'passed';
			case 'failed':
			case 'errored':
				return 'failed';
			default:
				return '?';
		}
	},

	getStored: function () {
		return Prefs.get('statuses');
	},

	hasFailed: function () {
		return this.result.failed.length > 0;
	},

	hasPassed: function () {
		return this.result.passed.length > 0;
	},

	notify: function (projs) {
		var result,
			stored = this.getStored(),
			fetched = this.format(projs);

		if (!stored) {
			this.store(stored = fetched);
		}

		this.result = this.compare(stored, fetched);

		if (this.hasFailed()) {
			this.open('failed');
		}

		if (this.hasPassed()) {
			this.open('passed');
		}
		
		// Update stored
		this.store(fetched);
	},

	open: function (type) {
		var file = '../html/notification.html?'+type;
		var notification = webkitNotifications.createHTMLNotification(file);

		notification.show();

		setTimeout(function () {
			notification.close();
		}, 3000);
	},

	store: function (obj) {
		Prefs.set('statuses', obj);
	},

	update: function (projs) {
		var prefs = Prefs.get();

		if (prefs.notifications) {
			this.notify(projs);
		}
	}
});

Notification = new NotificationController();
