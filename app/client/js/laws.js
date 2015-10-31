Template.laws.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("laws");
        }
    });
});

Template.law.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("laws");
        }
    });
});

Template.laws.helpers({
    // returns all laws, sorted by law-category
    'laws': function() {
        var laws = Laws.find({},{
            sort: {law: true}
        });
        return laws && laws
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
    // returns all laws for a given category
    'categoryLaws': function(category) {
        var categoryLaws = Laws.find({law: category});
        console.log("TEST:",  categoryLaws);
        return categoryLaws && categoryLaws
    }
});

Template.law.helpers({
    'thisLaw': function() {
        return Laws.findOne(Router.current().params._id)
    }
});
