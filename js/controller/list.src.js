ListController = o.clazz({
	extend: Controller,
	dom: 'table',

	addListeners: function() {
		var that = this;

		this.el().on('click', 'tr', function () {
			url = this.getAttribute('href');
			window.open(url);
		});
	},

	remove: function () {
		this.el().find('tbody').remove();
	},

	clear: function () {
		this.remove();

		this.el().append([
			'<tr>',
				'<td id="no-projects" colspan="6">',
					'<div>No project has been added until now.</div>',
				'</td>',
			'</tr>'
		].join(''));

		Badge.clear();
	},

	getFinishedAt: function (proj) {
		if (proj.finishedAt) {
			return moment(proj.finishedAt).fromNow();
		}

		return 'running';	
	},

	getDuration: function (proj) {
		if (proj.duration) {
			return formatSecs(proj.duration);
		}

		return '-';
	},

	getIcon: function (proj) {
		return '<img class="icon-status" src="imgs/icon-'+proj.status+'.png" title="'+proj.status+'">';
	},

	getHref: function (proj) {
		return 'href="https://travis-ci.org/'+proj.user+'/'+proj.name+'"';
	},

	getClassName: function (proj) {
		return (proj.status==='failed'?'class="failed"':'');
	},

	render: function() {
		var users = Prefs.getUsers();
		var projs = Projs.get();
		var that = this;

		if (users.length=== 0) {
			this.clear();
			return;
		}

		this.remove();

		users.forEach(function (user) {
			var html;
			var projsUser = projs[user];

			html = '<tbody user="'+user+'">';
			html += '<tr><th colspan="6">'+user+'</th></tr>';

			if (projsUser) {
				projsUser.forEach(function (proj) {
					html += [
						'<tr '+that.getHref(proj)+' '+that.getClassName(proj)+'>',
							'<td>'+that.getIcon(proj)+'</td>',
							'<td>'+proj.name+'</td>',
							'<td>'+'#'+proj.build+'</td>',
							'<td>'+that.getDuration(proj)+'</td>',
							'<td>'+that.getFinishedAt(proj)+'</td>',
						'</tr>'
					].join('');
				});
			} else {
				html += '<tr><td colspan="6"><em>no projects found.</em></td></tr>';
			}

			html += '</tbody>'

			that.el().append(html);
		});
	}
});

projectController = new ListController();
