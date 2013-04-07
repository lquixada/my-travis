/*globals HeaderController */

describe("Header Controller", function() {
	it("should notify when user button is clicked", function() {
		var
			element = $('<div><button id="open-users"></button></div>'),
			header = new HeaderController({element: element}),
			client = new LiteMQ.Client();

		client.count = 0;
		client.sub('button-open-users-pressed', function () {
			this.count++;
		});

		header._addListeners();
		header.el().find('button#open-users').click();

		expect(client.count).toBe(1);
	});

	it("should notify when prefs button is clicked", function() {
		var
			element = $('<div><button id="open-prefs"></button></div>'),
			header = new HeaderController({element: element}),
			client = new LiteMQ.Client();
		
		client.count = 0;
		client.sub('button-open-prefs-pressed', function () {
			this.count++;
		});

		header._addListeners();
		header.el().find('button#open-prefs').click();

		expect(client.count).toBe(1);
	});
});

