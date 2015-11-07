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
        if (Session.get('firstFilterCreated')) {
            var from = Filters.findOne({ 'text': Session.get('From')});
        } else {
            var from = Startcases.findOne({ 'text': Session.get('From')})
        }
        var to = Laws.findOne({ 'paragraph': event.currentTarget.id })
        if (pathQueue[0]) {
            var obj = {'from': from, 'mark': pathQueue[0], 'to': to};
        } else {
            var obj = {'from': from, 'mark': "", 'to': to};
        }
        console.log('Link that got added')
        console.log(obj);
        Meteor.call('addLink2', obj, function(error, result) {
            if (error) {
                alert(error.reason)
            } else {
                console.log('LawLinkAddSuccess');
            }
        });
        pathQueue.shift();
        if (pathQueue.length < 1) {
            Router.go('pathAdded')
        } else {
            if (pathQueue[0] === 'NEI') {
            } else if (pathQueue[0] === 'JA') {
            Session.set('From', Session.get('To'));
        }


            Router.current().render('blank', {to: 'forms'});
        }
    }
});

addPathCleanup = function() {
    pathQueue = new ReactiveArray();
    Session.set('firstFilterCreated', false);
    Session.set('From', undefined);
    Session.set('To', undefined);
    console.log('cleanup called')
}

Template.success.onCreated( function() {
    addPathCleanup();
})