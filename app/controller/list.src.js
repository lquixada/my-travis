/*globals DOMController, Prefs, Projs, Badge, moment, formatSecs */

var ListController = o.Class({
	extend: DOMController,
	dom: 'section#list',
	
	init: function (opt) {
		this._super(opt);
		this.client = new LiteMQ.Client();
		this._addBusListeners();
	},

	render: function () {
		var users = Prefs.getUsers();

		if (users.length===0) {
			this._clear();
			return;
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
		});

		this.client.sub('form-users-submitted', function () {
			that._lock();
		});
		
		this.client.sub('request-travisapi-done', function () {
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

		this.el('table').on('click', 'tr', function () {
			var url = this.getAttribute('href');

			if (url) {
				window.open(url);
			}
		});

		this.el('table').on('click', 'button.remove', function () {
			var button = $(this);

			if (!button.next().is('.confirm')) {
				button.after([
					'<span class="confirm">',
					'are you sure?',
					'<span class="option yes">yes</span>',
					'<span class="option no">no</span>',
					'</span>'
				].join(''));
			}

			// Without setTimeout, transition does not work
			setTimeout(function () {
				button.next().toggleClass('visible');
			}, 100);
		});

		this.el('table').on('click', 'span.option.yes', function () {
			var tbody = $(this).closest('tbody'),
				user = tbody.attr('user');
			
			Prefs.removeUser(user);
			Projs.removeUser(user);

			Badge.update(Projs.get());

			that.render();
		});

		this.el('table').on('click', 'span.option.no', function () {
			$(this).parent().removeClass('visible');
		});
	},

	_clear: function () {
		this._remove();
		this._showMessage();

		Badge.clear();
	},

	_lock: function () {
		this.el().find('div#overlay').show();
	},

	_remove: function () {
		this.el('table').find('tbody').remove();
	},

	_renderTemplate: function (html) {
		this._remove();

		this.el('table').append(html);
	},

	_requestTemplate: function () {
		var iwindow = $('iframe#templates').get(0).contentWindow;

		iwindow.postMessage({
			context: {users: Projs.get()}
		}, '*');
	},

	_showMessage: function () {
		this.el('table').append([
			'<tr>',
			'<td class="message" colspan="6">',
			'<div id="no-projects">No project has been added until now.</div>',
			'</td>',
			'</tr>'
		].join(''));
	},

	_unlock: function () {
		this.el().find('div#overlay').hide();
	}
});

var listController = new ListController();
