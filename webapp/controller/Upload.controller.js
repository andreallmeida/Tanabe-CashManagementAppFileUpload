sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment',
    "sap/m/MessageBox"
],
function (Controller, Fragment, MessageBox) {
    "use strict";

    return Controller.extend("tanabe.cashmanagement.filecontentupload.controller.Upload", {
        onInit: function () {

        },

        //
        // Event : Button Click for Inforamtion 
        //        
        _onPressInformationButton: function(oEvent){
            
            var oButton = oEvent.getSource(),
            oView = this.getView();

            // create popover
            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "tanabe.cashmanagement.filecontentupload.view.Information",           
                    controller: this
                }).then(function(oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._pPopover.then(function(oPopover) {
                oPopover.openBy(oButton);
            });            

        },

        //
        // Event : Button Click for File Upload 
        //
        _onPressUploadButton: function (oEvent) {

            let that = this;

            let oJsonModel = this.getView().getModel("currentData");

            // File Uploader Reference
            var fU = this.getView().byId("idfileUploader");
            var fileName = fU.getValue();
            var fileObject = jQuery.sap.domById(fU.getId() + "-fu").files[0];

            // FileName and FileType properties
            oJsonModel.setProperty("/uploadedFileName", fileObject.name);
            oJsonModel.setProperty("/uploadedFileType", fileObject.type);

            // Create a File Reader object
            var reader = new FileReader();

            // dispatch a "File Read" 
            reader.readAsText(fileObject);
            // reader.readAsBinaryString(fileObject);

            // Upload Event
            reader.onload = function (event) {

                // OdataModel Reference
                let oDataModel = this.getView().getModel();

                let vBodyData = {
                    fileDetail: {
                        fileName: this.getView().getModel("currentData").getProperty("/uploadedFileName"),
                        fileType: this.getView().getModel("currentData").getProperty("/uploadedFileType"),
                        fileContent: event.target.result
                    }
                };


                // Define ContextBinding to Call ACTION inside CAP Service and
                // set parameters values to execute it
                const oActionODataContextBinding = oDataModel.bindContext("/fileUpload(...)");
                oActionODataContextBinding.setParameter("fileDetail", vBodyData.fileDetail);
                oActionODataContextBinding.invoke().then(
                    (oResult) => {
                        const oActionContext = oActionODataContextBinding.getBoundContext();
                        console.log(oActionContext.getObject());
                        MessageBox.success("File Uploadad Successfully!");                        
                    },
                    (oError) => {
                        MessageBox.error(oError.error.message,);
                    });

            }.bind(this);
        }
        
    });
});
