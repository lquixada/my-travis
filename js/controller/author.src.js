AuthorController = o.Class({
	extend: Controller,
	dom: 'section#author',

	boot: function () {
		this._addListeners();
	},

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

authorController = new AuthorController();
