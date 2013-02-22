HeaderController = o.Class({
	extend: DOMController,
	dom: 'header',
	
	boot: function() {
		this._addListeners();
	},
	
	_addListeners: function () {
		this.el().on('click', 'button#open-users', function () {
			formPrefsController.close();
			formUsersController.toggle();
		});

		this.el().on('click', 'button#open-prefs', function () {
			formUsersController.close();
			formPrefsController.toggle();
		});
	}
});

headerController = new HeaderController();
