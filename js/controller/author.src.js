AuthorController = o.clazz({
	extend: Controller,
	dom: 'section#author',

	addListeners: function () {
		var that = this;

		$('a#author').addEventListener('click', function (evt) {
			evt.preventDefault();
			that.show();
		});

		this.el('button#close').addEventListener('click', function () {
			that.hide();
		});

		this.el().addEventListener('click', function () {
			that.hide();
		});

		this.el('div#card').addEventListener('click', function (evt) {
			evt.stopPropagation();
		});
	},

	hide: function () {
		this.el().style.visibility = 'hidden';
	},

	show: function () {
		this.el().style.visibility = 'visible';
	} 
});

authorController = new AuthorController();
