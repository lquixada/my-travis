describe("Project Model", function() {
  afterEach(function() {
		delete localStorage.projs;
		delete localStorage.prefs;
  });

  it("should not have stored projects", function() {
		expect(Projs.get()).toBeArray();
		expect(Projs.get().length).toBe(0);
  });

  it("should store projects on 'projs' key", function() {
		Projs.set([{prop: 'value'}]);

		expect(localStorage.projs).toBe('[{"prop":"value"}]');
  });
  
  it("should get the right projects", function() {
		var json = [{prop: 'value'}];

		Projs.set(json);

		expect(Projs.get()).toBeJson(json);
  });

	describe("getSorted", function() {
		it("should be empty when no users are set", function() {
			Prefs.set('users', '');

			expect(Projs.getSorted()).toBeArray();
			expect(Projs.getSorted().length).toBe(0);
		});
		
		it("should get the projects in the same order as users", function() {
			var projs, json = [{slug: 'lquixada/proj'}, {slug: 'aaron/proj'}, {slug: 'flickr/proj'}];

			Prefs.set('users', 'flickr,lquixada,aaron');
			Projs.set(json);

			projs = Projs.getSorted();

			expect(projs[0].slug).toBe('flickr/proj');
			expect(projs[1].slug).toBe('lquixada/proj');
			expect(projs[2].slug).toBe('aaron/proj');
		});
	});
});

