
window.client = new LiteMQ.Client();

$(document).ready(function () {
	client.pub('background-document-ready');
});
