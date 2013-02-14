AuthorController = o.clazz({
	extend: Controller,
	dom: 'section#author',

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

authorController = new AuthorController();
