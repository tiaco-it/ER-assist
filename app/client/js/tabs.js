var lawHolder = new Array();

Template.endLayout.events({
  'click .one': function(event, template) {
    event.preventDefault();
    Session.set('tab', 1);
    console.log('ONE');
},
  'click .two': function(event, template) {
    event.preventDefault();
    Session.set('tab', 2);
    console.log('TWO');
},
  'click .three': function(event, template) {
    event.preventDefault();
    Session.set('tab', 3);
    console.log('THREE');
  }
});

Template.triple.helpers({
    'One': function() {
        if (Session.get('tab')===1){
            console.log('OneTrue');
            return true;
        } else {
            console.log('OneFalse');
            return false;
        }
    },
    'Two': function() {
        if (Session.get('tab')===2){
            console.log('TwoTrue');
            return true;
        } else {
            console.log('TwoFalse');
            return false;
        }
    },
    'Three': function() {
        if (Session.get('tab')===3){
            console.log('ThreeTrue');
            return true;
        } else {
            console.log('ThreeFalse');
            return false;
        }
    },
    'thisLaw': function() {
        var l = lawHolder[0]
        return Laws.findOne(l)
    }
})

Template.endLayout.onCreated(function() {
    lawHolder.push(Router.current().params._id);
});

Template.triple.onCreated(function() {
    Session.set('tab', 2);
    lawHolder.push(Router.current().params._id);
});
