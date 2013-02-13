HeaderController = o.clazz({
	extend: Controller,
	dom: 'header',

	addListeners: function () {
		this.el('button#open-users').addEventListener('click', function () {
			formUsers.toggle();
		});

		this.el('button#open-prefs').addEventListener('click', function () {
			formPrefs.toggle();
		});
	}
});

headerController = new HeaderController();
