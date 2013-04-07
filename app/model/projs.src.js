/*globals ModelLocalStorage */

var Project = o.Class({
	extend: ModelLocalStorage,
	key: 'projs',

	convertAll: function (projs) {
		return projs.map(function (proj) {
			return this.convertOnly(proj);
		}, this);
	},

	convertOnly: function (proj) {
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
		case 0:
			return 'passed';
		case 1:
			return 'failed';
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

	getFromUser: function (user) {
		var projs = this.get();

		return projs.filter(function (proj) {
			return (proj.user===user);
		});
	},

	removeUser: function (user) {
		var projs = this.get();

		projs = projs.filter(function (proj) {
			return (proj.user!==user);
		});

		this.set(projs);
	},
	
	store: function (projs) {
		projs = this.convertAll(projs);

		this.set(projs);

		return projs;
	}
});

var Projs = new Project();
