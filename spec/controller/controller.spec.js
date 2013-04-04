/*globals DOMController */

describe("DOMController", function() {
	it("should get main element", function() {
		var controller = new DOMController();
		controller.dom = 'body';

		expect(controller.el().get(0)).toBe(document.body);
	});

	it("should get a descendant element", function() {
		var controller = new DOMController();
		controller.element = $('<div><p></p></div>');
		
		expect(controller.el('p').size()).toBe(1);
	});
	
	
	it("should cache element", function() {
		var controller = new DOMController();
		
		spyOn(window, '$').andReturn({});

		controller.el();
		controller.el();

		expect(window.$.calls.length).toBe(1);
	});

	it("should have a signature addListeners()", function() {
		var controller = new DOMController();

		expect(function () { controller._addListeners(); }).toThrow('not implemented error');
	});
});

