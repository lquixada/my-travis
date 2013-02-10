FormController = o.clazz({
	extend: Controller,
	dom: 'form',

	addListeners: function () {
		var that = this;

		this.el().addEventListener('submit', function ( evt ) {
			var Updater = chrome.extension.getBackgroundPage().Updater;
			
			evt.preventDefault();

			Updater.stop();

			Prefs.set('interval', this.interval.value || '60');
			Prefs.set('user', this.user.value);

			if (this.user.value) {
				that.showOverlay();
				that.blockSubmit(true);
				that.setStatus('<img src="imgs/loading.gif">');

				Updater.request({
					user: this.user.value,
					onComplete: function () {
						that.hideOverlay();
						that.blockSubmit(false);
						that.setStatus('saved');

						Updater.start();

						setTimeout(function () {
							that.close();
						}, 1000);
					}
				});
			} else {
				Projs.clear();
				projectController.clear();
				
				that.setStatus('saved!');

				setTimeout(function () {
					that.close();
				}, 1000);
			}
		});
	},

	blockSubmit: function ( block ) {
		var type = (block?'button':'submit');
		$('button#save-prefs').setAttribute('type', type);
	},

	close: function () {
		$('button#open-prefs').focus();

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

	hideOverlay: function () {
		$('div#overlay').style.display = 'none';
	},

	open: function () {
		this.el().className = 'opened';
		this.focus();
		this.disableFieldsTabIndex(false);
	},

	restoreData: function () {
		var prefs = Prefs.get();

		this.el().user.value = prefs.user || '';
		this.el().interval.value = prefs.interval || '';
	},

	setStatus: function ( statusMsg ) {
		$('span#save-status').innerHTML = statusMsg;
	},

	showOverlay: function () {
		$('div#overlay').style.display = 'block';
	},

	toggle: function () {
		var opened = (this.el().className === 'opened');
		
		if (!opened) {
			this.open();
		} else {
			this.close();
		}
	}
});

formController = new FormController();
