describe("List Controller", function() {
	describe("icons", function() {
		it("should get the passed icon", function() {
			var proj = {status: 0, finishedAt: '2013-02-07T03:11:55Z'};

			expect(projectController.getIcon(proj)).toBe('<img class="icon-status" src="imgs/icon-passed.png" title="passed">');
		});

		it("should get the failed icon", function() {
			var proj = {status: 1, finishedAt: '2013-02-07T03:11:55Z'};

			expect(projectController.getIcon(proj)).toBe('<img class="icon-status" src="imgs/icon-failed.png" title="failed">');
		});

		it("should get the started icon", function() {
			var proj = {status: null, finishedAt: null};

			expect(projectController.getIcon(proj)).toBe('<img class="icon-status" src="imgs/icon-started.png" title="started">');
		});

		it("should get the errored icon", function() {
			var proj = {status: null, finishedAt: '2013-02-07T03:11:55Z'};

			expect(projectController.getIcon(proj)).toBe('<img class="icon-status" src="imgs/icon-errored.png" title="errored">');
		});
	});

	describe("clear", function() {
		beforeEach(function() {
			chrome = { browserAction: {} };
			chrome.browserAction.setBadgeText = function () {};
		});
			
		it("should clear the html", function() {
			var table = document.createElement('table');

			spyOn(projectController, 'el').andReturn(table);

			projectController.clear();

			expect(table.innerHTML).toMatch(/id="no-projects"/);
		});

		it("should remove badge", function() {
			var table = document.createElement('table');
			spyOn(chrome.browserAction, 'setBadgeText'); 
			spyOn(projectController, 'el').andReturn(table);

			projectController.clear();

			expect(chrome.browserAction.setBadgeText).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeText.calls[0].args[0]).toBeJson({text: ''});
		});
	});
});

