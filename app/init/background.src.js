
window.client = new LiteMQ.Client();

$(document).ready(function () {
	window.client.pub('background-document-ready');
});
