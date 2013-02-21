Controller = o.Class( {
	addListeners: function () {
		throw 'not implemented error';
	},

	el: function () {
		if (!this.element) {
			this.element = $(this.dom);
		}
		
		return this.element;
	},
	
	render: function () {
		throw 'not implemented error';
	}
});
