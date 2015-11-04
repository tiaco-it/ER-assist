Template.endLayout.events({
  'click #one': function(event, template) {
    event.preventDefault();
    Session.set('tab', 1);
    console.log('ONE');
},
  'click #two': function(event, template) {
    event.preventDefault();
    Session.set('tab', 2);
    console.log('TWO');
},
  'click #three': function(event, template) {
    event.preventDefault();
    Session.set('tab', 3);
    console.log('THREE');
}
});

Template.triple.helpers({
    'One': function() {
        if (Session.get('tab')===1){
            return true;
        } else {
            return false;
        }
    },
    'Two': function() {
        if (Session.get('tab')===2){
            return true;
        } else {
            return false;
        }
    },
    'Three': function() {
        if (Session.get('tab')===3){
            return true;
        } else {
            return false;
        }
    },
    'thisLaw': function() {
        var l = lawHolder[0];
        var lt = Laws.find(l);
        if (lt.count() > 1) {
            lt.forEach(function (post) {
                console.log(post.category);
                console.log(Session.get('category').text);
                if (post.category === Session.get('category').text) {
                    console.log('triggered fit');
                    return post;
                }
            });
        }
    },
    'path': function() {
        return path;
    }
});

Template.triple.events({
    'click #send': function(event, template) {
        console.log('triggered!');
        IonPopup.prompt({
            title: 'Email',
            template: 'Vennligst skriv inn email',
            okText: 'Submit',
            inputType: 'text',
            inputPlaceholder: 'Din email',
            onOk: function(event, response) {
                Meteor.call('sendEmail',
                response,
                'kontakt@tiaco.it',
                'Hello from Meteor!',
                'This is a test of Email.send.');
            }
    });
  }
});

Template.toptabs.helpers({
    'One': function() {
        if (Session.get('tab')===1){
            return true;
        } else {
            return false;
        }
    },
    'Two': function() {
        if (Session.get('tab')===2){
            return true;
        } else {
            return false;
        }
    },
    'Three': function() {
        if (Session.get('tab')===3){
            return true;
        } else {
            return false;
        }
    }
});

Template.triple.onCreated(function() {
    while (lawHolder.length > 0) {
        lawHolder.pop();
    }
    Session.set('tab', 2);
    var l = Laws.findOne(Router.current().params._id);
    console.log(l.paragraph);
    lawHolder.push(l.paragraph);
});

Template._tabsHeader.helpers({
    'case': function() {
        return Session.get('category');
    }
});