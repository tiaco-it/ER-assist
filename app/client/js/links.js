Template.linksLayout.events({
  'click #one': function(event, template) {
    event.preventDefault();
    Session.set('ltab', 1);
},
  'click #two': function(event, template) {
    event.preventDefault();
    Session.set('ltab', 2);
}
});

Template.ltabs.helpers({
    'One': function() {
        if (Session.get('ltab')===1){
            return true;
        } else {
            return false;
        }
    },
    'Two': function() {
        if (Session.get('ltab')===2){
            return true;
        } else {
            return false;
        }
    }
});

Template.linksDouble.helpers({
    'One': function() {
        if (Session.get('ltab')===1){
            return true;
        } else {
            return false;
        }
    },
    'Two': function() {
        if (Session.get('ltab')===2){
            return true;
        } else {
            return false;
        }
    },
    'links': function() {
        var urls = Urls.find({});
        return urls && urls
    }
});

Template.linksDouble.onCreated(function() {
    Session.set('ltab', 1);
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("urls");
        }
    });
});
