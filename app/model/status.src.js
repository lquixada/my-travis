// Backbone

var StatusModel = Backbone.Model.extend({
	localStorage: new Backbone.LocalStorage('Statuses')
});

var Status = new StatusModel();

