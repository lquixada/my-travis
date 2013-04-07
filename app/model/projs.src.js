/*globals ModelLocalStorage */

var Project = o.Class({
	extend: ModelLocalStorage,
	key: 'projs',

	convertAll: function (projs) {
		var that = this,
			tmp = {};

		projs.forEach(function (projOld) {
			var projNew = that.convertOnly(projOld),
				user = projNew.user;

			if (!tmp[user]) {
				tmp[user] = [];
			}

			tmp[user].push(projNew);
		});

		return tmp;
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

	removeUser: function (user) {
		var projs = this.get();

		delete projs[user];

		this.set(projs);
	},
	
	store: function (projs) {
		projs = this.convertAll(projs);

		this.set(projs);

		return projs;
	}
});

var Projs = new Project();
