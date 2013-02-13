ListController = o.clazz({
	extend: Controller,
	dom: 'table',

	addListeners: function() {
		this.el().addEventListener('click', function (evt) {
			var url, el = evt.target;

			evt.preventDefault();
			
			while (el.tagName.toLowerCase() == 'tr') {
				url = el.getAttribute('href');
				
				if (url) {
					window.open(url);
					break;
				}

				el = el.parentNode;
			}
		});
	},

	remove: function () {
		var tbody, tbodies = this.el().querySelectorAll('tbody');
		
		for (var i = 0; i < tbodies.length; i++) {
			tbody = tbodies[i];
			tbody.parentNode.removeChild(tbody);
		}
	},

	clear: function () {
		var tbody;

		this.remove();

		tbody = document.createElement('tbody');
		tbody.innerHTML = [
			'<tr>',
				'<td id="no-projects" colspan="6">',
					'<div>No project has been added until now.</div>',
				'</td>',
			'</tr>'
		].join('');

		this.el().appendChild(tbody);

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
		switch (proj.status) {
			case 0:  return '<img class="icon-status" src="imgs/icon-passed.png" title="passed">';
			case 1:  return '<img class="icon-status" src="imgs/icon-failed.png" title="failed">';
			default:
		    if (proj.finishedAt) {
					return '<img class="icon-status" src="imgs/icon-errored.png" title="errored">';
				} else {
					return '<img class="icon-status" src="imgs/icon-started.png" title="started">';
				}
		}
	},

	getHref: function (proj) {
		return 'href="https://travis-ci.org/'+proj.slug+'"';
	},

	getClassName: function (proj) {
		return (proj.status===1?'class="failed"':'');
	},

	render: function() {
		var users = Prefs.getUsers();
		var projs = Projs.get();
		var that = this;

		if (isEmptyObject(projs)) {
			this.clear();
			return;
		}

		this.remove();

		users.forEach(function (user) {
			var html = '';
			var tbody;
			var projsUser = projs[user];

			html += '<tr><th colspan="6">'+user+'</th></tr>';

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

			tbody = document.createElement('tbody');
			tbody.setAttribute('user', user);
			tbody.innerHTML = html;

			that.el().appendChild(tbody);
		});
	}
});

projectController = new ListController();
