
describe("DOMController", function() {
    it("should get main element", function() {
        var controller = new DOMController();
				controller.dom = 'body';

        expect(controller.el().get(0)).toBe(document.body);
    });
    
    it("should cache element", function() {

        controller = new DOMController();
        
        spyOn(window, '$').andReturn({});

        controller.el();
        controller.el();

        expect(window.$.calls.length).toBe(1);
    });

    it("should have a signature addListeners()", function() {
        expect(function () { controller._addListeners(); }).toThrow('not implemented error');
    });
});

