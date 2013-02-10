HeaderController = o.clazz({
	extend: Controller,

	addListeners: function () {
		$('button#open-prefs').addEventListener('click', function () {
			formController.toggle();
		});
	},

	pdateUser: function () {
		$('span#user').innerHTML = Prefs.get('user'); 
	}
});

headerController = new HeaderController();
