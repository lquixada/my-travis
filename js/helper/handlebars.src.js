Handlebars.registerHelper('eachProperty', function(context, options) {
	var ret = "";
	
	for (var prop in context) {
		ret = ret + options.fn({property:prop,value:context[prop]});
	}

	return ret;
});

Handlebars.registerHelper('classOf', function(status) {
	return (status==='failed'?'class="failed"':'');
});

Handlebars.registerHelper('urlTo', function(user, name) {
	return 'https://travis-ci.org/'+user+'/'+name;
});

Handlebars.registerHelper('statusImg', function(status) {
	return '<img class="icon-status" src="../imgs/icon-'+status+'.png" title="'+status+'">';
});

Handlebars.registerHelper('formatSecs', function(duration) {
	if (duration) {
		return formatSecs(duration);
	}

	return '-';
});

Handlebars.registerHelper('moment', function(finishedAt) {
	finishedAt = Handlebars.Utils.escapeExpression(finishedAt);

	if (finishedAt) {
		return moment(finishedAt).fromNow();
	}

	return 'running';
});
