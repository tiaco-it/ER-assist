//hooks provide callback when the given formID is provided in an AutoForm call
//The id is used to connect the forms to the hook
//When is the hook called? In this case onSubmit

//Possible TODO: Generalize to reduce code
AutoForm.setDefaultTemplate('ionic');

insertLink = function(from, mark, to) {
    var inserted = false;
    if (from === undefined || to === undefined) {
        console.log('GOT UNDEFINED AT INSERT')
        return inserted;
    } else {
        var inserted = true;
    }
    var obj = {'from': from, 'mark': mark, 'to': to};
    console.log(obj)
    Meteor.call('addLink2', obj, function(error, result) {
        if (error) {
            alert(error.reason);
            console.log('GOT ERROR AT INSERT');
        } else {
            console.log('GOT SUCCESS AT INSERT')
            addedItems["links"].push(obj);
            _dep.changed();
        }
    });
    return inserted;
};

AutoForm.hooks({
    insertElementForm: {
        onSubmit: function(insertDoc) {
            Meteor.call('addElement', insertDoc, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            return false;
        }
    }
});

AutoForm.hooks({
    insertStartcaseForm: {
        onSubmit: function(insertDoc) {
            insert = insertDoc;
            if (typeof insert !== 'undefined') {
                Session.set('From', insertDoc.text);
                console.log('From got set');
                console.log(Session.get('From'));
                Meteor.call('addStartcase', insertDoc, function(error, result) {
                    if (error) {
                    console.log(error.reason)
                    alert(error.reason);
                    }
                }); 
            }
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT')
        },
        endSubmit: function() {
            if (typeof insert !== 'undefined') {
                //First item inserted into db, so clean it if cancelled
                Session.set('cleanDB', true);
                addedItems["scases"].push(insert);
                _dep.changed();
                Router.current().render('pathButtons', {to: 'choices'});
                Router.current().render('blank', {to: 'add'});
                console.log('DONE');
                insert = undefined;
            }
        }
    }
});

AutoForm.hooks({
    insertFirstFilterForm: {
        onSubmit: function(insertDoc) {
            insert = insertDoc;
            if (typeof insert !== 'undefined') {
                console.log('onSubmit');
                insertDoc["number_of_outcomes"] = 2;
                console.log('Altered doc');
                console.log(insertDoc);
                Session.set('To', insertDoc.text);
                Meteor.call('addFilter', insertDoc, function(error, result) {
                    if (error) {
                        console.log('failed first')
                        alert(error.reason);
                    }   
                });
            }
            this.done();
            return false;
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT 1')
        },
        endSubmit: function() {
            if (typeof insert !== 'undefined') {
                addedItems["filters"].push(insert);
                _dep.changed();
                console.log('DONE')
                var from = Startcases.findOne({ 'text': Session.get('From')});
                var to = Filters.findOne({ 'text': Session.get('To')});
                var mark = "";
                var isInserted = insertLink(from, mark, to);
                console.log(isInserted);
                insert = undefined;
                if (isInserted) {
                    console.log('FirstLinkAddSuccess');
                    Router.current().render('itemToAdd', {to: 'next'});
                    Router.current().render('addQ', {to: 'forms'});
                    Session.set('firstFilterCreated', true);
                    var qItem = {'mark': 'JA', 'filter':insert.text}
                    pathQueue.push(qItem);
                    var qItem = {'mark': 'NEI', 'filter':insert.text}
                    pathQueue.push(qItem);
                    topElement.push('JA');
                } else {
                    alert('link connection failed');
                }
            }
        }
    }
});

AutoForm.hooks({
    insertFilterForm: {
        onSubmit: function(insertDoc) {
            insert = insertDoc;
            if (typeof insert !== 'undefined') {
                insertDoc["number_of_outcomes"] = 2;
                if (pathQueue[0].mark === topElement[0]) {
                    if (nextFrom.length > 0) {
                        Session.set('From', nextFrom.shift());
                    } else {
                        Session.set('From', Session.get('To'));
                    }
                    Session.set('To', insertDoc.text);
                    topElement.shift();
                } else {
                    console.log('GOT CORRECT AT FILTER')
                    Session.set('To', insertDoc.text);
                }
                console.log('got to method call')
                Meteor.call('addFilter', insertDoc, function(error, result) {
                    if (error) {
                        console.log('Failed second')
                        console.log(error.reason);
                    }
                });
                console.log('finished method call')
            }
            this.done();
            return false;
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT 2')
        },
        endSubmit: function() {
            if (typeof insert !== 'undefined') {
                addedItems["filters"].push(insert);
                _dep.changed();
                nextFrom.push(insert.text);
                console.log('DONE')
                var from = Filters.findOne({ 'text': Session.get('From')});
                var to = Filters.findOne({ 'text': Session.get('To')});
                var mark = pathQueue[0].mark;
                var isInserted = insertLink(from, mark, to);
                console.log(isInserted);
                insert = undefined;
                if (isInserted) {
                    console.log('NextLinkAddSuccess');
                    pathQueue.shift();
                    var qItem = {'mark': 'JA', 'filter':insert.text}
                    pathQueue.push(qItem);
                    var qItem = {'mark': 'NEI', 'filter':insert.text}
                    pathQueue.push(qItem);
                    topElement.push('JA');
                } else {
                    alert('link connection failed');
                }
                Router.current().render('blank', {to: 'added'})
                Router.current().render('addedItems', {to: 'added'});
            }
        }
    }
});

AutoForm.hooks({
    insertFilterNForm: {
        onSubmit: function(insertDoc) {
            insert = insertDoc;
            if (typeof insert !== 'undefined') {
                console.log('got to Submit')
                //If the next item to link is the first to be connected to a new "from" node (TopElement)
                //Then shuffle the from node down the tree one level
                if (pathQueue[0].mark === topElement[0] && addedItems['filters'].length > 0) {
                    if (nextFrom.length > 0) {
                        console.log('used nextFrom')
                        Session.set('From', nextFrom.shift());
                        Session.set('To', insertDoc.text);
                    } else {
                        Session.set('From', Session.get('To'));
                        Session.set('To', insertDoc.text);
                    }
                    topElement.shift();
                //Otherwise, just shift To along same layer
                } else {
                    console.log('not equal to top');
                    Session.set('To', insertDoc.text);
                }
                Meteor.call('addFilter', insertDoc, function(error, result) {
                    if (error) {
                        console.log(error.reason);
                    }
                });
            }
            this.done();
            return false;
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT 2')
        },
        endSubmit: function() {
            if (typeof insert !== 'undefined') {
                markCount = insert.number_of_outcomes;
                addedItems["filters"].push(insert);
                _dep.changed();
                nextFrom.push(insert.text);
                console.log('DONE')
                var from = Startcases.findOne({ 'text': Session.get('From')});
                if (from === undefined) {
                    var from = Filters.findOne({ 'text': Session.get('From')});
                }
                console.log(from);
                var to = Filters.findOne({ 'text': Session.get('To')});
                if (pathQueue.length > 0) {
                    var mark = pathQueue[0].mark;
                } else {
                    var mark = "";
                }
                insert = undefined;
                if (insertLink(from, mark, to)) {
                        Session.set('firstFilterCreated', true);
                        console.log('NLinkAddSuccess');
                        pathQueue.shift();
                        Router.current().render('answerOptions', {to: 'next'});
                        Router.current().render('blank', {to: 'choices'});
                        Router.current().render('addMarks', {to: 'forms' });
                        Router.current().render('addedItems', {to: 'added'});
                } else {
                    alert('Couldnt link n options filter');
                }
                //if this was the first connection, shift From down one layer in the tree
                if (addedItems['filters'].length == 1) {
                    Session.set('From', Session.get('To'));
                }
            }
        }
    }
});

AutoForm.hooks({
    insertLawForm: {
        onSubmit: function(insertDoc) {
            insert = insertDoc;
            if (typeof insert !== 'undefined') {
                Meteor.call('addLaw', insertDoc, function(error, result) {
                    if (error) alert(error.reason);
                });
                $(".back-button").click();
            }
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('To'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT')
        },
        endSubmit: function() {
            if (typeof insert !== 'undefined') {
                console.log('DONE')
                insert = undefined;
            }
        }
    }
});

AutoForm.hooks({
    insertLawPathForm: {
        onSubmit: function(insertDoc) {
            insert = insertDoc;
            if (typeof insert !== 'undefined') {
                Meteor.call('addLaw', insertDoc, function(error, result) {
                    if (error) alert(error.reason);
                });
                $(".back-button").click();
            }
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('To'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT')
        },
        endSubmit: function() {
            if (typeof insert !== 'undefined') {
                addedItems["laws"].push(insert);
                _dep.changed();
                console.log('DONE')
                insert = undefined;
                Session.set('addLaw', false)
                Router.current().render('blank', {to: 'added'});
                Router.current().render('addedItems', {to: 'added'});
            }
        }
    }
});

AutoForm.hooks({
        insertMarkForm: {
        onSubmit: function(insertDoc) {
            insert = insertDoc;
            if (typeof insert !== 'undefined') {
                marks.push(insertDoc.mark);
            }
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
        },
        beginSubmit: function() {
        },
        endSubmit: function() {
            if (typeof insert !== 'undefined') {
                markCount-=1;
                if (markCount < 1) {
                    topElement.push(marks[0]);
                    while (marks.length > 0) {
                        var qItem = {'mark': marks.shift(), 'filter':insert.text}
                        pathQueue.push(qItem);
                    }
                    Router.current().render('itemToAdd', {to: 'next'});
                    Router.current().render('pathButtons', {to: 'choices'});
                    Router.current().render('blank', {to: 'forms'});
                    Router.current().render('blank', {to: 'added'});
                    Router.current().render('addedItems', {to: 'added'});
                } else {
                    Router.current().render('addMarks', {to: 'forms'});
                }
                insert = undefined;
            }
        }
    }
});

AutoForm.hooks({
    insertLinkForm: {
        onSubmit: function(insertDoc) {
            Meteor.call('addLink', insertDoc, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            this.done();
            return false;
        }
    }
});

AutoForm.hooks({
    insertUrlForm: {
        onSubmit: function(insertDoc) {
            Meteor.call('addUrl', insertDoc, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            this.done();
            return false;
        }
    }
});


AutoForm.hooks({
    insertNumberForm: {
        onSubmit: function(insertDoc) {
            Meteor.call('addNumber', insertDoc, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            this.done();
            return false;
        }
    }
});

AutoForm.hooks({
    editElementForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var obj = {_id: Router.current().params._id, updateDoc: updateDoc};
            Meteor.call('editElement', obj, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            this.done();
            return false;
        }
    }
});

AutoForm.hooks({
    editLawForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var obj = {_id: Router.current().params._id, updateDoc: updateDoc};
            Meteor.call('editLaw', obj, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            this.done();
            return false;
        }
    }
});

AutoForm.hooks({
    editFilterForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var obj = {_id: Router.current().params._id, updateDoc: updateDoc};
            Meteor.call('editFilter', obj, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            this.done();
            return false;
        }
    }
});

AutoForm.hooks({
    editLinkForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var obj = {_id: Router.current().params._id, updateDoc: updateDoc};
            Meteor.call('editLink', obj, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            this.done();
            return false;
        }
    }
});
