/*globals FormController, Prefs, formUsersController, formPrefsController */

describe("Form Controller", function () {
	it("should open/close", function () {
		var form = new FormController();

		form.element = $('<form><input type="hidden" name="user" value="John"></form>');
		form.open();

		expect(form.el().is('.opened')).toBe(true);
		
		form.close();

		expect(form.el().is('.opened')).toBe(false);
	});
	
	it("should toggle", function () {
		var form = new FormController();

		form.element = $('<form><input type="hidden" name="user" value="John"></form>');
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
			formUsersController.element = $('<form><input type="hidden" name="user" value="John"></form>');
			formUsersController.boot();
			formUsersController.el().submit();

			expect(Prefs.getUsers()[0]).toBe('John');
		});

		it("should publish", function () {
			var
				client = new LiteMQ.Client();
			
			client.sub('form-users-submitted', function () {
				expect(true).toBe(true);
			});

			formUsersController.element = $('<form><input type="hidden" name="user" value="John"></form>');
			formUsersController.boot();
			formUsersController.el().submit();
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
			formPrefsController.element = $('<form><input type="hidden" name="interval"><input type="checkbox" name="notifications"></form>');
			formPrefsController.boot();
			formPrefsController.el()
				.find(':input[name=interval]').val(50).end()
				.find(':input[name=notifications]').attr('checked', true).end()
				.submit();

			expect(Prefs.get('interval')).toBe('50');
			expect(Prefs.get('notifications')).toBe(true);
		});

		it("should publish", function () {
			var
				client = new LiteMQ.Client();
			
			client.sub('form-prefs-submitted', function () {
				expect(true).toBe(true);
			});

			formPrefsController.element = $('<form><input type="hidden" name="interval"><input type="checkbox" name="notifications"></form>');
			formPrefsController.boot();
			formPrefsController.el().submit();
		});
	});
});

