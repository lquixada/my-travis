/*globals Notification */

describe("Notification", function() {
	describe("setting", function() {
		beforeEach(function() {
			spyOn(Notification, '_notify');
		});
		
		it("should notify when enabled", function() {
			Prefs.set('notifications', true);
			
			Notification.update();
			
			expect(Notification._notify).toHaveBeenCalled();
		});

		it("should not notify when disabled", function() {
			Prefs.set('notifications', false);
			
			Notification.update();
			
			expect(Notification._notify).not.toHaveBeenCalled();
		});
	});

	describe("notify", function() {
		beforeEach(function() {
			Prefs.set('notifications', true);
			Prefs.set('statuses', '');

			spyOn(Notification, '_open');
		});
		
		describe("does nothing", function() {
			it("on first fetch", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				expect(Notification._open).not.toHaveBeenCalled();
			});

			it("if projects status do not alter", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				expect(Notification._open).not.toHaveBeenCalled();
			});

			it("even if project status goes from failed to errored", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'errored'}
				]);

				expect(Notification._open).not.toHaveBeenCalled();
			});

			it("or vice-versa", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'errored'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				expect(Notification._open).not.toHaveBeenCalled();
			});
		});

		describe("shows fail", function() {
			it("if a project goes from passed to failed", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'passed'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				expect(Notification._open).toHaveBeenCalledWith('failed');
			});

			it("if a project goes from passed to errored", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'passed'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'errored'}
				]);

				expect(Notification._open).toHaveBeenCalledWith('failed');
			});

			it("if project was passing, runned and has failed", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'passed'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'started'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				expect(Notification._open).toHaveBeenCalledWith('failed');
			});
		});
		
		describe("shows passed", function() {
			it("if a project goes from failed to passed", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'passed'}
				]);

				expect(Notification._open).toHaveBeenCalledWith('passed');
			});
			
			it("if a project goes from errored to passed", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'errored'}
				]);

				Notification.update([
						{user:'user1', name: 'proj1', status: 'passed'}
				]);

				expect(Notification._open).toHaveBeenCalledWith('passed');
			});

			it("if project was failing, runned and has passed", function() {
				Notification.update([
					{user:'user1', name: 'proj1', status: 'failed'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'started'}
				]);

				Notification.update([
					{user:'user1', name: 'proj1', status: 'passed'}
				]);

				expect(Notification._open).toHaveBeenCalledWith('passed');
			});
		});
	});
});

