AuthorController = o.clazz({
	extend: Controller,
	dom: 'section#author',
	
	init: function () {
		var that = this;

		$(document).ready(function () {
			that.addListeners();
		});
	},

	addListeners: function () {
		var that = this;

		$('a#author').on('click', function (evt) {
			evt.preventDefault();
			that.show();
		});

		this.el().on('click', function () {
			that.hide();
		});

		this.el().on('click', 'div#card', function (evt) {
			evt.stopPropagation();
		});

		this.el().on('click', 'button#close', function () {
			that.hide();
		});
	},

	hide: function () {
		this.el().css('visibility', 'hidden');
	},

	show: function () {
		this.el().css('visibility', 'visible');
	} 
});

new AuthorController();
