Template.next.helpers({
    'current': function() {
        return Filters.findOne(Router.current().params._id);
    },
    'currentLinks': function() {
        return Links.find( { 'from._id': Router.current().params._id } );
    },
    'to': function(link) {
        return link.to;
    },
    'toLaw': function(link) {
        if (typeof Laws.findOne({'text': link.to.text }) !== 'undefined') {
            return true;
        }
        return false;
    }
});

Template.next.rendered = function() {
    IonNavigation.skipTransitions = true;
}

Template.nextHeader.helpers({
    'case': function() {
        return Session.get('category');
    } 
})

Template.next.events({
    'click .firstLevelButton': function (e) {
        var item = {};
        item['question'] = $(e.currentTarget).text();
        path.push(item);
        Session.set('nextAdded', true);
    }
})

Template.next.onCreated( function() {
    if (Session.get('nextAdded')) {
        path.pop();
    }
});