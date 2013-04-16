/*globals badgeController */

describe("Badge Controller", function() {
	beforeEach(function() {
		Projs.clear();

		spyOn(BadgeController.prototype, '_clearChromeBadge');
	});
	
	describe("no projects", function() {
		it("should remove badge", function() {
			var Badge = new BadgeController();

			Projs.clear();

			Badge.update();

			expect(BadgeController.prototype._clearChromeBadge).toHaveBeenCalled();
		});
	});

	describe("ok projects", function() {
		it("should have blank text", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'passed'}, {status: 'passed'}]);

			spyOn(Badge, '_setChromeBadge');
			
			Badge.update();

			expect(Badge._setChromeBadge).toHaveBeenCalledWith(0);
		});
	});

	describe("failing projects", function() {
		it("should show text 1 in red", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'failed'}, {status: 'passed'}]);

			spyOn(Badge, '_setChromeBadge');

			Badge.update();

			expect(Badge._setChromeBadge).toHaveBeenCalledWith(1);
		});
	});

	describe("running projects", function() {
		it("should not modify text", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'started'}, {status: 'passed'}]);

			spyOn(Badge, '_setChromeBadge');

			Badge.update();

			expect(Badge._setChromeBadge).not.toHaveBeenCalled();
		});
	});
});

