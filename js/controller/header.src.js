HeaderController = o.clazz({
	extend: Controller,
	dom: 'header',

	addListeners: function () {
		this.el().on('click', 'button#open-users', function () {
			formUsers.toggle();
		});

		this.el().on('click', 'button#open-prefs', function () {
			formPrefs.toggle();
		});
	}
});

headerController = new HeaderController();
