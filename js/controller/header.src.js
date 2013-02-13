HeaderController = o.clazz({
	extend: Controller,

	addListeners: function () {
		$('button#open-users').addEventListener('click', function () {
			formUsers.toggle();
		});

		$('button#open-prefs').addEventListener('click', function () {
			formPrefs.toggle();
		});
	}
});

headerController = new HeaderController();
