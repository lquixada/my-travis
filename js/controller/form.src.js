FormController = o.clazz({
	extend: Controller,

	blockSubmit: function ( enable ) {
		var type = (enable?'button':'submit');

		this.el().find('button').attr('type', type);
	},

	close: function () {
		this.el().removeClass('opened');
		this.setStatus('');
		this.disableFieldsTabIndex();
	},
	
	disableFieldsTabIndex: function () {
		this.el().find(':input').attr('tabindex', '-1' );	
	},

	enableFieldsTabIndex: function () {
		this.el().find(':input').removeAttr('tabindex');
	},

	focus: function () {
		this.el().find(':input:first').get(0).focus(); 
	},

	getUpdater: function () {
		return chrome.extension.getBackgroundPage().Updater;
	},

	open: function () {
		this.el().addClass('opened');
		this.focus();
		this.enableFieldsTabIndex();
	},

  setStatus: function (msg) {
    this.el().find('span.status').html(msg);
	},

	toggle: function () {
		if (this.el().is('.opened')) {
			this.close();
		} else {
			this.open();
		}
	}
});


FormUsersController = o.clazz({
	extend: FormController,
	dom: 'section#form-user form',
	
	addListeners: function () {
		var that = this;

		this.el().on('submit', function ( evt ) {
			var users, Updater = that.getUpdater();
			
			evt.preventDefault();

			Updater.stop();

			Prefs.addUser(this.user.value);

			that.showOverlay();
			that.blockSubmit(true);
			that.setStatus('<img src="imgs/loading.gif">');

			// Forces a request right away
			Updater.request({
				users: Prefs.getUsers(),
				onComplete: function () {
					that.clear();
					that.hideOverlay();
					that.blockSubmit(false);
					that.setStatus('saved');

					Updater.restart();

					setTimeout(function () {
						that.close();
					}, 1000);
				}
			});
		});
	},

	boot: function () {
		this.addListeners();
	  this.disableFieldsTabIndex();	
	},

	clear: function () {
		this.el().find(':input[name=user]').val('');
	},

	close: function () {
		$('header button#open-users').focus();

		this._super();
	},

	hideOverlay: function () {
		$('section#list div#overlay').hide();
	},

	showOverlay: function () {
		$('section#list div#overlay').show();
	}
});

formUsersController = new FormUsersController();


FormPrefsController = o.clazz({
	extend: FormController,
	dom: 'section#form-prefs form',
	
	addListeners: function () {
		var that = this;

		this.el().on('submit', function (evt) {
			var Updater = that.getUpdater();

			evt.preventDefault();

			Prefs.set('interval', this.interval.value || 60);
			//Prefs.set('notifications', this.notifications.value || false);

			that.setStatus('saved');

			Updater.restart();

			setTimeout(function () {
				that.close();
			}, 1000);
		});
	},

	boot: function() {
		this.addListeners();
		this.restoreData();
		this.disableFieldsTabIndex();
	},

	close: function () {
		$('header button#open-prefs').focus();

		this._super();
	},

	restoreData: function () {
		var prefs = Prefs.get();
		
		this.el().find(':input[name=interval]').val(prefs.interval || '');
		//this.el().find(':input[name=notifications]').val(prefs.notifications || '');
	}
});

formPrefsController = new FormPrefsController();
