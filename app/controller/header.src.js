/*globals DOMController */

var HeaderController = o.Class({
	extend: DOMController,
	dom: 'header',
	
	init: function (opt) {
		this._super(opt);
		this.client = new LiteMQ.Client();
		this._addBusListeners();
	},

	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client.sub('popup-window-load', function () {
			that._addListeners();
		});
	},
	
	_addListeners: function () {
		var that = this;

		this.el().on('click', 'button#open-users', function () {
				that.client.pub('button-open-users-pressed');
			})
			.on('click', 'button#open-prefs', function () {
				that.client.pub('button-open-prefs-pressed');
			});
	}
});

var headerController = new HeaderController();
