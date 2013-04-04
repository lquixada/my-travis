beforeEach(function() {
  this.addMatchers({
    toBeArray: function () {
      return $.isArray(this.actual);
    },
    
    toBeSameJsonAs: function (object) {
			return JSON.stringify(this.actual) === JSON.stringify(object);
    },
    
    toBeEmptyObject: function () {
			for ( var name in this.actual ) {
				return false;
			}
			return true;
    }
  });
});

