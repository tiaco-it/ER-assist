Template.endLayout.events({
  'click #one': function(event, template) {
    event.preventDefault();
    Router.current().render('example', {to: 'tabTemplate'});
    Session.set('tab', 1);
},
  'click #two': function(event, template) {
    event.preventDefault();
    Router.current().render('tlaw', {to: 'tabTemplate'});
    Session.set('tab', 2);
},
  'click #three': function(event, template) {
    event.preventDefault();
    Router.current().render('documentation', {to: 'tabTemplate'});
    Session.set('tab', 3);
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

Template.endLayout.onCreated(function() {
	var l = Laws.findOne(Router.current().params._id);
	lawHolder.push(l.paragraph);
    Session.set('tab', 2);
});

Template.endLayout.onDestroyed( function () {
    lawHolder.pop();
});

Template.documentation.helpers({
    'thisLaw': function() {
        var l = lawHolder[0];
        var lt = Laws.find({'paragraph': l});
        var p = {};
        if (lt.count() > 1) {
            lt.forEach(function (post) {
                if (post.cat === Session.get('category').text) {
                    p = post;
                    return;
                }
            });
        }
        else {
                return Laws.findOne({'paragraph': l});
        }
        return p;
    },
    'path': function() {
        return path;
    }    
});

Template.example.helpers({
    'thisLaw': function() {
        var l = lawHolder[0];
        var lt = Laws.find({'paragraph': l});
        var p = {};
        if (lt.count() > 1) {
            lt.forEach(function (post) {
                if (post.cat === Session.get('category').text) {
                    p = post;
                    return;
                }
            });
        }
        else {
                return Laws.findOne({'paragraph': l});
        }
        return p;
    }  
});

Template.tlaw.helpers({
    'thisLaw': function() {
        var l = lawHolder[0];
        var lt = Laws.find({'paragraph': l});
        var p = {};
        if (lt.count() > 1) {
            lt.forEach(function (post) {
                if (post.cat === Session.get('category').text) {
                    p = post;
                    return;
                }
            });
        }
        else {
                return Laws.findOne({'paragraph': l});
        }
        return p;
    }  
});

Template.registerHelper('thisLaw', function() {
    var l = lawHolder[0];
    var lt = Laws.find({'paragraph': l});
    var p = {};
    if (lt.count() > 1) {
        lt.forEach(function (post) {
            if (post.cat === Session.get('category').text) {
                p = post;
                return;
            }
        });
    }
    else {
        return Laws.findOne({'paragraph': l});
    }
    return p;
});

Template.documentation.helpers({
    'path': function() {
        return path;
    },
    'click #send': function(event, template) {
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

Template.tlaw.onCreated(function() {
    while (lawHolder.length > 0) {
        lawHolder.pop();
    }
    Session.set('tab', 2);
    var l = Laws.findOne(Router.current().params._id);
    lawHolder.push(l.paragraph);
});

Template._tabsHeader.helpers({
    'case': function() {
        return Session.get('category');
    }
});
