HeaderController = o.clazz({
	extend: Controller,

	addListeners: function () {
		$('button#open-prefs').addEventListener('click', function () {
			formController.toggle();
		});
	}
});

headerController = new HeaderController();
