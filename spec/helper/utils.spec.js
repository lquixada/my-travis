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

