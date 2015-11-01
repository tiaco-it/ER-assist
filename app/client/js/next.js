Template.next.helpers({
    'current': function() {
        return Filters.findOne(Router.current().params._id);
    },
    'currentLinks': function() {
        return Links.find( { 'from._id': Router.current().params._id } );
    },
    'to': function(link) {
        return link.to;
    }
});

Template.next.rendered = function() {
    IonNavigation.skipTransitions = true;
}

Template.nextHeader.helpers({
    'case': function() {
        console.log(Session.get('category'));
        return Session.get('category');
    } 
})