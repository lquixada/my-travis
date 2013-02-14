document.addEventListener('DOMContentLoaded', function () {
	formPrefs.addListeners();
	formPrefs.restoreData();
	formPrefs.disableFieldsTabIndex(true);

	formUsers.addListeners();

	projectController.render();
	projectController.addListeners();

	headerController.addListeners();
	authorController.addListeners();
});
