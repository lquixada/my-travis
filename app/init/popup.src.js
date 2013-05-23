var client = new LiteMQ.Client({name: 'PopupPage'});

// Must be window load due to the async iframe load
$(window).on('load', function () {
	client.pub('popup-window-load');

	chrome.runtime.onMessage.addListener(function (msg) {
		console.log(new Date());
		client.pub('request-done');
		console.log('---');
	});
});


