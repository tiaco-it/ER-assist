pathQueue = new ReactiveArray();
addedItems = {"scases":[], "filters":[], "links":[], "laws":[]};
markCount = 0;
marks = [];
topElement = [];
nextFrom = [];
_dep = new Deps.Dependency();

Template.addedItems.helpers({
    'scase': function() {
        _dep.depend()
        if (addedItems['scases'].length > 0) {
            return true;
        }
        return false;
    },
    'fil': function() {
        _dep.depend()
        if (addedItems['filters'].length > 0) {
            return true;
        }
        return false;
    },
    'li': function() {
        _dep.depend()
        if (addedItems['links'].length > 0) {
            return true;
        }
        return false;
    },
    'la': function() {
        _dep.depend();
        if (addedItems['laws'].length > 0) {
            return true;
        }
        return false;
    },
    'addedScase': function() {
        _dep.depend();
        return addedItems["scases"][0];
    },
    'addedFilters': function() {
        _dep.depend();
        return addedItems["filters"];
    },
    'addedLinks': function() {
        _dep.depend();
        return addedItems["links"];
    },
    'item': function(link) {
        console.log(link);
        return link;
    },
    'lawOrFilter': function(item) {
        if (item.hasOwnProperty('paragraph')) {
            return item.paragraph;
        }
        return item.text;
    },
    'startLink': function(item) {
        if (item === "") {
            return "Kobling til startkategori"
        }
        return item;
    }
})

Template.itemToAdd.helpers({
    'next': function() {
        var b = pathQueue.list();
        if (b.length > 0) {
            if (!(b[0].mark === 'JA') && !(b[0].mark === 'NEI')) {
                Session.set('showQ', false);
            } else {
                Session.set('showQ', true);
            }
        return b[0];
        }
        return [];
    },
    'hasNext': function() {
        if (pathQueue.length > 0) {
            return true;
        }
        return false;
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
        Session.set('addLaw', false);
    },
    'click .connectQ': function(event, template) {
        if (Session.get('firstFilterCreated')){
        Router.current().render('addQ', {to: 'forms'});
        } else {
            Router.current().render('addFirstQ', {to: 'forms'});
        }
        Session.set('addLaw', false);
    },
    'click .connectL': function(event, template) {
        Router.current().render('chooseL', {to: 'forms'});
        Session.set('addLaw', false);
    }
})

Template.pathButtons.helpers({
    'showQ': function() {
        console.log(Session.get('showQ'));
        return Session.get('showQ');
    }
});

Template.chooseL.helpers({
    'addingLaw': function() {
        return Session.get('addLaw');
    },
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
    'click .addLawButton': function(e) {
        Session.set('addLaw', true);
    },
    'click .lawChooser': function(event) {
        if (pathQueue.length > 0) {
            if (pathQueue[0].mark === topElement[0]) {
                if (nextFrom.length > 0) {
                        Session.set('From', nextFrom.shift());
                } else {
                    Session.set('From', Session.get('To'));
                }
                topElement.shift();
            }
        }
        var from = Filters.findOne({ 'text': Session.get('From')});
        if (from === undefined) {
            var from = Startcases.findOne({ 'text': Session.get('From')})     
        }
        var to = Laws.findOne({ 'paragraph': event.currentTarget.id })
        if (pathQueue.length > 0) {
            var mark = pathQueue[0].mark;
        } else {
            var mark = "";
        }
        if (insertLink(from, mark, to)) {
            console.log('LawLinkAddSuccess');
        } else {
            alert('failed to link law');
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
    addedItems = {"scases":[], "filters":[], "links":[], "laws":[]};
    topElement = [];
    nextFrom = [];
    Session.set('firstFilterCreated', undefined);
    Session.set('From', undefined);
    Session.set('To', undefined);
    Session.set('cleanPath', false);
    console.log('cleanup called')
    Session.set('showQ', true);
    Session.set('addLaw', false);
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

Template.pathLayout.onCreated( function() {
    Session.set('cleanPath', true);
    Session.set('showQ', true);
})

Template.pathLayout.onRendered( function() {
    Session.set('addLaw', false);
})

