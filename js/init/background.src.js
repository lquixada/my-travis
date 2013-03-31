/*globals Badge, Projs, Updater */

$(document).ready(function () {
	Badge.boot();
	Badge.update(Projs.get());

	Updater.start();
});
