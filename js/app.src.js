var Service = o.Class( {
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


var Controller = o.Class( {
	render: function () {
		throw 'not implemented error';
	},

	// private

	_addListeners: function () {
		throw 'not implemented error';
	}
});


var DOMController = o.Class( {
	extend: Controller,

	el: function (q) {
		if (!this.element) {
			this.element = $(this.dom);
		}

		if (q) {
			return this.element.find(q);
		}

		return this.element;
	}
}); 


var Model = o.Class( {
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


var ModelLocalStorage = o.Class( {
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


var Source = o.Class({
	get: function () {
		throw 'not implemented error';
	}
});


var JSONSource = o.Class({
	extend: Source,
	url: '',

	get: function (url, onComplete) {
		$.getJSON(url, onComplete);
	}
});
