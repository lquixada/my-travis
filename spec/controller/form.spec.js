/*globals FormController, FormUsersController, FormPrefsController */

describe("Form Controller", function () {
	it("should open/close", function () {
		var
			element = $('<form><input type="hidden" name="user" value="John"></form>'),
			form = new FormController({element:element});

		form.open();

		expect(form.el().is('.opened')).toBe(true);
		
		form.close();

		expect(form.el().is('.opened')).toBe(false);
	});
	
	it("should toggle", function () {
		var
			element = $('<form><input type="hidden" name="user" value="John"></form>'),
			form = new FormController({element:element});

		form.toggle();

		expect(form.el().is('.opened')).toBe(true);
		
		form.toggle();

		expect(form.el().is('.opened')).toBe(false);
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
				element = $('<form><input type="hidden" name="user" value="John"></form>'),
				form = new FormUsersController({element:element});

			form._addListeners();
			form.el().submit();

			expect(Prefs.getUsers()[0]).toBe('John');
		});

		it("should publish", function () {
			var
				element = $('<form><input type="hidden" name="user" value="John"></form>'),
				form = new FormUsersController({element:element}),
				client = new LiteMQ.Client();
			
			client.sub('form-users-submitted', function () {
				expect(true).toBe(true);
			});

			form._addListeners();
			form.el().submit();
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
				element = $('<form><input type="hidden" name="interval"><input type="checkbox" name="notifications"></form>'),
				form = new FormPrefsController({element:element});

			form._addListeners();
			form.el()
				.find(':input[name=interval]').val(50).end()
				.find(':input[name=notifications]').attr('checked', true).end()
				.submit();

			expect(Prefs.get('interval')).toBe('50');
			expect(Prefs.get('notifications')).toBe(true);
		});

		it("should publish", function () {
			var
				element = $('<form><input type="hidden" name="interval"><input type="checkbox" name="notifications"></form>'),
				form = new FormPrefsController({element:element}),
				client = new LiteMQ.Client();
			
			client.sub('form-prefs-submitted', function () {
				expect(true).toBe(true);
			});

			form._addListeners();
			form.el().submit();
		});
	});
});

