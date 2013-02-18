HeaderController = o.Class({
	extend: Controller,
	dom: 'header',
	
	addListeners: function () {
		this.el().on('click', 'button#open-users', function () {
			formPrefsController.close();
			formUsersController.toggle();
		});

		this.el().on('click', 'button#open-prefs', function () {
			formUsersController.close();
			formPrefsController.toggle();
		});
	},
	
	boot: function() {
		this.addListeners();
	}
});

headerController = new HeaderController();
