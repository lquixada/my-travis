/*globals Badge */

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
            badgeController.update([]);

            expect(setBadgeText).toHaveBeenCalled();
            expect(setBadgeText.calls[0].args[0]).toBeSameJsonAs({text: ''});
        });
    });

    describe("ok projects", function() {
        var projs;
        
        beforeEach(function() {
            projs = { user: [ {status: 'passed' }, {status: 'passed'} ] };
        });
        
        it("should have blank text", function() {
            badgeController.update(projs);

            expect(setBadgeText).toHaveBeenCalled();
            expect(setBadgeText.calls[0].args[0]).toBeSameJsonAs({text: ' '});
        });

        it("should be green", function() {
            badgeController.update(projs);

            expect(setBadgeBackgroundColor).toHaveBeenCalled();
            expect(setBadgeBackgroundColor.calls[0].args[0]).toBeSameJsonAs({color: '#0c0'});
        });
    });

    describe("failing projects", function() {
        var projs;

        beforeEach(function() {
            projs = {user: [ {status: 'failed' }, {status: 'passed'} ]};
        });
        
        it("should have blank text", function() {
            badgeController.update(projs);

            expect(setBadgeText).toHaveBeenCalled();
            expect(setBadgeText.calls[0].args[0]).toBeSameJsonAs({text: '1'});
        });

        it("should be red", function() {
            badgeController.update(projs);

            expect(setBadgeBackgroundColor).toHaveBeenCalled();
            expect(setBadgeBackgroundColor.calls[0].args[0]).toBeSameJsonAs({color: '#f00'});
        });
    });

    describe("running projects", function() {
        var projs;

        beforeEach(function() {
            projs = {user: [ {status: 'started'}, {status: 'passed'} ]};
        });
        
        it("should not modify text", function() {
            badgeController.update(projs);

            expect(setBadgeText).not.toHaveBeenCalled();
        });

        it("should not modify color", function() {
            badgeController.update(projs);

            expect(setBadgeBackgroundColor).not.toHaveBeenCalled();
        });
    });
});

