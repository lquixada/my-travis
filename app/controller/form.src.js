/*globals DOMController */

var FormController = o.Class({
	extend: DOMController,

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

	init: function (opt) {
		this._super(opt);
		this.client = new LiteMQ.Client({name:'FormUsersController'});
		this._addBusListeners();
	},
	
	// private
	_addBusListeners: function () {
		var that = this;

		this.client.sub('popup-window-load', function () {
				that._addListeners();
				that._disableFieldsTabIndex();	
			})
			.sub('button-open-users-pressed', function () {
				that.toggle();
			})
			.sub('button-open-prefs-pressed', function () {
				that.close();
			})
			.sub('form-submit-done', function () {
				that._unlock();

				setTimeout(function () {
					that.close();
				}, 1000);	
			})
			.sub('checkbox-manage-checked', function () {
				that.el(':input').attr('disabled', 'true');
			})
			.sub('checkbox-manage-unchecked', function () {
				that.el(':input').removeAttr('disabled');
			});
	},
	
	_addListeners: function () {
		var that = this;

		this.el().on('submit', function (evt) {
			var users;

			evt.preventDefault();

			users = this.user.value.split(',');

			users.reverse().forEach(function (user) {
				Prefs.addUser(user);
			});

			that.client.pub('form-users-submitted');

			that._lock();
		});
	},

	_clear: function () {
		this.el().find(':input[name=user]').val('');
	},

	_lock: function () {
		this._blockSubmit(true);
		this._setStatus('<img src="../imgs/loading.gif">');
	},

	_unlock: function () {
		this._clear();
		this._blockSubmit(false);
		this._setStatus('saved');
	}
});

new FormUsersController();


var FormPrefsController = o.Class({
	extend: FormController,
	dom: 'section#form-prefs form',

	init: function (opt) {
		this._super(opt);
		this.client = new LiteMQ.Client({name: 'FormPrefsController'});
		this._addBusListeners();
	},

	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client.sub('popup-window-load', function () {
				that._addListeners();
				that._disableFieldsTabIndex();		
				that._restoreData();
			})
			.sub('button-open-users-pressed', function () {
				that.close();
			})
			.sub('button-open-prefs-pressed', function () {
				that.toggle();
			});
	},
	
	_addListeners: function () {
		var that = this;

		this.el().on('submit', function (evt) {
			evt.preventDefault();

			Prefs.set('interval', this.interval.value || 1);
			Prefs.set('notifications', this.notifications.checked || false);

			that._setStatus('saved');

			that.client.pub('form-prefs-submitted');

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

new FormPrefsController();
