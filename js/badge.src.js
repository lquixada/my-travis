Badge = {
	clear: function () {
		chrome.browserAction.setBadgeText({text: ''});
	},

	update: function (projs) {
		var failed = 0, running = 0;

		if (projs.length === 0) {
			this.clear();
			return;
		}
		
		projs.forEach(function (proj) {
			if (proj.last_build_status === 1) {
				failed++;
				return;
			}

			if (proj.last_build_status === null) {
				running++;
				return;
			}
		});

		if (running>0 && failed === 0) {
			// Do nothing, maintain state
			return;
		}

		chrome.browserAction.setBadgeText({text: (failed?''+failed:' ')});
		chrome.browserAction.setBadgeBackgroundColor({color: (failed?'#f00':'#0c0')});
	}
};
