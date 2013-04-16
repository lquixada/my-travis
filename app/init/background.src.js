var client = new LiteMQ.Client({name: 'BackgroundPage'});

client.sub('request-done', function () {
	var id = chrome.runtime.id;
	chrome.runtime.sendMessage(id, 'request-done');

	console.log('Runtime message sent!');
	console.log('---');
});

chrome.runtime.onInstalled.addListener(function () {
	chrome.alarms.create('travisapi', {periodInMinutes:1/2});	

	client.pub('update-requested');
});

chrome.alarms.onAlarm.addListener(function (alarm) {
	if (alarm && alarm.name === 'travisapi') {
		client.pub('update-requested');
	}
});
