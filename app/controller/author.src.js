/*globals DOMController */

var AuthorController = o.Class({
	extend: DOMController,
	dom: 'section#author',

	boot: function () {
		this._addListeners();
	},

	init: function (opt) {
		this._super(opt);
		this.client = new LiteMQ.Client({name: 'AuthorController'});

		this._addBusListeners();
	},

	// private
	_addBusListeners: function () {
		var that = this;
		
		this.client.sub('popup-window-load', function () {
				that._addListeners();
			})
			.sub('link-author-clicked', function () {
				that._show();	
			});
	},

	_addListeners: function () {
		var that = this;

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

new AuthorController();
