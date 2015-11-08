pathQueue = new ReactiveArray();
addedItems = {"scases":[], "filters":[], "links":[], "laws":[]};

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
                addedItems["laws"].push(obj);
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

dbCleanup = function() {
    while (addedItems["scases"].length > 0) {
        var obj = addedItems["scases"].pop();
        var id = Startcases.findOne({ 'text': obj.text })._id;
        console.log('ID GET');
        console.log(id);
        Meteor.call('removeStartcase', id, function(error, result) {
            if (error) {
                console.log('removeScaseError')
                console.log(error)
            } else {
                console.log('scase removal success');
            }
        });

    }
    while (addedItems["links"].length > 0) {
        var obj = addedItems["links"].pop();
        var id = Links.findOne({ $and: [ { 'to': obj.to }, {'mark': obj.mark}, { 'from': obj.from } ] })._id;
        console.log('ID GET');
        console.log(id);
        Meteor.call('removeLink', id, function(error, result) {
            if (error) {
                console.log('removeLinkError')
                console.log(error)
            } else {
                console.log('Link removal success');
            }
        });

    }
    while (addedItems["filters"].length > 0) {
        var obj = addedItems["filters"].pop();
        var id = Filters.findOne({ $and: [ { 'text': obj.text }, {'number_of_outcomes': obj.number_of_outcomes} ] })._id;
        console.log('ID GET');
        console.log(id);
        Meteor.call('removeFilter', id, function(error, result) {
            if (error) {
                console.log('removeFilterError')
                console.log(error)
            } else {
                console.log('Filter removal success');
            }
        });

    }
    while (addedItems["laws"].length > 0) {
        var obj = addedItems["laws"].pop();
        var id = Filters.findOne({ $and: [ { 'text': obj.paragraph }, {'category': obj.category} ] })._id;
        console.log('ID GET');
        console.log(id);
        Meteor.call('removeFilter', id, function(error, result) {
            if (error) {
                console.log('removeFilterError')
                console.log(error)
            } else {
                console.log('Filter removal success');
            }
        });

    }
    console.log('dbCleanup called');
}



Template.success.onCreated( function() {
    addPathCleanup();
    Session.set('cancelledPath', false);
})

Template.pathLayout.onCreated( function() {
    Session.set('clean', true);
    Session.set('cancelledPath', true);
})