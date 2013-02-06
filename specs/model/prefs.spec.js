describe("Preferences Model", function() {
    afterEach(function() {
        delete localStorage.prefs;
    });
    
    it("should not have stored preferences", function() {
        expect(Prefs.get()).toBeEmptyObject();
    });

    it("should store preferences on 'prefs' key", function() {
        Prefs.set('user', 'test');

        expect(localStorage.prefs).toBe(JSON.stringify({'user': 'test'}));
    });

    it("should get the right preferences", function() {
        Prefs.set('user', 'test');

        expect(Prefs.get()).toBeJson({'user': 'test'});
    });

    it("should the value of the key", function() {
        Prefs.set('user', 'test');

        expect(Prefs.get('user')).toBeJson('test');
    });
});

