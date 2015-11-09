pathQueue = new ReactiveArray();
addedItems = {"scases":[], "filters":[], "links":[], "laws":[]};
markCount = 0;
marks = [];
topElement = [];
nextFrom = [];

Template.itemToAdd.helpers({
    'next': function() {
        var b = pathQueue.list();
        if (!(b[0] === 'JA') && !(b[0] === 'NEI')) {
            Session.set('showQ', false);
        } else {
            Session.set('showQ', true);
        }
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
    'click .connectN': function(event, template) {
        Router.current().render('addN', {to: 'forms'});
    },
    'click .connectQ': function(event, template) {
        if (Session.get('firstFilterCreated')){
        Router.current().render('addQ', {to: 'forms'});
        } else {
            Router.current().render('addFirstQ', {to: 'forms'});
        }
    },
    'click .connectL': function(event, template) {
        Router.current().render('chooseL', {to: 'forms'});
    }
})

Template.pathButtons.helpers({
    'showQ': function() {
        console.log(Session.get('showQ'));
        return Session.get('showQ');
    }
});

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
        console.log('this is the top element and next in queue');
        console.log(topElement[0])
        console.log(pathQueue[0])
        if (pathQueue[0] === topElement[0]) {
            if (nextFrom.length > 0) {
                    Session.set('From', nextFrom.shift().text);
            } else {
                Session.set('From', Session.get('To'));
            }
            topElement.shift();
        }
        var from = Filters.findOne({ 'text': Session.get('From')});
        if (from === undefined) {
            var from = Startcases.findOne({ 'text': Session.get('From')})     
        }
        var to = Laws.findOne({ 'paragraph': event.currentTarget.id })
        if (pathQueue.length > 0) {
            var mark = pathQueue[0];
        } else {
            var mark = "";
        }
        if (insertLink(from, mark, to)) {
            console.log('LawLinkAddSuccess');
        } else {
            alert('failed to link law, try again');
        }
        pathQueue.shift();
        if (pathQueue.length < 1) {
            Router.go('pathAdded')
        }
            Router.current().render('blank', {to: 'forms'});
        }
    });

addPathCleanup = function() {
    pathQueue = new ReactiveArray();
    topElement = [];
    nextFrom = [];
    Session.set('firstFilterCreated', undefined);
    Session.set('From', undefined);
    Session.set('To', undefined);
    Session.set('cleanPath', false);
    console.log('cleanup called')
    Session.set('showQ', true);
    markCount = 0;
    marks = [];
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
    Session.set('cleanDB', false);
}

Template.addQ.helpers({
    'default': function() {
        var obj = {}
        obj["number_of_outcomes"] = 2;
        return obj;
    }
});

Template.addFirstQ.helpers({
    'default': function() {
        var obj = {}
        obj["number_of_outcomes"] = 2;
        return obj;
    }
});

Template.success.onCreated( function() {
    //if the path is succesfully added, do not remove db items added
    Session.set('cleanDB', false);
})

Template.pathLayout.onCreated( function() {
    Session.set('cleanPath', true);
    Session.set('showQ', true);
})