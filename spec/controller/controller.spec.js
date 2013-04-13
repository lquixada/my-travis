/*globals DOMController */

describe("DOM Controller", function() {
	it("should get main element", function() {
		var
			element = $('<div id="main"><p></p></div>'),
			controller = new DOMController({element:element});

		expect(controller.el().is('div#main')).toBe(true);
	});

	it("should get a descendant element", function() {
		var 
			element = $('<div id="main"><p></p></div>'),
			controller = new DOMController({element:element});

		expect(controller.el('p').size()).toBe(1);
	});
	
	it("should cache element", function() {
		var controller = new DOMController();
		
		spyOn(window, '$').andReturn({});

		controller.el();
		controller.el();

		expect(window.$.calls.length).toBe(1);
	});
});
