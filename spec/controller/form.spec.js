/*globals FormController, FormUsersController, FormPrefsController */

describe("Form Controller", function () {
	it("should open/close", function () {
		var
			element = $('<section><form><input type="hidden" name="user" value="John"></form></section>'),
			form = new FormController({element:element});

		form.open();

		expect(form.el('form').is('.opened')).toBe(true);
		
		form.close();

		expect(form.el('form').is('.opened')).toBe(false);
	});
	
	it("should toggle", function () {
		var
			element = $('<section><form><input type="hidden" name="user" value="John"></form></section>'),
			form = new FormController({element:element});

		form.toggle();

		expect(form.el('form').is('.opened')).toBe(true);
		
		form.toggle();

		expect(form.el('form').is('.opened')).toBe(false);
	});
});


describe("Form User Controller", function () {
	beforeEach(function () {
		spyOn($, 'getJSON');
	});
	
	afterEach(function () {
		Prefs.clear();
	});

	describe("on submit", function () {
		it("should store user", function () {
			var
				element = $('<section><form><input type="hidden" name="user" value="john, bill, jack"></form></section>'),
				form = new FormUsersController({element:element});

			Prefs.addUser('john');

			form._addListeners();
			form.el('form').submit();

			expect(Prefs.get('users')).toBe('bill,jack,john');
		});

		it("should publish", function () {
			var
				element = $('<section><form><input type="hidden" name="user" value="John"></form></section>'),
				form = new FormUsersController({element:element}),
				client = new LiteMQ.Client();
			
			client.sub('form-users-submitted', function () {
				expect(true).toBe(true);
			});

			form._addListeners();
			form.el('form').submit();
		});
	});
});


describe("Form Prefs Controller", function () {
	beforeEach(function () {
		spyOn($, 'getJSON');
	});
	
	afterEach(function () {
		Prefs.clear();
	});

	describe("on submit", function () {
		it("should store prefs", function () {
			var
				element = $('<section><form><input type="hidden" name="interval"><input type="checkbox" name="notifications"></form></section>'),
				form = new FormPrefsController({element:element});

			form._addListeners();
			form.el('form')
				.find(':input[name=interval]').val(50).end()
				.find(':input[name=notifications]').attr('checked', true).end()
				.submit();

			expect(Prefs.get('interval')).toBe('50');
			expect(Prefs.get('notifications')).toBe(true);
		});

		it("should publish", function () {
			var
				element = $('<section><form><input type="hidden" name="interval"><input type="checkbox" name="notifications"></form></section>'),
				form = new FormPrefsController({element:element}),
				client = new LiteMQ.Client();
			
			client.sub('form-prefs-submitted', function () {
				expect(true).toBe(true);
			});

			form._addListeners();
			form.el('form').submit();
		});
	});
});

