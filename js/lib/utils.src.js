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

