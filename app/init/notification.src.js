var client = new LiteMQ.Client({name: 'NotificationPage'});

$(document).ready(function () {
	var type = document.location.search.slice(1);

	client.pub('notification-document-ready', type);
});
