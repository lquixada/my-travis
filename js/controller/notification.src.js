NotificationController = o.Class({
	extend: Controller,

	getResult: function () {
		return this.result || {passed: [], failed: []};
	},
	
	update: function (projs) {
		var prefs = Prefs.get();

		if (prefs.notifications) {
			this._notify(projs);
		}
	},
  
	// private
	
	_compare: function (stored, fetched) {
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
	_format: function (projs) {
		var formatted = {};

		for (var user in projs) {
			projs[user].forEach(function (proj) {
				var slug = proj.user+'/'+proj.name;

				formatted[slug] = this._getStatus(proj);
			}, this);
		}

		return formatted;
	},

	_getStatus: function (proj) {
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

	_getStored: function () {
		return Prefs.get('statuses');
	},

	_hasFailed: function () {
		return this.getResult().failed.length > 0;
	},

	_hasPassed: function () {
		return this.getResult().passed.length > 0;
	},

	_notify: function (projs) {
		var result,
			stored = this._getStored(),
			fetched = this._format(projs);

		if (!stored) {
			this._store(stored = fetched);
		}

		this.result = this._compare(stored, fetched);

		if (this._hasFailed()) {
			this._open('failed');
		}

		if (this._hasPassed()) {
			this._open('passed');
		}
		
		// Update stored
		this._store(fetched);
	},

	_open: function (type) {
		var file = '../html/notification.html?'+type;
		var notification = webkitNotifications.createHTMLNotification(file);

		notification.show();

		setTimeout(function () {
			notification.close();
		}, 3000);
	},

	_store: function (obj) {
		Prefs.set('statuses', obj);
	}
});

Notification = new NotificationController();
