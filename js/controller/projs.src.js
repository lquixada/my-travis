ProjectController = o.clazz({
	extend: Controller,
	dom: 'table tbody',

	addListeners: function() {
		this.el().addEventListener('click', function (evt) {
			var url, el = evt.target;

			evt.preventDefault();

			while (el) {
				url = el.getAttribute('href');
				
				if (url) {
					window.open(url);
					break;
				}

				el = el.parentNode;
			}
		});
	},

	clear: function () {
		this.el().innerHTML = [
			'<tr>',
				'<td id="no-projects" colspan="6">',
					'<div>No project has been added until now.</div>',
				'</td>',
			'</tr>'
		].join('');

		Badge.clear();
	},

	getBuildNumber: function (proj) {
		return '#'+proj.last_build_number;
	},

	getFinishedAt: function (proj) {
		if (proj.last_build_finished_at) {
			return moment(proj.last_build_finished_at).fromNow();
		}

		return 'running';	
	},

	getDuration: function (proj) {
		if (proj.last_build_duration) {
			return formatSecs(proj.last_build_duration);
		}

		return '-';
	},

	getIcon: function (proj) {
		switch (proj.last_build_status) {
			case 0:  return '<img class="icon-status" src="imgs/icon-passed.png" title="passed">';
			case 1:  return '<img class="icon-status" src="imgs/icon-failed.png" title="failed">';
			default:
		    if (proj.last_build_finished_at) {
					return '<img class="icon-status" src="imgs/icon-errored.png" title="errored">';
				} else {
					return '<img class="icon-status" src="imgs/icon-started.png" title="started">';
				}
		}
	},

	getName: function (proj) {
		return proj.slug.split('/')[1];
	},

	getUser: function (proj) {
		return proj.slug.split('/')[0];
	},

	render: function() {
		var html = '';
		var user = '';
		var projs = Projs.getSorted();
		var that = this;

		if (projs.length === 0) {
			this.clear();
			return;
		}

		projs.forEach(function (proj) {
			
			if (user !== that.getUser(proj)) {
				user = that.getUser(proj);

				html += '<tr><th colspan="6">'+user+'</th></tr>';
			}


			html += [
				'<tr href="https://travis-ci.org/'+proj.slug+'" '+(proj.last_build_status===1?'class="failed"':'')+'>',
					'<td>'+that.getIcon(proj)+'</td>',
					'<td>'+that.getName(proj)+'</td>',
					'<td>'+that.getBuildNumber(proj)+'</td>',
					'<td>'+that.getDuration(proj)+'</td>',
					'<td>'+that.getFinishedAt(proj)+'</td>',
				'</tr>'
			].join('');
		});

		this.el().innerHTML = html;
	}
});

projectController = new ProjectController();
