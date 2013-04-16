/*globals Controller, webkitNotifications */

var NotificationController = o.Class({
	extend: DOMController,
	dom: 'section#notification',

	getResult: function (type) {
		var results = Status.get('results');

		if ($.isEmptyObject(results)) {
			results = {passed: [], failed: []};
		}

		if (type) {
			return results[type];
		}

		return results;
	},

	init: function () {
		this.client = new LiteMQ.Client({name: 'NotificationController'});
		this._addBusListeners();
	},

	// Render html on notification.html
	render: function (type) {
		var msg = ' has been fixed',
			slugs = this.getResult(type);
		
		if (type === 'failed') {
			msg = ' has failed';
		}

		this._addStatus(type);
		this._addTitle(slugs.length+' build'+(slugs.length>1?'s':'')+msg);
		this._addList(slugs);
	},
	
	update: function (projs) {
		var prefs = Prefs.get();

		if (prefs.notifications) {
			this._notify(projs);
		}
	},
  
	// private
	
	_addBusListeners: function () {
		var that = this;

		this.client.sub('request-done', function () {
				that.update(Projs.get());
				console.log('Notification updated!');
			})
			.sub('notification-document-ready', function (msg) {
				var type = msg.body;
				that.render(type);
			});
	},

	_addStatus: function (type) {
		this.el('span.status').addClass(type);
	},

	_addTitle: function (msg) {
		this.el('h1').append(msg);
	},

	_addList: function (slugs) {
		var lis = slugs.map(function (slug) {
				return '<li>'+slug+'</li>';
			}).join('');

		this.el('ul').html(lis);
	},
	
	_compare: function (stored, fetched) {
		var storedStatus, fetchedStatus;
		var result = {
			passed: [],
			failed: []
		};

		for (var slug in fetched) {
			storedStatus = stored[slug];
			fetchedStatus = fetched[slug];

			if (storedStatus === 'passed' && fetchedStatus === 'failed') {
				result.failed.push(slug);
				continue;
			}

			if (storedStatus === 'failed' && fetchedStatus === 'passed') {
				result.passed.push(slug);
				continue;
			}
		}

		return result;
	},

	// Creates a hash-table for tracking projects status
	_format: function (projs) {
		var formatted = {};

		projs.forEach(function (proj) {
			var slug = proj.user+'/'+proj.name;

			formatted[slug] = this._getStatus(proj);
		}, this);

		return formatted;
	},

	_getStatus: function (proj) {
		if (proj.status==='errored') {
			return 'failed';
		}

		return proj.status;
	},

	_getStored: function () {
		return Status.get('stored');
	},

	_hasFailed: function () {
		return this.getResult('failed').length > 0;
	},

	_hasPassed: function () {
		return this.getResult('passed').length > 0;
	},

	_notify: function (projs) {
		var results,
			stored = this._getStored(),
			fetched = this._format(projs);

		if (!stored) {
			this._store(stored = fetched);
		}

		results = this._compare(stored, fetched);
		
		// Update stored
		this._storeResults(results);
		this._store(fetched);

		if (this._hasFailed()) {
			this._open('failed');
		}

		if (this._hasPassed()) {
			this._open('passed');
		}
	},

	_open: function (type) {
		var file = '../html/notification.html?'+type;
		var notification = webkitNotifications.createHTMLNotification(file);

		notification.show();

		setTimeout(function () {
			notification.close();
		}, 3000);
	},

	_store: function (fetched) {
		var tmp = {},
			stored = this._getStored() || {};

		for (var slug in fetched) {
			if (fetched[slug]==='started') {
				// Retain state for future comparisons
				tmp[slug] = stored[slug];
			} else {
				tmp[slug] = fetched[slug];
			}
		}

		Status.set('stored', tmp);
	},

	_storeResults: function (results) {
		Status.set('results', results);
	}
});

var Notification = new NotificationController();
