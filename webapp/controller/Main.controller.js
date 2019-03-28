sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
	"use strict";

	var editContactDialog;
	var contactModel = new JSONModel();
	var dialogModel = new JSONModel();

	return Controller.extend("alex.test.DialogTricks.controller.Main", {
		onInit: function () {
			//Set the 'contactModel' to the 'Main' view:
			this.getView().setModel(contactModel, "contactModel");
		},

		/**
		 * Event handler for the 'Edit' (pen) button
		 */
		onEditContact: function () {
			// If this is the first time the dialog is opened we should load its fragment XML:
			if (!editContactDialog) {
				// Note this is loading the fragment synchronously. After UI5 version 1.58 you should use sap.ui.core.Fragment.load() which is asynchronous:
				editContactDialog = sap.ui.xmlfragment("alex.test.DialogTricks.fragment.EditContactDialog", this);
				// Allows the dialog to bind to models which are set to the 'Main' view. It is not used in this demo, but it is good practice to have it: 
				this.getView().addDependent(editContactDialog);
				// Set the 'dialogModel' to the edit dialog:
				editContactDialog.setModel(dialogModel, "dialogModel");
			}
			// Copy the contents of the 'Main' view fields to the dialog fields for editing. The "true" argument specifies 
			// that you should merge the data from contactModel into dialogModel.  If you set it to false you will replace 
			// the data and both models will point to the same object, which defeats the purpose of having 2 models:
			dialogModel.setData(contactModel.getData(), true);
			editContactDialog.open();
		},

		onDialogSave: function () {
			// Copy the contents from the dialog back to the 'Main' view. It's the opposite to dialogModel.setData() in onEditContact():
			contactModel.setData(dialogModel.getData(), true);
			editContactDialog.close();
		},

		onDialogCancel: function () {
			editContactDialog.close();
		}
	});
});