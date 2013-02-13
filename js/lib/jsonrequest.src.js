JSONRequest = {
	get: function (url, callback) {
		var req = new XMLHttpRequest();
		
		req.open('GET', url, true);
		req.onload = function (e) {
			var json = JSON.parse(e.target.responseText);
			callback(json);
		};
		req.send(null);
	}
};
