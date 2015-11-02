Meteor.subscribe("uploads");
Template.upload.events({
    'click #deleteFileButton ': function (event) {
        console.log("deleteFile button ", this);
        Uploads.remove({_id:this._id});

    },
    'change .your-upload-class': function (event, template) {
        console.log("uploading...")
        FS.Utility.eachFile(event, function (file) {
            console.log("each file...");
            var yourFile = new FS.File(file);
            yourFile.creatorId = 123; // todo
            Uploads.insert(yourFile, function (err, fileObj) {
                console.log("callback for the insert, err: ", err);
                if (!err) {
                    console.log("inserted without error");
                }
                else {
                    console.log("there was an error", err);
                }
            });
        });
    }
});

Template.upload.helpers({
    theFiles: function () {
        return Uploads.find();
    }
});