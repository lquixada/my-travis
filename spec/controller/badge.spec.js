/*globals badgeController */

describe("Badge Controller", function() {
	beforeEach(function() {
		Projs.clear();

		spyOn(BadgeController.prototype, '_setChromeBadge');
	});
	
	describe("no projects", function() {
		it("should remove badge", function() {
			var Badge = new BadgeController();

			Projs.clear();

			Badge.update();

			expect(Badge._setChromeBadge).toHaveBeenCalledWith('');
		});
	});

	describe("ok projects", function() {
		it("should have blank text with green background", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'passed'}, {status: 'passed'}]);

			Badge.update();

			expect(Badge._setChromeBadge).toHaveBeenCalledWith(' ', 'green');
		});
	});

	describe("failing projects", function() {
		it("should show text 1 in red", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'failed'}, {status: 'passed'}]);

			Badge.update();

			expect(Badge._setChromeBadge).toHaveBeenCalledWith('1', 'red');
		});
	});

	describe("running projects", function() {
		it("should not modify text", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'started'}, {status: 'passed'}]);

			Badge._setChromeBadge.reset();

			Badge.update();

			expect(Badge._setChromeBadge).not.toHaveBeenCalled();
		});
	});
});

