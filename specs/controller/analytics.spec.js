describe("Analytics", function() {
	it("should track page views with the google analytics script", function() {
		expect($('script[src$="ga.js"]').length).toBe(1);
	});
});

