document.addEventListener('DOMContentLoaded', function () {
	formController.addListeners();
	formController.restoreData();
	formController.disableFieldsTabIndex(true);

	projectController.addListeners();
	projectController.render();

	headerController.addListeners();
	authorController.addListeners();
});

