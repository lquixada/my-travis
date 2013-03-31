/*globals formUsersController, formPrefsController, listController, authorController, headerController */

$(document).ready(function () {
	window.LiteMQ = chrome.extension.getBackgroundPage().LiteMQ;

	formUsersController.boot();
	formPrefsController.boot();
	listController.boot();
	authorController.boot();
	headerController.boot();
});
