Model = o.clazz( {
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
