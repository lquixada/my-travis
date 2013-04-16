/*globals Controller */

var BadgeController = o.Class({
	extend: Controller,

	init: function (opt) {
		this._super(opt);

		this.client = new LiteMQ.Client({name: 'BadgeController'});
		this._addBusListeners();
		this.update();
	},


	update: function () {
		var
			failed = 0,
			running = 0,
			projs = Projs.get();

		if (projs.length===0) {
			this._clearChromeBadge();
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

		this._setChromeBadge(failed);
	},
	
	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client
			.sub(['request-done',	'user-removed'], function () {
				that.update();	

				console.log('Badge updated!');
			})
			.sub('project-list-cleared', function () {
				that._clearChromeBadge();
			});
	},

	_clearChromeBadge: function () {
		chrome.browserAction.setBadgeText({text: ''});
	},
	
	_setChromeBadge: function (failed) {
		chrome.browserAction.setBadgeText({text: (failed?''+failed:' ')});
		chrome.browserAction.setBadgeBackgroundColor({color: (failed?'#f00':'#0c0')});
	}
});

new BadgeController();
