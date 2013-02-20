$(document).ready(function () {
	var type = document.location.search.slice(1);
	var Notification = chrome.extension.getBackgroundPage().Notification;
	var result = Notification.getResult();
	var slugs = result[type];
	var len = slugs.length;
	
	if (type==='passed') {
		msg = ' has been fixed';
	}

	if (type==='failed') {
		msg = ' has failed';
	}

	$('h1').html(len+' build'+(len>1?'s':'')+msg);
	$('span.status').addClass(type);
	$('ul').append(slugs.map(function (slug) {
		return '<li>'+slug+'</li>';
	}));
});
