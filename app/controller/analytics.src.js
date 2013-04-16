/*globals DOMController */

var AnalyticsController = o.Class({
	extend: DOMController,

	init: function () {
		var that = this;

		this.client = new LiteMQ.Client({name: 'AnalyticsController'});
		this.client.sub('popup-window-load', function () {
			that._addAnalyticsTag();
		});
	},

	_addAnalyticsTag: function () {
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-38205716-1']);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = 'https://ssl.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();
	}
});

new AnalyticsController();

