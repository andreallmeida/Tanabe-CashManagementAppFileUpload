/*global QUnit*/

sap.ui.define([
	"tanabecashmanagement/file_content_upload/controller/Upload.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Upload Controller");

	QUnit.test("I should test the Upload controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
