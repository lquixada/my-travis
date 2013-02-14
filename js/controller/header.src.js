HeaderController = o.clazz({
	extend: Controller,
	dom: 'header',
	
	init: function () {
		var that = this;

		$(document).ready(function () {
			that.addListeners();
		});
	},
	
	addListeners: function () {
		this.el().on('click', 'button#open-users', function () {
			formPrefs.close();
			formUsers.toggle();
		});

		this.el().on('click', 'button#open-prefs', function () {
			formUsers.close();
			formPrefs.toggle();
		});
	}
});

new HeaderController();
