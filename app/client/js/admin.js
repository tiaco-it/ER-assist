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
