
var FooterView = Backbone.View.extend({
	el: 'footer#main-footer',
	
	events: {
		'click a#author': '_publishAuthorClick',
		'click :checkbox': '_toggleEditMode'
	},
	
	initialize: function (opt) {
		this.client = new LiteMQ.Client({name: 'FooterController'});
	},

	// private

	_publishAuthorClick: function (evt) {
		evt.preventDefault();
		this.client.pub('link-author-clicked');
	},

	_toggleEditMode: function (evt) {
		var checkbox = $(evt.currentTarget);

		if (checkbox.is(':checked')) {
			this.client.pub('checkbox-manage-checked');	
		} else {
			this.client.pub('checkbox-manage-unchecked');	
		}
	}
});

$(document).ready(function () {
	new FooterView();
});


