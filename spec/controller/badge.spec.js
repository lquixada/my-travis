/*globals badgeController */

describe("Badge Controller", function() {
	beforeEach(function() {
		Projs.clear();

		spyOn(BadgeController.prototype, 'clear');
	});
	
	describe("no projects", function() {
		it("should remove badge", function() {
			var Badge = new BadgeController();

			Projs.clear();

			Badge.update();

			expect(BadgeController.prototype.clear).toHaveBeenCalled();
		});
	});

	describe("ok projects", function() {
		it("should have blank text", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'passed'}, {status: 'passed'}]);

			spyOn(Badge, 'set');
			
			Badge.update();

			expect(Badge.set).toHaveBeenCalledWith(0);
		});
	});

	describe("failing projects", function() {
		it("should show text 1 in red", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'failed'}, {status: 'passed'}]);

			spyOn(Badge, 'set');

			Badge.update();

			expect(Badge.set).toHaveBeenCalledWith(1);
		});
	});

	describe("running projects", function() {
		it("should not modify text", function() {
			var Badge = new BadgeController();

			Projs.set([{status: 'started'}, {status: 'passed'}]);

			spyOn(Badge, 'set');

			Badge.update();

			expect(Badge.set).not.toHaveBeenCalled();
		});
	});
});

