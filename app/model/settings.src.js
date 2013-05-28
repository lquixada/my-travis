var SettingsModel = Backbone.Model.extend({
	localStorage: new Backbone.LocalStorage('Settings'),
	
	defaults: {
		users: '',
		interval: 1,
		useNotifications: false
	},

	addUser: function (user) {
		var users = this.getUsers();

		if (users.indexOf(user)>-1) {
			return;
		}

		// Add to the front
		users.unshift(user.trim());

		this.setUsers(users);
	},

	getUsers: function () {
		return this.get('users') || [];
	},

	removeUser: function (user) {
		var users = this.getUsers();

		users = users.filter(function (element) {
			return (element !== user);
		});
	
		this.setUsers(users);
	},

	setUsers: function (users) {
		this.save('users', users);
	}
});

var Settings = new SettingsModel({id: 1});

Settings.fetch();
