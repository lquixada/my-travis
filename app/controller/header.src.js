/*globals DOMController */

var HeaderController = o.Class({
	extend: DOMController,
	dom: 'header',
	
	boot: function() {
		this._addListeners();
	},
	
	_addListeners: function () {
		var client = new LiteMQ.Client();

		this.el().on('click', 'button#open-users', function () {
			client.pub('button-open-users-pressed');
		});

		this.el().on('click', 'button#open-prefs', function () {
			client.pub('button-open-prefs-pressed');
		});
	}
});

var headerController = new HeaderController();
