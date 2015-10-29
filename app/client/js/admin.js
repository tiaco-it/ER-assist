Template.edit.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("element", Router.current().params._id);
            self.subscribe("laws");
            self.subscribe("filters");
            self.subscribe("links");
        }
    });
});

Template.edit.helpers({
    'selectedDoc': function() {
        return Elements.findOne(Router.current().params._id);
    }
});

Template.editcase.onCreated( function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            Meteor.subscribe("startcase", Router.current().params._id);
        }
    });
});


Template.editcase.helpers({ 
    'selectedDoc': function() {
        console.log(Startcases.findOne(Router.current().params._id));
        return Startcases.findOne(Router.current().params._id);
    }
});

Template.admincases.helpers({
    'cases': function() {
        var cases = Startcases.find({});
        return cases && cases
    }
});

Template.adminlaws.helpers({
    'laws': function() {
        var laws = Laws.find({});
        return laws && laws
    }
});

Template.adminlinks.helpers({
    'links': function() {
        var links = Links.find({});
        return links && links
    }
});

Template.adminfilters.helpers({
    'filters': function() {
        var filters = Filters.find({});
        return filters && filters
    }
});



