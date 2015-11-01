
Template.about.helpers({
    'about': function() {
        return Info.findOne({title: "Om appen"})
    }
});

Template.infoOriginal.helpers({
    'howto': function() {
        return Info.findOne({title: "Hvordan bruke appen"})
    }
});

Template.conditions.helpers({
    'conditions': function() {
        return Info.findOne({title: "Om utviklerne"})
    }
});

Template.infoLayout.events({
  'click #one': function(event, template) {
    event.preventDefault();
    Session.set('itab', 1);
    console.log('ONE');
},
  'click #two': function(event, template) {
    event.preventDefault();
    Session.set('itab', 2);
    console.log('TWO');
},
  'click #three': function(event, template) {
    event.preventDefault();
    Session.set('itab', 3);
    console.log('THREE');
  }
});

Template.itabs.helpers({
    'One': function() {
        if (Session.get('itab')===1){
            console.log('OneTrue');
            return true;
        } else {
            console.log('OneFalse');
            return false;
        }
    },
    'Two': function() {
        if (Session.get('itab')===2){
            console.log('TwoTrue');
            return true;
        } else {
            console.log('TwoFalse');
            return false;
        }
    },
    'Three': function() {
        if (Session.get('itab')===3){
            console.log('ThreeTrue');
            return true;
        } else {
            console.log('ThreeFalse');
            return false;
        }
    }
});

Template.infoTriple.helpers({
    'One': function() {
        if (Session.get('itab')===1){
            console.log('OneTrue');
            return true;
        } else {
            console.log('OneFalse');
            return false;
        }
    },
    'Two': function() {
        if (Session.get('itab')===2){
            console.log('TwoTrue');
            return true;
        } else {
            console.log('TwoFalse');
            return false;
        }
    },
    'Three': function() {
        if (Session.get('itab')===3){
            console.log('ThreeTrue');
            return true;
        } else {
            console.log('ThreeFalse');
            return false;
        }
    },
    'about': function() {
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
});
