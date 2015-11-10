/*
Template.editLayout.onCreated(function() {
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
*/
Template.editLayout.helpers({
    'selectedDoc': function() {
        return Elements.findOne(Router.current().params._id);
    }
});

/*
Template.editcase.onCreated( function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            Meteor.subscribe("startcase", Router.current().params._id);
        }
    });
});
*/

Template.editcase.helpers({ 
    'selectedDoc': function() {
        console.log(Startcases.findOne(Router.current().params._id));
        return Startcases.findOne(Router.current().params._id);
    }
});

Template.editnumber.helpers({ 
    'selectedDoc': function() {
        console.log(Numbers.findOne(Router.current().params._id));
        return Numbers.findOne(Router.current().params._id);
    }
});

Template.editurl.helpers({ 
    'selectedDoc': function() {
        return Urls.findOne(Router.current().params._id);
    }
});

Template.editlaw.helpers({ 
    'selectedDoc': function() {
        return Laws.findOne(Router.current().params._id);
    }
});

Template.editinfo.helpers({ 
    'selectedDoc': function() {
        return Info.findOne(Router.current().params._id);
    }
});

Template.editfilter.helpers({ 
    'selectedDoc': function() {
        return Filters.findOne(Router.current().params._id);
    }
});

Template.editlink.helpers({ 
    'selectedDoc': function() {
        return Links.findOne(Router.current().params._id);
    }
});
