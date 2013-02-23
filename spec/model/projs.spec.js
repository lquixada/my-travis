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

	describe("convert", function() {
		var proj;

		beforeEach(function() {
			proj = {
				id: 436531,
				slug: "lquixada/my-travis",
				description: "Monitor your projects builds from TravisCI within Chrome.",
				last_build_id: 4770908,
				last_build_number: "13",
				last_build_status: 0,
				last_build_result: 0,
				last_build_duration: 28,
				last_build_language: null,
				last_build_started_at: "2013-02-13T16:02:12Z",
				last_build_finished_at: "2013-02-13T16:02:40Z"
			};
		});
		
		it("should convert slug", function() {
			converted = Projs.convert(proj);

			expect(converted.user).toBe('lquixada');
			expect(converted.name).toBe('my-travis');
		});

		it("should convert build number", function() {
			converted = Projs.convert(proj);

			expect(converted.build).toBe('13');
		});

		it("should convert finished_at", function() {
			converted = Projs.convert(proj);

			expect(converted.finishedAt).toMatch('2013-02-13T16:02:40Z');
		});

		it("should convert description", function() {
			converted = Projs.convert(proj);

			expect(converted.description).toBe('Monitor your projects builds from TravisCI within Chrome.');
		});	
		
		it("should convert duration", function() {
			converted = Projs.convert(proj);

			expect(converted.duration).toBe(28);
		});

		describe("status", function() {
			it("should convert status passed", function() {
				proj.last_build_status = 0;

				converted = Projs.convert(proj);

				expect(converted.status).toBe('passed');
			});

			it("should convert status failed", function() {
				proj.last_build_status = 1;

				converted = Projs.convert(proj);

				expect(converted.status).toBe('failed');
			});

			it("should convert status started", function() {
				proj.last_build_status = null;
				proj.last_build_finished_at = null;

				converted = Projs.convert(proj);

				expect(converted.status).toBe('started');
			});

			it("should convert status errored", function() {
				proj.last_build_status = null;

				converted = Projs.convert(proj);

				expect(converted.status).toBe('errored');
			});
		});
	});
	
	it("should store projects", function() {
			var projs, json = [
				{slug: 'lquixada/proj1', last_build_status: 0},
				{slug: 'aaron/proj1', last_build_status: 0},
				{slug: 'lquixada/proj2', last_build_status: 0},
				{slug: 'flickr/proj1', last_build_status: 0}
			];

			Projs.store(json);

			projs = Projs.get();
			
			expect(projs).toBeJson({
				"lquixada": [
					{user: 'lquixada', name: 'proj1', status: 'passed'},
					{user: 'lquixada', name: 'proj2', status: 'passed'}
				],
				"aaron": [{user: 'aaron', name:'proj1', status: 'passed'}],
				"flickr": [{user: 'flickr', name:'proj1', status: 'passed'}]
			});
	});
});

