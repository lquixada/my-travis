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
		var that = this;

		this.el().on('click', 'tr', function () {
			var url = this.getAttribute('href');

			if (url) {
				window.open(url);
			}
		});

		this.el().on('click', 'button.remove', function () {
			var button = $(this);

			if (!button.next().is('.confirm')) {
				button.after([
					'<span class="confirm">',
						'are you sure?',
						'<span class="option yes">yes</span>',
						'<span class="option no">no</span>',
					'</span>'
				].join(''));
			}

			// Without setTimeout, transition does not work
			setTimeout(function () {
				button.next().toggleClass('visible');
			}, 100);
		});

		this.el().on('click', 'span.option.yes', function () {
			var tbody = $(this).closest('tbody'),
				user = tbody.attr('user');
			
			Prefs.removeUser(user);
			Projs.removeUser(user);

			Badge.update(Projs.get());

			that.render();
		});

		this.el().on('click', 'span.option.no', function () {
			$(this).parent().removeClass('visible');
		});
	},

	clear: function () {
		this.remove();
		this.showMessage();

		Badge.clear();
	},

	compileProjTemplate: function (proj) {
		return [
			'<tr '+this.getHref(proj)+' '+this.getClassName(proj)+'>',
				'<td>'+this.getIcon(proj)+'</td>',
				'<td>'+proj.name+'</td>',
				'<td>'+'#'+proj.build+'</td>',
				'<td>'+this.getDuration(proj)+'</td>',
				'<td>'+this.getFinishedAt(proj)+'</td>',
			'</tr>'
		].join('');
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
			html += '<tbody user="'+user+'">';
			html += '<tr><th colspan="6">'+user+' <button class="remove" title="remove user"></button></th></tr>';

			if (projs[user]) {
				html += projs[user].map(this.compileProjTemplate, this).join('');
			} else {
				html += '<tr><td class="message" colspan="6"><em>no projects found.</em></td></tr>';
			}
			
			html += '</tbody>';
		}, this);

		this.el().append(html);
	},

	showMessage: function () {
		this.el().append([
			'<tr>',
				'<td class="message" colspan="6">',
					'<div id="no-projects">No project has been added until now.</div>',
				'</td>',
			'</tr>'
		].join(''));
	}
});

listController = new ListController();
