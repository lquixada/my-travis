ListController = o.clazz({
	extend: Controller,
	dom: 'table',
	
	init: function () {
		var that = this;

		$(document).ready(function () {
			that.render();
			that.addListeners();
		});
	},

	addListeners: function() {
		this.el().on('click', 'tr', function () {
			var url = this.getAttribute('href');

			if (url) {
				window.open(url);
			}
		});

		this.el().on('click', 'button.remove', function () {
			var tbody = $(this).closest('tbody'),
				user = tbody.attr('user');
			
			Prefs.removeUser(user);
			tbody.remove();
		});
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

	getClassName: function (proj) {
		return (proj.status==='failed'?'class="failed"':'');
	},

	getDuration: function (proj) {
		if (proj.duration) {
			return formatSecs(proj.duration);
		}

		return '-';
	},

	getFinishedAt: function (proj) {
		if (proj.finishedAt) {
			return moment(proj.finishedAt).fromNow();
		}

		return 'running';	
	},

	getHref: function (proj) {
		return 'href="https://travis-ci.org/'+proj.user+'/'+proj.name+'"';
	},

	getIcon: function (proj) {
		return '<img class="icon-status" src="imgs/icon-'+proj.status+'.png" title="'+proj.status+'">';
	},

	remove: function () {
		this.el().find('tbody').remove();
	},

	render: function() {
		var users = Prefs.getUsers();
		var projs = Projs.get();
		var that = this;
		var html = '';

		if (users.length=== 0) {
			this.clear();
			return;
		}

		this.remove();

		users.forEach(function (user) {
			var projsUser = projs[user];

			html += '<tbody user="'+user+'">';
			html += '<tr><th colspan="6">'+user+' <button class="remove">x</button></th></tr>';

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

			html += '</tbody>';
		});

		this.el().append(html);
	}
});

projectController = new ListController();
