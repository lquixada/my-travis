FormController = o.clazz({
	extend: Controller,

	blockSubmit: function ( block ) {
		var type = (block?'button':'submit');

		this.el('button').setAttribute('type', type);
	},

	close: function () {
		this.el().className = '';
		this.disableFieldsTabIndex(true);
		this.setStatus('');
	},

	disableFieldsTabIndex: function ( disable ) {
		var fields = this.el().querySelectorAll('input, button');

		for (var i = 0; i < fields.length; i++) {
			if (disable) {
				fields[i].setAttribute('tabindex', '-1' );
			} else {
				fields[i].removeAttribute('tabindex' );
			}
		}
	},

	focus: function () {
		this.el().elements[0].focus(); 
		this.el().elements[0].select();
	},

	open: function () {
		this.el().className = 'opened';
		this.focus();
		this.disableFieldsTabIndex(false);
	},

	setStatus: function ( statusMsg ) {
		this.el('span.status').innerHTML = statusMsg;
	},

	toggle: function () {
		var opened = (this.el().className === 'opened');
		
		if (opened) {
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

		this.el().addEventListener('submit', function ( evt ) {
			var users, Updater = chrome.extension.getBackgroundPage().Updater;
			
			evt.preventDefault();

			Updater.stop();

			Prefs.addUser(this.user.value);

			that.showOverlay();
			that.blockSubmit(true);
			that.setStatus('<img src="imgs/loading.gif">');

			// Forces a request right away
			Updater.request({
				user: Prefs.get('users'),
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

	clear: function () {
		this.el().user.value = '';
	},

	close: function () {
		$('button#open-users').focus();

		this._super();
	},

	hideOverlay: function () {
		$('section#list div#overlay').style.display = 'none';
	},

	showOverlay: function () {
		$('section#list div#overlay').style.display = 'block';
	}
});

FormPrefsController = o.clazz({
	extend: FormController,
	dom: 'section#form-prefs form',
	
	addListeners: function () {
		var that = this;

		this.el().addEventListener('submit', function ( evt ) {
			var Updater = chrome.extension.getBackgroundPage().Updater;

			evt.preventDefault();

			Prefs.set('interval', this.interval.value || 60);
			Prefs.set('notifications', this.notifications.value || false);

			that.setStatus('saved');

			Updater.restart();

			setTimeout(function () {
				that.close();
			}, 1000);
		});
	},

	close: function () {
		$('button#open-prefs').focus();

		this._super();
	},

	restoreData: function () {
		var prefs = Prefs.get();
		
		this.el().interval.value = prefs.interval || '';
		this.el().notifications.value = prefs.notifications || '';
	}
});

formUsers = new FormUsersController();
formPrefs = new FormPrefsController();
