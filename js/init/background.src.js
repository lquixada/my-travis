/*globals Badge, Projs, Updater */

$(document).ready(function () {
	Badge.update(Projs.get());

	Updater.start();
});
