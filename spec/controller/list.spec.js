/*globals listController */

// TODO: Redo specs
describe("List Controller", function() {
	beforeEach(function() {
		$.fx.off = true;
	});
	
	it("should be on reorder mode", function() {
		var
			element = $('<section><ul><li></li></ul></section>'),
			listController = new ListController({element: element});

		listController.reorder();

		expect(listController.el('li').height()).toBe(26);	
	});

	describe("clear", function() {
		beforeEach(function() {
			chrome = {
				browserAction: jasmine.createSpyObj('browserAction', ['setBadgeText'])
			};
		});	
			
		xit("should clear the html", function() {
			var table = $('<table></table>');

			spyOn(listController, 'el').andReturn(table);

			listController._clear();

			expect(table.find('#no-projects').length).toBe(1);
		});

		xit("should remove badge", function() {
			var table = $('<table></table>');

			spyOn(chrome.browserAction, 'setBadgeText'); 
			spyOn(listController, 'el').andReturn(table);

			listController._clear();

			expect(chrome.browserAction.setBadgeText).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeText.calls[0].args[0]).toBeSameJsonAs({text: ''});
		});
	});
});

