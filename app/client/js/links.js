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
    'urls': function() {
        var urls = Urls.find({});
        return urls && urls
    },
    'numbersEkst': function() {
        var numbers = Numbers.find({ 'type': "Ekstern" });
        return numbers && numbers
    },
    'numbersInt': function() {
        var numbers = Numbers.find({ 'type': "Intern" })
        return numbers && numbers
    }
});

Template.linksDouble.onCreated(function() {
    Session.set('ltab', 1);
});
