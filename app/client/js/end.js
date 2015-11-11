getLaw = function() {
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
    if (jQuery.isEmptyObject(p)) {
        var law = Laws.findOne({'paragraph': l})
        return law;
    }
    console.log(p);
    return p;
}

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

Template.endLayout.helpers({
    templateGestures: {
        'swipeleft .endSwipe': function (event, templateInstance) {
            if (Session.get('tab')===1){
                Router.current().render('tlaw', {to: 'tabTemplate'});
                Session.set('tab', 2);
            } else if (Session.get('tab')===2){
                Router.current().render('documentation', {to: 'tabTemplate'});
                Session.set('tab', 3);
            }
        },
        'swiperight .endSwipe': function (event, templateInstance) {
            if (Session.get('tab')===2){
                Router.current().render('example', {to: 'tabTemplate'});
                Session.set('tab', 1);
            } else if (Session.get('tab')===3){
                Router.current().render('tlaw', {to: 'tabTemplate'});
                Session.set('tab', 2);
            }
        }
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

Template.documentation.helpers({
    'thisLaw': function() {
        return getLaw();
    },
    'path': function() {
        return path;
    },
    'relatedDocs': function() {
        return getLaw().reldocs;
    },
    'anyRelated': function() {
        if (getLaw().reldocs.length > 0) {
            return true;
        }
        return false;
    }
});    

Template.documentation.events({
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
    },
    'click .openDoc': function(e) {
        window.location = '/docs/' + e.currentTarget.id;
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
        if (jQuery.isEmptyObject(p)) {
        console.log(Laws.findOne({ 'paragraph': l}))
        return Laws.findOne({'paragraph': l});
        }
        console.log('got p')
        console.log(p)
        return p;
    }  
});

Template.example.onCreated(function() {
    if (Laws.findOne() === undefined) {
        this.subscribe('laws');
    }
})

Template.documentation.onCreated(function() {
    if (Laws.findOne() === undefined) {
        this.subscribe('laws');
    }
})

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
        if (jQuery.isEmptyObject(p)) {
        console.log(Laws.findOne({ 'paragraph': l}))
        return Laws.findOne({'paragraph': l});
        }
        console.log('got p')
        console.log(p)
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

Template.tlaw.onCreated(function() {
    if (Laws.findOne() === undefined) {
        this.subscribe('laws');
    }
    var l = Laws.findOne(Router.current().params._id);
    if (typeof l !== 'undefined') {
        while (lawHolder.length > 0) {
            lawHolder.pop();
        }
        Session.set('tab', 2);
        lawHolder.push(l.paragraph);     
    }
});

Template._tabsHeader.helpers({
    'case': function() {
        return Session.get('category');
    }
});
