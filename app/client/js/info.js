Template.infoLayout.events({
  'click #one': function(event, template) {
    event.preventDefault();
    Session.set('itab', 1);
},
  'click #two': function(event, template) {
    event.preventDefault();
    Session.set('itab', 2);
},
  'click #three': function(event, template) {
    event.preventDefault();
    Session.set('itab', 3);
  }
});

Template.infoLayout.helpers({
    templateGestures: {
        'swipeleft .infoSwipe': function (event, templateInstance) {
            if (Session.get('itab')===1){
            Session.set('itab', 2);
            } else if (Session.get('itab')===2){
            Session.set('itab', 3);
            }
        },
        'swiperight .infoSwipe': function (event, templateInstance) {
            if (Session.get('itab')===2){
            Session.set('itab', 1);
            } else if (Session.get('itab')===3){
            Session.set('itab', 2);
            }
        }
    }
});

Template.itabs.helpers({
    'One': function() {
        if (Session.get('itab')===1){
            return true;
        } else {
            return false;
        }
    },
    'Two': function() {
        if (Session.get('itab')===2){
            return true;
        } else {
            return false;
        }
    },
    'Three': function() {
        if (Session.get('itab')===3){
            return true;
        } else {
            return false;
        }
    }
});

Template.infoTriple.helpers({
    'One': function() {
        if (Session.get('itab')===1){
            return true;
        } else {
            return false;
        }
    },
    'Two': function() {
        if (Session.get('itab')===2){
            return true;
        } else {
            return false;
        }
    },
    'Three': function() {
        if (Session.get('itab')===3){
            return true;
        } else {
            return false;
        }
    },
    'about': function() {
        console.log(Info.findOne({'title': "Om appen"}))
        return Info.findOne({title: "Om appen"})
    },
    'howto': function() {
        return Info.findOne({title: "Hvordan bruke appen"})
    },
    'conditions': function() {
        return Info.findOne({title: "Om utviklerne"})
    }
});

Template.infoTriple.onCreated(function() {
    Session.set('itab', 2);
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("info");
        }
    });
});
