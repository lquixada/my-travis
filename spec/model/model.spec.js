
describe("Model", function() {
    var model,
			json = {prop:'value'};

    afterEach(function() { 
				try {
					model.clear();
				} catch (err) {}
    });

    it("should store and get the json object", function() {
        model = new ModelLocalStorage();
        model.key = 'test';
        model.set(json);

        expect(model.get()).toBeSameJsonAs(json);
    });
    
    it("should not have a default key", function() {
        model = new ModelLocalStorage();
        
        expect(model.key).toBeUndefined();
    });

    it("should be null if json not given", function() {
        model = new ModelLocalStorage();
        model.key = 'test';
        
        expect(model.get()).toBeNull();
    });
    
    it("should complain when a key doesn't exist", function() {
        model = new ModelLocalStorage();
        
        expect(function () { model.set(json); }).toThrow();
    });

    it("should reset value", function() {
        model = new ModelLocalStorage();
        model.key = 'test';
        model.set(json);
        model.clear();

        expect(model.get()).toBeNull();
    });
});
