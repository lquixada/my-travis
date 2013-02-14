Project = o.clazz({
	extend: Model,
	key: 'projs',

	convert: function (proj) {
		return {
			user: proj.slug.split('/')[0],
			name: proj.slug.split('/')[1],
			description: proj.description,
			build: proj.last_build_number,
			status: this.convertStatus(proj),
			duration: proj.last_build_duration,
			finishedAt: proj.last_build_finished_at
		};
	},

	convertStatus: function (proj) {
		switch (proj.last_build_status) {
			case 0: return 'passed';
			case 1: return 'failed';
			default:
		    if (proj.last_build_finished_at) {
					return 'errored';
				} else {
					return 'started';
				}
		}	
	},
	
	get: function () {
		return this._super() || [];
	},
	
	store: function (projs) {
		var that = this,
			tmp = {};

		projs.forEach(function (projOld) {
			var projNew = that.convert(projOld),
				user = projNew.user;

			if (!tmp[user]) {
				tmp[user] = [];
			}

			tmp[user].push(projNew);
		});

		this.set(tmp);

		return tmp;
	}
});

Projs = new Project();
