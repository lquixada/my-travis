Project = o.clazz({
	extend: Model,
	key: 'projs',
	
	get: function () {
		return this._super() || [];
	},

	set: function (projs) {
		this._super(projs);
	}
});

Projs = new Project();
