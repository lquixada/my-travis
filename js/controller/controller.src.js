Controller = o.clazz( {
	addListeners: function() {
		throw 'not implemented error';
	},

	el: function () {
		if (!this.element) {
			this.element = $(this.dom);
		}
		
		return this.element;
	}
});
