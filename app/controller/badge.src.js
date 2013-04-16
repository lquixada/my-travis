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

		if (projs.length===0) {
			this.clear();
			return;
		}

		projs.forEach(function (proj) {
			if (proj.status === 'failed') {
				failed++;
				return;
			}

			if (proj.status === 'started') {
				running++;
				return;
			}
		});

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
			.sub([
					'request-travisapi-done',
					'request-done',
					'button-yes-clicked'
				], function () {
					that.update(Projs.get());	

					console.log('Badge updated!');
			})
			.sub('project-list-cleared', function () {
				that.clear();
			});
	}
});

var badgeController = new BadgeController();
