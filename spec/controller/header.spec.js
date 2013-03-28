describe("Header", function() {
	it("should notify when user button is clicked", function() {
		var client = new LiteMQ.Client();

		client.sub('button-open-users-pressed', function () {
			this.count = 1;
		});

		headerController.element = $('<div><button id="open-users"></button></div>');
		headerController.boot();
		headerController.el().find('button#open-users').click();

		expect(client.count).toBe(1);
	});

	it("should notify when prefs button is clicked", function() {
		var client = new LiteMQ.Client();

		client.sub('button-open-prefs-pressed', function () {
			this.count = 1;
		});

		headerController.element = $('<div><button id="open-prefs"></button></div>');
		headerController.boot();
		headerController.el().find('button#open-prefs').click();

		expect(client.count).toBe(1);
	});
});

