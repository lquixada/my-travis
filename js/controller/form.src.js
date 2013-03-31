/*globals DOMController, Prefs */

var FormController = o.Class({
	extend: DOMController,

	boot: function () {
		this._addListeners();
		this._disableFieldsTabIndex();	
	},

	close: function () {
		this.el().removeClass('opened');
		this._setStatus('');
		this._disableFieldsTabIndex();
	},

	open: function () {
		this.el().addClass('opened');
		this._focus();
		this._enableFieldsTabIndex();
	},

	toggle: function () {
		if (this.el().is('.opened')) {
			this.close();
		} else {
			this.open();
		}
	},

	// private

	_blockSubmit: function ( enable ) {
		var type = (enable?'button':'submit');

		this.el().find('button').attr('type', type);
	},
	
	_disableFieldsTabIndex: function () {
		this.el().find(':input').attr('tabindex', '-1');	
	},

	_enableFieldsTabIndex: function () {
		this.el().find(':input').removeAttr('tabindex');
	},

	_focus: function () {
		this.el().find(':input:first').get(0).focus(); 
	},

	_setStatus: function (msg) {
		this.el().find('span.status').html(msg);
	}
});


var FormUsersController = o.Class({
	extend: FormController,
	dom: 'section#form-user form',

	close: function () {
		$('header button#open-users').focus();

		this._super();
	},
	
	// private
	
	_addListeners: function () {
		var that = this,
			client = new LiteMQ.Client();

		client.sub('button-open-users-pressed', function () {
			that.toggle();
		});
		
		client.sub('button-open-prefs-pressed', function () {
			that.close();
		});

		client.sub('request-travisapi-done', function () {
			that._unlock();

			setTimeout(function () {
				that.close();
			}, 1000);	
		});

		this.el().on('submit', function (evt) {
			evt.preventDefault();

			Prefs.addUser(this.user.value);

			client.pub('form-users-submitted');

			that._lock();
		});
	},

	_clear: function () {
		this.el().find(':input[name=user]').val('');
	},

	_hideOverlay: function () {
		$('section#list div#overlay').hide();
	},

	_lock: function () {
		this._showOverlay();
		this._blockSubmit(true);
		this._setStatus('<img src="../imgs/loading.gif">');
	},

	_showOverlay: function () {
		$('section#list div#overlay').show();
	},

	_unlock: function () {
		this._clear();
		this._hideOverlay();
		this._blockSubmit(false);
		this._setStatus('saved');
	}
});

var formUsersController = new FormUsersController();


var FormPrefsController = o.Class({
	extend: FormController,
	dom: 'section#form-prefs form',

	boot: function() {
		this._super();
		this._restoreData();
	},

	close: function () {
		$('header button#open-prefs').focus();

		this._super();
	},

	// private
	
	_addListeners: function () {
		var that = this,
			client = new LiteMQ.Client();
		
		client.sub('button-open-users-pressed', function () {
			that.close();
		});
		
		client.sub('button-open-prefs-pressed', function () {
			that.toggle();
		});

		this.el().on('submit', function (evt) {
			evt.preventDefault();

			Prefs.set('interval', this.interval.value || 60);
			Prefs.set('notifications', this.notifications.checked || false);

			that._setStatus('saved');

			client.pub('form-prefs-submitted');

			setTimeout(function () {
				that.close();
			}, 1000);
		});
	},

	_restoreData: function () {
		var prefs = Prefs.get();
		
		this.el().find(':input[name=interval]').val(prefs.interval || '');
		this.el().find(':input[name=notifications]').attr('checked', prefs.notifications || false);
	}
});

var formPrefsController = new FormPrefsController();
