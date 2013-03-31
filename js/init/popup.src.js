/*globals formUsersController, formPrefsController, listController, authorController, headerController */

$(document).ready(function () {
	window.LiteMQ = chrome.extension.getBackgroundPage().LiteMQ;

	Badge.boot();
	formUsersController.boot();
	formPrefsController.boot();
	listController.boot();
	authorController.boot();
	headerController.boot();
});
