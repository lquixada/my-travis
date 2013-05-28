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
		var count, color,
			failed = 0,
			running = 0;

		if (Projects.length===0) {
			this._clearChromeBadge();
			return;
		}

		Projects.each(function (project) {
			if (project.get('status') === 'failed') {
				failed++;
				return;
			}

			if (project.get('status')=== 'started') {
				running++;
				return;
			}
		});

		if (running>0 && failed === 0) {
			// Do nothing, maintain state
			return;
		}

		count = (failed?''+failed:' ');
		color = (failed?'red':'green');

		this._setChromeBadge(count, color);
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
		this._setChromeBadge('');
	},
	
	_setChromeBadge: function (count, color) {
		try {
			chrome.browserAction.setBadgeText({text: count});
			chrome.browserAction.setBadgeBackgroundColor({color: (color==='red'?'#f00':'#0c0')});
		} catch (err) {
			// fail silently. propably the code is running in a test environment
		}
	}
});

new BadgeController();
