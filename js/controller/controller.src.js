Controller = o.clazz( {
	addListeners: function() {
		throw 'not implemented error';
	},

	el: function (query) {
		if (!this.element) {
			this.element = this.$(this.dom);
		}

		if (query) {
			return this.element.querySelector(query);
		}
		
		return this.element;
	},

	$: function (query) {
		return document.querySelector(query);
	}
});
