/*globals DOMController */

var AuthorController = o.Class({
	extend: DOMController,
	dom: 'section#author',

	boot: function () {
		this._addListeners();
	},

	// private

	_addListeners: function () {
		var that = this;

		$('a#author').on('click', function (evt) {
			evt.preventDefault();
			that._show();
		});

		this.el().on('click', function () {
			that._hide();
		});

		this.el().on('click', 'div#card', function (evt) {
			evt.stopPropagation();
		});

		this.el().on('click', 'button#close', function () {
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