
window.LiteMQ = chrome.extension.getBackgroundPage().LiteMQ;
window.client = new LiteMQ.Client();

// Must be window load due to the async iframe load
$(window).on('load', function () {
	client.pub('window-load');
});
