describe("Project Model", function() {
    afterEach(function() {
        delete localStorage.projs;
    });

    it("should store projects on 'projs' key", function() {
        var json = [{prop: 'value'}];

        Projs.set(json);

        expect(localStorage.projs).toBe(JSON.stringify(json));
    });
    
    it("should not have stored projects", function() {
        expect(Projs.get()).toBeArray();
        expect(Projs.get().length).toBe(0);
    });

    it("should get the right projects", function() {
        var json = [{prop: 'value'}];

        Projs.set(json);

        expect(Projs.get()).toBeJson(json);
    });
});

