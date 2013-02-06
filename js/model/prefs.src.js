Preferences = o.clazz({
	extend: Model,
	key: 'prefs',

	get: function (key) {
		var prefs = this._super() || {};
	 
		return key? prefs[key]: prefs;
	},

	set: function (attrKey, attrValue) {
		var prefs = this.get();
		
		prefs[attrKey] = attrValue;

		this._super(prefs);
	}
});

Prefs = new Preferences();
