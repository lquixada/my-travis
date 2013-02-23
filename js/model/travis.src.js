TravisAPISource = o.Class({
	extend: JSONSource,
	
	url: 'https://api.travis-ci.org/repos',

	getURL: function (users) {
		users = '?owner_name[]='+users.join('&owner_name[]=');

		return this.url+users;
	},

	get: function (users, onComplete) {
		this._super(this.getURL(users), onComplete);
	}
});


TravisAPI = new TravisAPISource();
