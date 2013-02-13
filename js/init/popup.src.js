document.addEventListener('DOMContentLoaded', function () {
	formPrefs.addListeners();
	formPrefs.restoreData();
	formPrefs.disableFieldsTabIndex(true);

	formUsers.addListeners();

	projectController.addListeners();
	projectController.render();

	headerController.addListeners();
	authorController.addListeners();
});
