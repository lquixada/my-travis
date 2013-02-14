Badge = {
	clear: function () {
		chrome.browserAction.setBadgeText({text: ''});
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
	}
};
