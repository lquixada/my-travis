describe("Badge", function() {
    var setBadgeText, setBadgeBackgroundColor;

    beforeEach(function() {
        chrome = { browserAction: {} };
        chrome.browserAction.setBadgeText = function () {};
        chrome.browserAction.setBadgeBackgroundColor = function () {};

        spyOn(chrome.browserAction, 'setBadgeText');
        spyOn(chrome.browserAction, 'setBadgeBackgroundColor');
        
        setBadgeText = chrome.browserAction.setBadgeText;
        setBadgeBackgroundColor = chrome.browserAction.setBadgeBackgroundColor;
    });
    
    describe("no projects", function() {
        it("should remove badge", function() {
            Badge.update([]);

            expect(setBadgeText).toHaveBeenCalled();
            expect(setBadgeText.calls[0].args[0]).toBeJson({text: ''});
        });
    });

    describe("ok projects", function() {
        var projs;
        
        beforeEach(function() {
            projs = [ {last_build_status: 0 }, {last_build_status: 0} ];
        });
        
        it("should have blank text", function() {
            Badge.update(projs);

            expect(setBadgeText).toHaveBeenCalled();
            expect(setBadgeText.calls[0].args[0]).toBeJson({text: ' '});
        });

        it("should be green", function() {
            Badge.update(projs);

            expect(setBadgeBackgroundColor).toHaveBeenCalled();
            expect(setBadgeBackgroundColor.calls[0].args[0]).toBeJson({color: '#0c0'});
        });
    });

    describe("failing projects", function() {
        var projs;

        beforeEach(function() {
            projs = [ {last_build_status: 1 }, {last_build_status: 0} ];
        });
        
        it("should have blank text", function() {
            Badge.update(projs);

            expect(setBadgeText).toHaveBeenCalled();
            expect(setBadgeText.calls[0].args[0]).toBeJson({text: '1'});
        });

        it("should be red", function() {
            Badge.update(projs);

            expect(setBadgeBackgroundColor).toHaveBeenCalled();
            expect(setBadgeBackgroundColor.calls[0].args[0]).toBeJson({color: '#f00'});
        });
    });

    describe("running projects", function() {
        var projs;

        beforeEach(function() {
            projs = [ {last_build_status: null }, {last_build_status: 0} ];
        });
        
        it("should not modify text", function() {
            Badge.update(projs);

            expect(setBadgeText).not.toHaveBeenCalled();
        });

        it("should not modify color", function() {
            Badge.update(projs);

            expect(setBadgeBackgroundColor).not.toHaveBeenCalled();
        });
    });
});

