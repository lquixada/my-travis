/*globals Controller */

var BadgeController = o.Class({
	extend: Controller,
	
	clear: function () {
		chrome.browserAction.setBadgeText({text: ''});
	},

	init: function (opt) {
		this._super(opt);
		this.client = new LiteMQ.Client({name: 'BadgeController'});
		this._addBusListeners();
	},

	set: function (failed) {
		chrome.browserAction.setBadgeText({text: (failed?''+failed:' ')});
		chrome.browserAction.setBadgeBackgroundColor({color: (failed?'#f00':'#0c0')});
	},

	update: function (projs) {
		var failed = 0, running = 0;

		if ($.isEmptyObject(projs)) {
			this.clear();
			return;
		}
		
		for (var key in projs) {
			projs[key].forEach(function (proj) {
				if (proj.status === 'failed') {
					failed++;
					return;
				}

				if (proj.status === 'started') {
					running++;
					return;
				}
			});
		}

		if (running>0 && failed === 0) {
			// Do nothing, maintain state
			return;
		}

		this.set(failed);
	},
	
	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client
			.sub(['button-yes-clicked', 'background-document-ready'], function () {
				that.update(Projs.get());	
			})
			.sub('request-travisapi-done', function (msg) {
				var projs = msg.body;

				that.update(projs);
			})
			.sub('project-list-cleared', function () {
				that.clear();
			});
	}
});

var badgeController = new BadgeController();
