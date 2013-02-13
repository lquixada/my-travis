describe("List Controller", function() {
	describe("icons", function() {
		it("should get the passed icon", function() {
			var proj = {last_build_status: 0, last_build_finished_at: '2013-02-07T03:11:55Z'};

			expect(projectController.getIcon(proj)).toBe('<img class="icon-status" src="imgs/icon-passed.png" title="passed">');
		});

		it("should get the failed icon", function() {
			var proj = {last_build_status: 1, last_build_finished_at: '2013-02-07T03:11:55Z'};

			expect(projectController.getIcon(proj)).toBe('<img class="icon-status" src="imgs/icon-failed.png" title="failed">');
		});

		it("should get the started icon", function() {
			var proj = {last_build_status: null, last_build_finished_at: null};

			expect(projectController.getIcon(proj)).toBe('<img class="icon-status" src="imgs/icon-started.png" title="started">');
		});

		it("should get the errored icon", function() {
			var proj = {last_build_status: null, last_build_finished_at: '2013-02-07T03:11:55Z'};

			expect(projectController.getIcon(proj)).toBe('<img class="icon-status" src="imgs/icon-errored.png" title="errored">');
		});
	});

	describe("name", function() {
		it("should extract the name of the project", function() {
			var name = projectController.getName({slug: 'user/project'});

			expect(name).toBe('project');
		});
	});

	describe("clear", function() {
		beforeEach(function() {
			chrome = { browserAction: {} };
			chrome.browserAction.setBadgeText = function () {};
		});
			
		it("should clear the html", function() {
			var obj = {};

			spyOn(projectController, 'el').andReturn(obj);

			projectController.clear();

			expect(obj.innerHTML).toMatch(/id="no-projects"/);
		});

		it("should remove badge", function() {
			spyOn(chrome.browserAction, 'setBadgeText'); 
			spyOn(projectController, 'el').andReturn({});

			projectController.clear();

			expect(chrome.browserAction.setBadgeText).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeText.calls[0].args[0]).toBeJson({text: ''});
		});
	});
});

