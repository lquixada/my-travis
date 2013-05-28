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
			.sub('request-done', function () {
				that.render();
				that._unlock();

				console.log('List rerendered!');
			})
			.sub('checkbox-manage-checked', function () {
				that._enableReorder();
			})
			.sub('checkbox-manage-unchecked', function () {
				that._disableReorder();
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
			.on('keydown', 'tr', function (evt) {
				if (evt.which === 13) {
					$(this).click();
				}
			})
			.on('click', 'button.remove', function () {
				that._showDialog(this);
			})
			.on('click', 'span.option.yes', function () {
				var li = $(this).closest('li'),
					user = li.attr('user');
				
				Prefs.removeUser(user);
				Projects.removeByUser(user);

				that.client.pub('user-removed');

				li.animate({height: 'toggle', opacity: 'toggle'}, 'normal');
			})
			.on('click', 'span.option.no', function () {
				that._hideDialog(this);
			});
	},

	_collapseList: function () {
		this.el('li').each(function () {
			var li = $(this);

			li.data('old-height', li.height())
				.animate({height:26})
				.find('span.user-removal')
				.show()
				.end()
				.find('img.user-grip')
				.show()
				.animate({opacity:0.5});
		});
	},

	_disableReorder: function () {
		this.client.enable('request-done');

		this._expandList();
		this._disableSorting();
	},

	_disableSorting: function () {
		this.el('ul').sortable('destroy');
	},

	_enableReorder: function () {
		this.client.disable('request-done');

		this._collapseList();
		this._enableSorting();
	},

	_enableSorting: function () {
		var that = this;

		this.el('ul').sortable({
			cursor: '-webkit-grabbing',
			placeholder: 'ui-state-highlight',
			stop: function () {
				var users = that._grepUsersOrder();

				Prefs.set('users', users.join(','));
			}
		});
	},

	_expandList: function () {
		this.el('li').each(function () {
			var li = $(this);

			li.animate({height:li.data('old-height')})
				.find('span.user-removal')
				.hide()
				.end()
				.find('img.user-grip')
				.animate({opacity:0}, function () {
					$(this).hide();
				});
		});	
	},

	_grepUsersOrder: function () {
		var users = [];

		this.el('li').each(function () {
			users.push($(this).attr('user'));
		});

		return users;
	},

	_hideDialog: function (spanNo) {
		$(spanNo).parent().removeClass('visible');
	},

	_lock: function () {
		this.el('div#overlay').show();
	},

	_renderTemplate: function (html) {
		this.el('ul').html(html);
	},

	_requestTemplate: function () {
		var
			ordered = [],
			users = Prefs.getUsers(),
			iwindow = $('iframe#templates').get(0).contentWindow;

		users.forEach(function (user) {
			var projects = Projects.findByUser(user);

			projects = projects.map(function (item) {
				return item.attributes;
			});

			ordered.push({user:user, projs:projects});
		});

		iwindow.postMessage({context: ordered}, '*');
	},

	_showDialog: function (button) {
		$(button).next().toggleClass('visible');
	},

	_unlock: function () {
		this.el('div#overlay').hide();
	}
});

new ListController();
