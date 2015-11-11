Template.success.events({
    'click .homeButton': function() {
        Router.go('home');
    }
})

Template.success.onRendered( function() {
    //if the path is succesfully added, do not remove db items added
    Session.set('cleanDB', false);
})