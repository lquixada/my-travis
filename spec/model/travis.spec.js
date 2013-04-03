describe("TravisAPI", function() {
	it("should make a request to TravisCI with callback", function() {
		var callback = jasmine.createSpy('onComplete');
		var url = 'https://api.travis-ci.org/repos?owner_name[]=user1&owner_name[]=user2';

		spyOn($, 'getJSON');

		TravisAPI.get(['user1', 'user2'], callback);

		expect($.getJSON).toHaveBeenCalledWith(url, callback);
	});
});

