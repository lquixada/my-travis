describe("Updater Service", function() {
	describe("polling", function() {
		beforeEach(function() {
			Prefs.addUser('user1');
			jasmine.Clock.useMock();
			spyOn(TravisAPI, 'get');
		});
		
		it("should call Travis API every 60 seconds", function() {
			Prefs.set('interval', '');

			Updater.start();

			jasmine.Clock.tick(60001);

			expect(TravisAPI.get).toHaveBeenCalled();
		});
		
		it("should call TravisAPI acording to configuration", function() {
			Prefs.set('interval', 10);

			Updater.start();

			jasmine.Clock.tick(10001);

			expect(TravisAPI.get).toHaveBeenCalled();	
		});

		it("should not call TravisAPI when no users are set", function() {
			Prefs.removeUser('user1');
			
			Updater.start();

			expect(TravisAPI.get).not.toHaveBeenCalled();
		});
		
	});
	
	it("should stop polling", function() {
		  spyOn(window, 'clearInterval');

			Updater.start();
			Updater.stop();
			
			expect(window.clearInterval).toHaveBeenCalled();
	});
});

