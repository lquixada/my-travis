$(document).ready(function () {
	var result;
	var type = document.location.search.slice(1);

	Notification = chrome.extension.getBackgroundPage().Notification;

	if (type==='passed') {
		passed = Notification.getResult().passed;
		len = passed.length;
	
		if (len>0) {
			$('h1').html(len+(len>1?' builds':' build')+' has been fixed.');
			$('span.status').addClass('passed');

			passed.forEach(function (proj) {
				$('ul').append('<li>'+proj+'</li>');
			});
		}

		return;
	}

	if (type==='failed') {
		failed = Notification.getResult().failed;
		len = failed.length;
	
		if (len>0) {
			$('h1').html(len+(len>1?' builds':' build')+' has failed.');
			$('span.status').addClass('failed');
			failed.forEach(function (proj) {
				$('ul').append('<li>'+proj+'</li>');
			});
		}

		return;
	}
});
