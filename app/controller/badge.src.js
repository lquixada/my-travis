/*globals Controller */

var BadgeController = o.Class({
	extend: Controller,
	
	clear: function () {
		chrome.browserAction.setBadgeText({text: ''});
	},

	init: function (opt) {
		var that = this;

		this._super(opt);
		this.client = new LiteMQ.Client();
		this._addListeners();
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
	
	_addListeners: function () {
		var that = this;
		
		this.client.sub('background-document-ready', function () {
			that.update(Projs.get());	
		});

		this.client.sub('request-travisapi-done', function (msg) {
			var projs = msg.body;

			that.update(projs);
		});
	}
});

var Badge = new BadgeController();
