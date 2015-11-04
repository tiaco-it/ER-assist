Template.infoLayout.events({
  'click #one': function(event, template) {
    event.preventDefault();
    Router.current().render('about', {to: 'tabTemplate'});
    Session.set('itab', 1);
},
  'click #two': function(event, template) {
    event.preventDefault();
    Router.current().render('howto', {to: 'tabTemplate'});
    Session.set('itab', 2);
},
  'click #three': function(event, template) {
    event.preventDefault();
    Router.current().render('conditions', {to: 'tabTemplate'});
    Session.set('itab', 3);
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

Template.infoLayout.onCreated(function() {
    Session.set('itab', 2);
});

Template.about.helpers({
    'about': function() {
        console.log(Info.findOne({'title': "Om appen"}))
        return Info.findOne({title: "Om appen"})
    }
});

Template.howto.helpers({
    'howto': function() {
        return Info.findOne({title: "Hvordan bruke appen"})
    }
});

Template.conditions.helpers({
    'conditions': function() {
        return Info.findOne({title: "Om utviklerne"})
    }
});
