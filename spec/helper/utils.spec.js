describe("formatSecs", function() {
	describe("integers as argument", function() {
		it("should display 2s", function() {
			expect(formatSecs(2)).toBe('2s');
		});

		it("should display 1min 2s", function() {
			expect(formatSecs(62)).toBe('1min 2s');
		});

		it("should display 1h 1min 2s", function() {
			expect(formatSecs(3662)).toBe('1h 1min 2s');
		});
	});
	
	describe("non-integers as argument", function() {
		it("should display blank on null", function() {
			expect(formatSecs(null)).toBe('');
		});

		it("should display blank on undefined", function() {
			expect(formatSecs()).toBe('');
		});
	});
});

describe("Interval Migration (from secs to mins)", function() {
	describe("convert to 1 minute", function() {
		it("should round it up to 1 minute if 20 secs (0,3min)", function() {
			Prefs.set('interval', 20);

			convertInterval();

			expect(Prefs.get('interval')).toBeUndefined();
			expect(Prefs.get('intervalMin')).toBe(1);
		});

		it("should convert to 1 minute if 60 secs (1min)", function() {
			Prefs.set('interval', 60);

			convertInterval();

			expect(Prefs.get('interval')).toBeUndefined();
			expect(Prefs.get('intervalMin')).toBe(1);
		});	

		it("should round it down to 1 minute if 89 secs (1,48min)", function() {
			Prefs.set('interval', 89);

			convertInterval();

			expect(Prefs.get('interval')).toBeUndefined();
			expect(Prefs.get('intervalMin')).toBe(1);	
		});
	});

	describe("convert to 2 minutes", function() {
		it("should round it up to 2 mins if 90 secs (1,5min)", function() {
			Prefs.set('interval', 90); 

			convertInterval();

			expect(Prefs.get('interval')).toBeUndefined();
			expect(Prefs.get('intervalMin')).toBe(2);	
		});

		it("should convert it to 2 minutes if 120 secs (2min)", function() {
			Prefs.set('interval', 120);

			convertInterval();

			expect(Prefs.get('interval')).toBeUndefined();
			expect(Prefs.get('intervalMin')).toBe(2);	
		});

		it("should migrate to 1 minute if 149 secs (2,48min)", function() {
			Prefs.set('interval', 149);

			convertInterval();

			expect(Prefs.get('interval')).toBeUndefined();
			expect(Prefs.get('intervalMin')).toBe(2);	
		});
	});
});
