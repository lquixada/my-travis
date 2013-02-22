UpdaterController = o.Class({
	extend: DOMController,

	render: function () {
		var popupUrl = chrome.extension.getURL('html/popup.html');
		var views = chrome.extension.getViews();

		views.forEach(function (view) {
			if (view.location.href == popupUrl) {
				view.listController.render();
			}
		});
	}
});

updaterController = new UpdaterController();

