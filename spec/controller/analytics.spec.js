describe("Analytics", function() {
	it("should add the google analytics on extension install", function() {
		var client = new LiteMQ.Client();

		client.pub('extension-installed');

		expect($('script[src$="ga.js"]').length).toBe(1);
	});
});

