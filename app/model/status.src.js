/*globals ModelLocalStorage */

var StatusModel = o.Class({
	extend: ModelLocalStorage,
	key: 'statuses',

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

var Status = new StatusModel();

