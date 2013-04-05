/*globals DOMController */

var AuthorController = o.Class({
	extend: DOMController,
	dom: 'section#author',

	boot: function () {
		this._addListeners();
	},

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

		$('a#author').on('click', function (evt) {
			evt.preventDefault();
			that._show();
		});

		this.el().on('click', function () {
				that._hide();
			})
			.on('click', 'div#card', function (evt) {
				evt.stopPropagation();
			})
			.on('click', 'button#close', function () {
				that._hide();
			});
	},

	_hide: function () {
		this.el().css('visibility', 'hidden');
	},

	_show: function () {
		this.el().css('visibility', 'visible');
	} 
});

var authorController = new AuthorController();
