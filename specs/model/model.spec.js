
describe("Model", function() {
    var json = {prop:'value'};

    afterEach(function() { 
        delete localStorage.test; 
    });
    
    it("should have a not have a default key", function() {
        model = new Model();
        
        expect(model.key).toBeUndefined();
    });
    
    it("should not store json object without a key", function() {
        model = new Model();
        
        expect(function () { model.set(json); }).toThrow();
    });

    it("should store a json object with a key", function() {
        model = new Model();
        model.key = 'test';
        model.set(json);

        // Since it's hard to compare objects, we stringify it.
        expect(localStorage.test).toBe(JSON.stringify(json));
    });

    it("should get a json object", function() {
        model = new Model();
        model.key = 'test';
        model.set(json);
        
        expect(JSON.stringify(model.get())).toBe(localStorage.test);
    });

    it("should be null if json not given", function() {
        model = new Model();
        model.key = 'test';
        
        expect(model.get()).toBeNull();
    });

    it("should reset value", function() {
        model = new Model();
        model.key = 'test';
        model.set(json);
        model.clear();

        expect(localStorage.test).toBeUndefined();
    });
});
