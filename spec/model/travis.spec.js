describe("TravisAPI", function() {
	var callback;

	beforeEach(function() {
		callback = jasmine.createSpy('onComplete');
			
		spyOn($, 'getJSON');
	});
	
	it("should make a request to TravisCI with callback", function() {
		var url = 'https://api.travis-ci.org/repos?owner_name[]=user1&owner_name[]=user2';

		TravisAPI.get(['user1', 'user2'], callback);

		expect($.getJSON).toHaveBeenCalledWith(url, callback);
	});
});

