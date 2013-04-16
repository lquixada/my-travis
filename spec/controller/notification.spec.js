/*globals Notification */

describe("Notification", function() {
	var Notification;
	
	beforeEach(function() {
		Notification = new NotificationController();
	});

	describe("setting", function() {
		beforeEach(function() {
			spyOn(Notification, '_open');
		});
		
		it("should notify when enabled", function() {
			Prefs.set('notifications', true);
			Projs.set([{status: 'passed'}]);
			
			Notification.update();
			
			Projs.set([{status: 'failed'}]);

			Notification.update();

			expect(Notification._open).toHaveBeenCalled();
		});

		it("should not notify when disabled", function() {
			Prefs.set('notifications', false);
			Projs.set([{status: 'passed'}]);
			
			Notification.update();
			
			Projs.set([{status: 'failed'}]);

			Notification.update();

			expect(Notification._open).not.toHaveBeenCalled();
		});
	});

	describe("notify", function() {
		beforeEach(function() {
			Prefs.set('notifications', true);
			Status.set('stored', '');

			spyOn(Notification, '_open');
		});
		
		describe("does nothing", function() {
			it("on first fetch", function() {
				Projs.set([{status: 'failed'}]);

				Notification.update();

				expect(Notification._open).not.toHaveBeenCalled();
			});

			it("if projects status do not alter", function() {
				Projs.set([{status: 'failed'}]);

				Notification.update();

				Projs.set([{status: 'failed'}]);

				Notification.update();

				expect(Notification._open).not.toHaveBeenCalled();
			});

			it("even if project status goes from failed to errored", function() {
				Projs.set([{status: 'failed'}]);

				Notification.update();

				Projs.set([{status: 'errored'}]);

				Notification.update();

				expect(Notification._open).not.toHaveBeenCalled();
			});

			it("or vice-versa", function() {
				Projs.set([{status: 'errored'}]);

				Notification.update();

				Projs.set([{status: 'failed'}]);

				Notification.update();

				expect(Notification._open).not.toHaveBeenCalled();
			});
		});

		describe("shows fail", function() {
			it("if a project goes from passed to failed", function() {
				Projs.set([{status: 'passed'}]);

				Notification.update();

				Projs.set([{status: 'failed'}]);

				Notification.update();

				expect(Notification._open).toHaveBeenCalledWith('failed');
			});

			it("if a project goes from passed to errored", function() {
				Projs.set([{status: 'passed'}]);

				Notification.update();

				Projs.set([{status: 'errored'}]);

				Notification.update();

				expect(Notification._open).toHaveBeenCalledWith('failed');
			});

			it("if project was passing, runned and has failed", function() {
				Projs.set([{status: 'passed'}]);

				Notification.update();

				Projs.set([{status: 'started'}]);
				
				Notification.update();

				Projs.set([{status: 'failed'}]);

				Notification.update();

				expect(Notification._open).toHaveBeenCalledWith('failed');
			});
		});
		
		describe("shows passed", function() {
			it("if a project goes from failed to passed", function() {
				Projs.set([{status: 'failed'}]);

				Notification.update();

				Projs.set([{status: 'passed'}]);

				Notification.update();

				expect(Notification._open).toHaveBeenCalledWith('passed');
			});
			
			it("if a project goes from errored to passed", function() {
				Projs.set([{status: 'errored'}]);

				Notification.update();

				Projs.set([{status: 'passed'}]);

				Notification.update();

				expect(Notification._open).toHaveBeenCalledWith('passed');
			});

			it("if project was failing, runned and has passed", function() {
				Projs.set([{status: 'failed'}]);

				Notification.update();
				
				Projs.set([{status: 'started'}]);

				Notification.update();
				
				Projs.set([{status: 'passed'}]);

				Notification.update();

				expect(Notification._open).toHaveBeenCalledWith('passed');
			});
		});
	});
});

