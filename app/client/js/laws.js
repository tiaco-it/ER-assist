/*
Template.laws.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("laws");
        }
    });
});
*/
Template.law.helpers({
    'thisLaw': function() {
        return Laws.findOne(Router.current().params._id)
    }
});

Template.laws.events({
    'click #law': function() {
        IonNavigation.skipTransitions = true;
    },
    'click .removeLawButton': function(e) {
        var id = e.currentTarget.id;
        Meteor.call('removeLaw', id, function(error, result) {
            if (error) {
                alert(error, reason);
            } else {
                console.log('law removal success');
            }
        })
    }
})

Template.laws.rendered = function () {
    IonNavigation.skipTransitions = true;
};

Template.law.rendered = function () {
    IonNavigation.skipTransitions = true;
};

Template.laws.helpers({
    // returns all laws, sorted by law-category
    'laws': function() {
        var laws = Laws.find({},{
            sort: {paragraph: true}
        })
        return laws && laws;
    },
    // returns a list of law-categories
    'category': function() {
        var distinctEntries = _.uniq(Laws.find({}, {
            sort: {law: 1}, fields: {law: true}
        }).fetch().map(function(x) {
            return x.law;
        }), true);
        return distinctEntries
    },
    // returns all laws for a given category, unique laws only
    'categoryLaws': function(category) {
        var catLaws = Laws.find({law: category}).fetch();
        var uniqueLaws = [];
        var uniqueNames = [];
        $.each(catLaws, function(i, el){
            if($.inArray(el.paragraph, uniqueNames) === -1) {
                uniqueNames.push(el.paragraph);
                uniqueLaws.push(el);
            }
        });
        return uniqueLaws;
    }
});

