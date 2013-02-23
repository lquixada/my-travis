describe("Preferences Model", function() {
	afterEach(function() {
		delete localStorage.prefs;
	});

	describe("set", function() {
		it("should store preference on 'prefs' key", function() {
			Prefs.set('user', 'test');

			expect(localStorage.prefs).toBe('{"user":"test"}');
		});

		it("should get all the preferences", function() {
			Prefs.set('user', 'test');
			Prefs.set('password', 'wow');

			expect(Prefs.get()).toBeJson({user: 'test', password: 'wow'});
		});
	});
	
	describe("get", function() {
		it("should get an empty object", function() {
			expect(Prefs.get()).toBeEmptyObject();
		});

		it("should get the value of a key", function() {
			localStorage.prefs = '{"user": "test"}';

			expect(Prefs.get('user')).toBe('test');
		});

		it("should get all the preferences", function() {
			localStorage.prefs = '{"user": "test", "password": "wow"}';

			expect(Prefs.get()).toBeJson({user:'test', password: 'wow'});
		});
	});

	describe("set and get", function() {
		it("should get what is set", function() {
			Prefs.set('user', 'test');

			expect(Prefs.get('user')).toBe('test');
			expect(Prefs.get()).toBeJson({user: 'test'});
		});
	});

	describe("addUser", function() {
		it("should store one user", function() {
			Prefs.addUser('john');

			expect(Prefs.get('users')).toBe('john');
		});

		it("should store two users in reverse order", function() {
			Prefs.addUser('john');
			Prefs.addUser('bill');
			
			expect(Prefs.get('users')).toBe('bill,john');
		});
		
		it("should not store the same user twice", function() {
			Prefs.addUser('john');
			Prefs.addUser('john');
			
			expect(Prefs.get('users')).toBe('john');
		});
	});
	
	describe("getUsers", function() {
		it("should be an empty array", function() {
			expect(Prefs.getUsers()).toBeArray();
			expect(Prefs.getUsers().length).toBe(0);
		});

		it("should be a list of users", function() {
			var list;

			Prefs.addUser('john');
			Prefs.addUser('bill');
			
			list = Prefs.getUsers();

			expect(list.length).toBe(2);
			expect(list[0]).toBe('bill');
			expect(list[1]).toBe('john');
		});
	});
	
	describe("removeUser", function() {
		it("should remove a user", function() {
			Prefs.addUser('john');
			Prefs.addUser('bill');

			Prefs.removeUser('bill');

			expect(Prefs.get('users')).toBe('john');
		});

		it("should maintain list if user doesn't exist", function() {
			Prefs.addUser('john');
			Prefs.addUser('bill');

			Prefs.removeUser('ted');

			expect(Prefs.get('users')).toBe('bill,john');
		});
	});
});

