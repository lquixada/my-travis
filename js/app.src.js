Service = o.Class( {
	restart: function() {
		throw 'not implemented error';
	},
	
	start: function() {
		throw 'not implemented error';
	},

	stop: function() {
		throw 'not implemented error';
	}
});


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


Model = o.Class( {
	clear: function () {
		throw 'not implemented error';
	},

	get: function () {
		throw 'not implemented error';
	},

	set: function (value) {
		throw 'not implemented error';
	}
});


ModelLocalStorage = o.Class( {
	extend: Model,
	
	clear: function () {
		delete localStorage[this._getKey()];
	},

	get: function () {
		var value = localStorage[this._getKey()];
		return (value? JSON.parse(value): null);
	},

	set: function (value) {
		localStorage[this._getKey()] = JSON.stringify(value);
	},
	
	// private
	
	_getKey: function () {
		if (!this.key) {
			throw 'key not specified error.';
		}

		return this.key;
	}
});


