describe("JSONRequest", function () {
	var req;

	beforeEach(function() {
		req = jasmine.createSpyObj('req', ['send', 'open']);
		
		spyOn(window, 'XMLHttpRequest').andReturn(req);
	});
	
	it("should create a request", function() {
		JSONRequest.get('url');

		expect(window.XMLHttpRequest).toHaveBeenCalled();
	});

	it("should prepare a GET request", function() {
		JSONRequest.get('url');

		expect(req.open).toHaveBeenCalledWith('GET', 'url', true);
	});
	
	it("should make a request", function () {
		JSONRequest.get('url');

		expect(req.send).toHaveBeenCalledWith(null);
	});

	it("should call a callback with parsed json on load", function() {
		var response = {target: {responseText: '{"prop":"value"}'}};

		JSONRequest.get('url', function (json) {
			expect(JSON.stringify(json)).toBe(response.target.responseText);
		});
		
		req.onload(response);
	});
});

