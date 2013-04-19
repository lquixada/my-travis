function formatSecs(secs) {
	var stamp = '';

	if (typeof secs !== 'number') {
		return '';
	}

	var hours = Math.floor(secs / (60 * 60));
 
	var divisor_for_minutes = secs % (60 * 60);
	var mins = Math.floor(divisor_for_minutes / 60);

	var divisor_for_seconds = divisor_for_minutes % 60;
	
	secs = Math.ceil(divisor_for_seconds);


	if (hours>0) {
		stamp += hours+'h ';
	}

	if (mins>0 || hours>0) {
		stamp += mins+'min ';
	}

	stamp += secs+'s';

	return stamp;
}

function convertInterval() {
	var min, secs,
		interval = Prefs.get('interval');

	if (!interval) {
		return;
	}

	secs = (interval? parseInt(interval, 10): 1);

	if (secs <= 60) {
		Prefs.set('intervalMin', 1);
	} else {
		min = Math.round(secs/60);
		Prefs.set('intervalMin', min);
	}
	
	Prefs.set('interval', undefined);
}
