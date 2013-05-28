var ProjectModel = Backbone.Model.extend({
		defaults: {
			user: 'not specified',
			name: 'not specified',
			description: 'not specified',
			build: 0,
			status: '',
			duration: 0,
			finishedAt: ''
		}
	}, {
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
		}
});

var ProjectsCollection = Backbone.Collection.extend({
	model: ProjectModel,
	localStorage: new Backbone.LocalStorage("Projects"),
	
	destroy: function () {
		var len = this.length;

		for (var i = len-1; i >= 0; i--) {
			this.at(i).destroy();
		} 
	},

	findByUser: function (user) {
		return this.where({user:user});
	},
	
	removeByUser: function (user) {
		var projs = this.findByUser(user);

		projs.forEach(function (model) {
			model.destroy();
		});
	},
	
	save: function () {
		this.each(function(model) {
			model.save();
		});
	}
});


var Projects = new ProjectsCollection();

Projects.fetch();
