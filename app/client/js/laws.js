Template.laws.helpers({
    'laws': function() {
        var laws = Laws.find({});
        return laws && laws
    }
});

Template.law.helpers({
    'thisLaw': function() {
        return Laws.findOne(Router.current().params._id)
    }
});