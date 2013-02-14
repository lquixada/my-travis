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
			formUsers.toggle();
		});

		this.el().on('click', 'button#open-prefs', function () {
			formPrefs.toggle();
		});
	}
});

new HeaderController();
