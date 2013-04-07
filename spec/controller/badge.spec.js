/*globals badgeController */

describe("Badge Controller", function() {
	beforeEach(function() {
		chrome = {
			browserAction: jasmine.createSpyObj('browserAction', ['setBadgeText', 'setBadgeBackgroundColor']);
		};
	});
	
	describe("no projects", function() {
		it("should remove badge", function() {
			var badgeController = new BadgeController();

			badgeController.update([]);

			expect(chrome.browserAction.setBadgeText).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeText.calls[0].args[0]).toBeSameJsonAs({text: ''});
		});
	});

	describe("ok projects", function() {
		it("should have blank text", function() {
			var badgeController = new BadgeController();

			badgeController.update([
					{status: 'passed'},
					{status: 'passed'}
				]);

			expect(chrome.browserAction.setBadgeText).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeText.calls[0].args[0]).toBeSameJsonAs({text: ' '});
		});

		it("should be green", function() {
			var badgeController = new BadgeController();

			badgeController.update([
					{status: 'passed'},
					{status: 'passed'}
			]);

			expect(chrome.browserAction.setBadgeBackgroundColor).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeBackgroundColor.calls[0].args[0]).toBeSameJsonAs({color: '#0c0'});
		});
	});

	describe("failing projects", function() {
		
		it("should have blank text", function() {
			var badgeController = new BadgeController();

			badgeController.update([
				{status: 'failed'},
				{status: 'passed'}
			]);

			expect(chrome.browserAction.setBadgeText).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeText.calls[0].args[0]).toBeSameJsonAs({text: '1'});
		});

		it("should be red", function() {
			var badgeController = new BadgeController();

			badgeController.update([
				{status: 'failed'},
				{status: 'passed'}
			]);

			expect(chrome.browserAction.setBadgeBackgroundColor).toHaveBeenCalled();
			expect(chrome.browserAction.setBadgeBackgroundColor.calls[0].args[0]).toBeSameJsonAs({color: '#f00'});
		});
	});

	describe("running projects", function() {

		it("should not modify text", function() {
			var badgeController = new BadgeController();

			badgeController.update([
				{status: 'started'},
				{status: 'passed'}
			]);

			expect(chrome.browserAction.setBadgeText).not.toHaveBeenCalled();
		});

		it("should not modify color", function() {
			var badgeController = new BadgeController();

			badgeController.update([
				{status: 'started'},
				{status: 'passed'}
			]);

			expect(chrome.browserAction.setBadgeBackgroundColor).not.toHaveBeenCalled();
		});
	});
});

