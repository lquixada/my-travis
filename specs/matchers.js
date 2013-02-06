beforeEach(function() {
  this.addMatchers({
    toBeArray: function () {
      return toString.call(this.actual) === '[object Array]';
    },
    
    toBeJson: function (object) {
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

