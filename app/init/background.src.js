var client = new LiteMQ.Client({name: 'BackgroundPage'});

client.sub('request-done', function () {
	var id = chrome.runtime.id;
	chrome.runtime.sendMessage(id, 'request-done');

	console.log('Runtime message sent!');
	console.log('---');
});

chrome.runtime.onInstalled.addListener(function () {
	client.pub('extension-installed');
});

$(document).on('ready', function () {
	client.pub('background-document-ready');
});


