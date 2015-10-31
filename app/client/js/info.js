
Template.about.helpers({
    'about': function() {
        return Info.findOne({title: "Om appen"})
    }
});

Template.info.helpers({
    'howto': function() {
        return Info.findOne({title: "Hvordan bruke appen"})
    }
});

Template.conditions.helpers({
    'conditions': function() {
        return Info.findOne({title: "Om utviklerne"})
    }
});
