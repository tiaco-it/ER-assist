Template.linksLayout.events({
  'click #one': function(event, template) {
    event.preventDefault();
    Router.current().render('urls', {to: 'tabTemplate'});
    Session.set('ltab', 1);
},
  'click #two': function(event, template) {
    event.preventDefault();
    Router.current().render('numbers', {to: 'tabTemplate'});
    Session.set('ltab', 2);
    }
});

Template.linksLayout.helpers({
    templateGestures: {
        'swipeleft .linksSwipe': function (event, templateInstance) {
            if (Session.get('ltab')===1){
                Router.current().render('numbers', {to: 'tabTemplate'});
                Session.set('ltab', 2);
            }
        },
        'swiperight .linksSwipe': function (event, templateInstance) {
            if (Session.get('ltab')===2){
                Router.current().render('urls', {to: 'tabTemplate'});
                Session.set('ltab', 1);
            }
        }
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

Template.linksLayout.onCreated(function() {
    Session.set('ltab', 1);
});

Template.urls.helpers({
    'urls': function() {
        var urls = Urls.find({});
        return urls && urls
    }
});

Template.urls.events({
    'click .removeUrl': function(e) {
        var id = e.currentTarget.id;
        Meteor.call('removeUrl', id, function(error, result) {
            if (error) {
                alert(error.reason)
            } else {
                console.log('Url removal success');
            }
        });
    }
})

Template.numbers.events({
    'click .removeNumber': function(e) {
        var id = e.currentTarget.id;
        Meteor.call('removeNumber', id, function(error, result) {
            if (error) {
                alert(error.reason)
            } else {
                console.log('Number removal success');
            }
        });
    }
})

Template.numbers.helpers({
    'numbersEkst': function() {
        var numbers = Numbers.find({ 'internal': false });
        return numbers && numbers
    },
    'numbersInt': function() {
        var numbers = Numbers.find({ 'internal': true })
        return numbers && numbers
    }
});
