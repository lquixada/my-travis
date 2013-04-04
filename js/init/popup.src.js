/*globals formUsersController, formPrefsController, listController, authorController, headerController */

// Must be window.load due to the async iframe load
$(window).load(function () {
	window.LiteMQ = chrome.extension.getBackgroundPage().LiteMQ;

	Badge.boot();
	formUsersController.boot();
	formPrefsController.boot();
	listController.boot();
	authorController.boot();
	headerController.boot();
});
