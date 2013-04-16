describe("Analytics", function() {
	beforeEach(function() {
		LiteMQ.DefaultBus.clear();
	});
	
	it("should add the google analytics on extension install", function() {
		var
			client = new LiteMQ.Client();

		new AnalyticsController();

		client.pub('extension-installed');

		expect($('script[src$="ga.js"]').length).toBe(1);
	});
});

