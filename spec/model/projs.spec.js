
describe("Project Model", function() {
	beforeEach(function() {
		Prefs.clear();
		Projs.clear();
	});
	
	afterEach(function() {
		Prefs.clear();
		Projs.clear();
	});

	it("should not have any stored projects", function() {
		expect(Projs.get()).toBeArray();
		expect(Projs.get().length).toBe(0);
	});
	
	it("should get the right projects", function() {
		Projs.set([{prop: 'value'}]);

		expect(Projs.get()).toBeSameJsonAs([{prop: 'value'}]);
	});

	describe("convertOnly", function() {
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
		
		it("should convert properties", function() {
			var converted = Projs.convertOnly(proj);

			expect(converted.user).toBe('lquixada');
			expect(converted.name).toBe('my-travis');
			expect(converted.build).toBe('13');
			expect(converted.finishedAt).toMatch('2013-02-13T16:02:40Z');
			expect(converted.description).toBe('Monitor your projects builds from TravisCI within Chrome.');
			expect(converted.duration).toBe(28);
		});

		describe("status", function() {
			it("should convert status passed", function() {
				proj.last_build_status = 0;

				expect(Projs.convertOnly(proj).status).toBe('passed');
			});

			it("should convert status failed", function() {
				proj.last_build_status = 1;

				expect(Projs.convertOnly(proj).status).toBe('failed');
			});

			it("should convert status started", function() {
				proj.last_build_status = null;
				proj.last_build_finished_at = null;

				expect(Projs.convertOnly(proj).status).toBe('started');
			});

			it("should convert status errored", function() {
				proj.last_build_status = null;

				expect(Projs.convertOnly(proj).status).toBe('errored');
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
		
		expect(projs).toBeSameJsonAs({
			"lquixada": [
				{user: 'lquixada', name: 'proj1', status: 'passed'},
				{user: 'lquixada', name: 'proj2', status: 'passed'}
			],
			"aaron": [{user: 'aaron', name:'proj1', status: 'passed'}],
			"flickr": [{user: 'flickr', name:'proj1', status: 'passed'}]
		});
	});
});

