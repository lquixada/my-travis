var AuthorView = Backbone.View.extend({
	el: 'section#author',

	events: {
		'click': '_hide',
		'click div#card': 'stopPropagation',
		'click button#close': '_hide'
	},

	initialize: function () {
		this.client = new LiteMQ.Client({name: 'AuthorController'});

		this._addBusListeners();
	},

	// private
	_addBusListeners: function () {
		var that = this;
		
		this.client
			//.sub('popup-window-load', function () {
				//new AuthorView();
			//})
			.sub('link-author-clicked', function () {
				that._show();	
			});
	},

	_hide: function () {
		this.$el.css('visibility', 'hidden');
	},

	_show: function () {
		this.$el.css('visibility', 'visible');
	},

	stopPropagation: function (evt) {
		evt.stopPropagation();
	}
});

$(document).ready(function () {
	new AuthorView();
});
