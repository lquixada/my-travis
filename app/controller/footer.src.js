/*globals DOMController */

var FooterController = o.Class({
	extend: DOMController,
	dom: 'footer#main-footer',

	init: function (opt) {
		this._super(opt);
		this.client = new LiteMQ.Client({name: 'FooterController'});
		this._addBusListeners();
	},

	// private
	
	_addBusListeners: function () {
		var that = this;
		
		this.client.sub('popup-window-load', function () {
			that._addListeners();
		});
	},

	_addListeners: function () {
		var that = this;

		this.el('a#author').on('click', function (evt) {
				evt.preventDefault();
				that.client.pub('link-author-clicked');
			})
			.end()
			.find(':checkbox').on('click', function () {
				if ($(this).is(':checked')) {
					that.client.pub('checkbox-manage-checked');	
				} else {
					that.client.pub('checkbox-manage-unchecked');	
				}
			});
	}
});

var footerController = new FooterController();

