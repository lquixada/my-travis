/*globals DOMController */

var FormController = o.Class({
	extend: DOMController,

	close: function () {
		this.el('form').removeClass('opened');
		this._setStatus('');
		this._disableFieldsTabIndex();
	},

	open: function () {
		this.el('form').addClass('opened');
		this._focus();
		this._enableFieldsTabIndex();
	},

	toggle: function () {
		if (this.el('form').is('.opened')) {
			this.close();
		} else {
			this.open();
		}
	},

	// private

	_disableFieldsTabIndex: function () {
		this.el(':input').attr('tabindex', '-1');	
	},

	_enableFieldsTabIndex: function () {
		this.el(':input').removeAttr('tabindex');
	},

	_focus: function () {
		this.el(':input:first').get(0).focus(); 
	},

	_setStatus: function (msg) {
		this.el('span.status').html(msg);
	}
});


var FormUsersController = o.Class({
	extend: FormController,
	dom: 'section#form-user',

	close: function () {
		this._enableInputs();
		this._clear();
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
				that._disableInputs();
			})
			.sub('checkbox-manage-unchecked', function () {
				that._enableInputs();
			});
	},
	
	_addListeners: function () {
		var that = this;

		this.el('form').on('submit', function (evt) {
			var users;

			evt.preventDefault();

			users = this.user.value.split(',');
			users.reverse().forEach(function (user) {
				Prefs.addUser(user);
			});

			that._lock();
			that.client.pub('form-users-submitted');
		});
	},

	_clear: function () {
		this.el(':input[name=user]').val('');
	},

	_disableInputs: function () {
		this.el(':input').attr('disabled', 'true');	
	},

	_enableInputs: function () {
		this.el(':input').removeAttr('disabled');	
	},

	_lock: function () {
		this._disableInputs();
		this._setStatus('<img src="../imgs/loading.gif">');
	},

	_unlock: function () {
		this._setStatus('saved');
	}
});

new FormUsersController();


var FormPrefsController = o.Class({
	extend: FormController,
	dom: 'section#form-prefs',

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

		this.el('form').on('submit', function (evt) {
			evt.preventDefault();

			Prefs.set('intervalMin', this.interval.value || 1);
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
		
		this.el(':input[name=interval]').val(prefs.intervalMin || 1);
		this.el(':input[name=notifications]').attr('checked', prefs.notifications || false);
	}
});

new FormPrefsController();
