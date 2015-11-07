pathQueue = new ReactiveArray();

Template.itemToAdd.helpers({
    'next': function() {
        var b = pathQueue.list();
        return b[0];
    }
})

Template.caseadd.helpers({ 
    'selectedCase': function() {
        console.log(Startcases.findOne(Router.current().params._id));
        return Startcases.findOne(Router.current().params._id);
    }
});

Template.pathButtons.events({
    'click .connectQ': function(event, template) {
        if (Session.get('first')){
        Router.current().render('addQ', {to: 'forms'});
        } else {
            Router.current().render('addFirstQ', {to: 'forms'});
        }
    },
    'click .connectL': function(event, template) {
        Router.current().render('chooseL', {to: 'forms'});
    }
})

Template.chooseL.helpers({
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

Template.chooseL.events({
    'click .lawChooser': function(event) {
        Session.set('chosenLaw', event.currentTarget.id);
        console.log(Session.get('chosenLaw'));
        var from = Filters.findOne({ 'text': Session.get('text2')});
        var to = Laws.findOne({ 'paragraph': event.currentTarget.id })
        var obj = {'from': from, 'mark': pathQueue[0], 'to': to};
        Meteor.call('addLink2', obj, function(error, result) {
            if (error) {
                alert(error.reason)
            } else {
                console.log('LinkAddSuccess');
            }
        });
        pathQueue.shift();
        if (pathQueue.length < 1) {
            Router.go('pathAdded')
        } else {
            console.log(pathQueue[0]);
            console.log(pathQueue);
            Router.current().render('blank', {to: 'forms'});
        }
    }
});
