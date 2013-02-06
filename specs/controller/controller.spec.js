
describe("Controller", function() {

    it("should get main element", function() {
        var element = {};

        controller = new Controller();

        spyOn(document, 'querySelector').andReturn(element);
        
        expect(controller.el()).toBe(element);
    });
    
    it("should cache element", function() {
        var element = {};

        controller = new Controller();
        
        spyOn(document, 'querySelector').andReturn(element);

        controller.el();
        controller.el();

        expect(document.querySelector.calls.length).toBe(1);
    });

    it("should have a signature addListeners()", function() {
        expect(function () { controller.addListeners(); }).toThrow('not implemented error');
    });
    
});

