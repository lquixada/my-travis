
client = new LiteMQ.Client({name: 'PopupPage'});

// Must be window load due to the async iframe load
$(window).on('load', function () {
	client.pub('popup-window-load');

	chrome.runtime.onMessage.addListener(function (msg) {
		console.log('Runtime message delivered!');
		client.pub('request-done');
		console.log('---');
	});
});


