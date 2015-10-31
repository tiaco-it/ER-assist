
Template.links.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("urls");
        }
    });
});

Template.links.helpers({
    'links': function() {
        var urls = Urls.find({});
        return urls && urls
    }
});

//Template.link.helpers({
//	'thisLink': function() {
//		return Urls.findOne(Router.current().params._id)
//	}
//})