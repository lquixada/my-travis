Badge = {
	clear: function () {
		chrome.browserAction.setBadgeText({text: ''});
	},

	update: function (projs) {
		var failed = 0, running = 0;

		if (isEmptyObject(projs)) {
			this.clear();
			return;
		}
		
		for ( var key in projs) {
			projs[key].forEach(function (proj) {
				if (proj.status === 1) {
					failed++;
					return;
				}

				if (proj.status === null) {
					running++;
					return;
				}
			});
		}

		if (running>0 && failed === 0) {
			// Do nothing, maintain state
			return;
		}

		chrome.browserAction.setBadgeText({text: (failed?''+failed:' ')});
		chrome.browserAction.setBadgeBackgroundColor({color: (failed?'#f00':'#0c0')});
	}
};
