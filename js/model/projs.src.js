Project = o.clazz({
	extend: Model,
	key: 'projs',
	
	get: function () {
		return this._super() || [];
	},
	
	getSorted: function () {
		var projs = this.get();
			users = Prefs.get('user');

		users = users.split(/, */);

		// Convert indexed array to associative array
		users.forEach(function (val, i) {
			users[val] = i;
		});

		return projs.sort(function (a, b) {
			a = a.slug.split('/')[0];
			b = b.slug.split('/')[0];
			
			return (users[a] < users[b]? -1 : (users[a] > users[b]? 1 : 0));
		});
	},

	set: function (projs) {
		this._super(projs);
	}
});

Projs = new Project();
