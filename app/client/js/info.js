Template.info.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("info");
        }
    });
});

Template.info.helpers({
    'info': function() {
        var info = Info.find({});
        return info && info
    }
});

Template.infoElement.helpers({
    'thisInfo': function() {
        return Info.findOne(Router.current().params._id)
    }
});