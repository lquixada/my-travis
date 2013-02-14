describe("List Controller", function() {
	describe("clear", function() {
		beforeEach(function() {
			chrome = { browserAction: {} };
			chrome.browserAction.setBadgeText = function () {};
		});
			
		it("should clear the html", function() {
			var table = $('<table></table>');

			spyOn(listController, 'el').andReturn(table);

			listController.clear();

			expect(table.find('#no-projects').length).toBe(1);
		});

		it("should remove badge", function() {
			var table = $('<table></table>');

			spyOn(chrome.browserAction, 'setBadgeText'); 
			spyOn(listController, 'el').andReturn(table);

			listController.clear();

			expect(chrome.browserAction.setBadgeText).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeText.calls[0].args[0]).toBeJson({text: ''});
		});
	});
});

