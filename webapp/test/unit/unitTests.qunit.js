/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"tanabecashmanagement/file_content_upload/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
