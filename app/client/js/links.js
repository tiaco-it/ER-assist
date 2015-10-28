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