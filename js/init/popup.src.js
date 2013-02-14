$(document).ready(function () {
	formPrefs.addListeners();
	formPrefs.restoreData();
	formPrefs.disableFieldsTabIndex();

	formUsers.addListeners();

	projectController.render();
	projectController.addListeners();

	headerController.addListeners();
	authorController.addListeners();
});
