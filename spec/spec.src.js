var fixture = '';
	
// Getting html fixture before suite spec begins
$.ajax({
	url: 'html/popup.html',
	dataType: 'html',
	async: false,
	success: function (data) {
		// Extract all body markup
		fixture = data.match(/<body>([\s\S]*)<\/body>/)[1];
	}
});

beforeEach(function() {
	$('div#main').html(fixture);

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

