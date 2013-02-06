Controller = o.clazz( {
	addListeners: function() {
		throw 'not implemented error';
	},

	el: function () {
		if (!this.element) {
			this.element = this.$(this.dom);
		}
		
		return this.element;
	},

	$: function (query) {
		return document.querySelector(query);
	}
});
