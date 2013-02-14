HeaderController = o.clazz({
	extend: Controller,
	dom: 'header',

	addListeners: function () {
		$('header').find('button#open-users').on('click', function () {
			formUsers.toggle();
		});

		$('header').find('button#open-prefs').on('click', function () {
			formPrefs.toggle();
		});
	}
});

headerController = new HeaderController();
