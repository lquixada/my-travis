/*globals DOMController */

var ListController = o.Class({
	extend: DOMController,
	dom: 'section#list',
	
	init: function (opt) {
		this._super(opt);
		this.client = new LiteMQ.Client({name: 'ListController'});
		this._addBusListeners();
	},

	render: function () {
		var users = Prefs.getUsers();

		if (users.length===0) {
			this.client.pub('project-list-cleared');
		}

		// In order to overcome the chrome's security policies
		// about the eval() usage, we're using a sandboxed page
		// as specified on:
		//   http://developer.chrome.com/apps/sandboxingEval.html
		this._requestTemplate();
	},

	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client.sub('popup-window-load', function () {
				that.render();
				that._addListeners();	
			})
			.sub('form-users-submitted', function () {
				that._lock();
			})
			.sub('request-travisapi-done', function () {
				that.render();
				that._unlock();
			});

		$(window).on('message', function (evt) {
			var html = evt.originalEvent.data.html;
			that._renderTemplate(html);
		});	
	},
	
	_addListeners: function() {
		var that = this;

		this.el().on('click', 'tr', function () {
				var url = this.getAttribute('href');

				if (url) {
					window.open(url);
				}
			})
			.on('click', 'button.remove', function () {
				that._showDialog(this);
			})
			.on('click', 'span.option.yes', function () {
				var user = $(this).parent().attr('user');
				
				Prefs.removeUser(user);
				Projs.removeUser(user);

				that.client.pub('button-yes-clicked');

				that.render();
			})
			.on('click', 'span.option.no', function () {
				that._hideDialog(this);
			});
	},

	_hideDialog: function (spanNo) {
		$(spanNo).parent().removeClass('visible');
	},

	_lock: function () {
		this.el().find('div#overlay').show();
	},

	_renderTemplate: function (html) {
		this.el('ul').html(html);
	},

	_requestTemplate: function () {
		var iwindow = $('iframe#templates').get(0).contentWindow;

		iwindow.postMessage({
			context: {users: Projs.get()}
		}, '*');
	},

	_showDialog: function (button) {
		$(button).next().toggleClass('visible');
	},

	_unlock: function () {
		this.el().find('div#overlay').hide();
	}
});

var listController = new ListController();
