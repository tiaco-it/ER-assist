//hooks provide callback when the given formID is provided in an AutoForm call
//The id is used to connect the forms to the hook
//When is the hook called? In this case onSubmit

//Possible TODO: Generalize to reduce code
AutoForm.setDefaultTemplate('ionic');

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
            Session.set('From', insertDoc.text);
            console.log('From got set');
            console.log(Session.get('From'));
            Meteor.call('addStartcase', insertDoc, function(error, result) {
                if (error) {
                console.log(error.reason)
                alert(error.reason);
                }
            });
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('text'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT')
        },
        endSubmit: function() {
            Session.set('cancelledPath', true);
            addedItems["scases"].push(insert);
            Router.current().render('pathButtons', {to: 'choices'});
            console.log('DONE')
        }
    }
});

AutoForm.hooks({
    insertFirstFilterForm: {
        onSubmit: function(insertDoc) {
            console.log('onSubmit');
            insertDoc["number_of_outcomes"] = 2;
            insert = insertDoc;
            console.log('Altered doc');
            console.log(insertDoc);
            Session.set('To', insertDoc.text);
            Meteor.call('addFilter', insertDoc, function(error, result) {
                if (error) {
                    console.log('failed first')
                    alert(error.reason);
                }   
            });
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('To'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT 1')
        },
        endSubmit: function() {
            addedItems["filters"].push(insert);
            console.log('DONE')
            var from = Startcases.findOne({ 'text': Session.get('From')});
            var to = Filters.findOne({ 'text': Session.get('To')});
            var obj = {'from': from, 'mark': "", 'to': to};
            Meteor.call('addLink2', obj, function(error, result) {
                if (error) {
                    console.log(error.reason)
                } else {
                    console.log('FirstLinkAddSuccess');
                    addedItems["links"].push(obj);
                    console.log(obj)
                    Router.current().render('itemToAdd', {to: 'next'});
                    Router.current().render('addQ', {to: 'forms'});
                    Session.set('firstFilterCreated', true);
                    pathQueue.push('JA');
                    pathQueue.push('NEI');
                    Session.set('TopElement', 'JA');
                }
            });
        }
    }
});

AutoForm.hooks({
    insertFilterForm: {
        onSubmit: function(insertDoc) {
            insertDoc["number_of_outcomes"] = 2;
            insert = insertDoc;
            if (pathQueue[0] === Session.get('TopElement')) {
                Session.set('From', Session.get('To'));
                Session.set('To', insertDoc.text);
            } else {
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
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('To'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT 2')
        },
        endSubmit: function() {
            addedItems["filters"].push(insert);
            console.log('DONE')
            var from = Filters.findOne({ 'text': Session.get('From')});
            var to = Filters.findOne({ 'text': Session.get('To')});
            var obj = {'from': from, 'mark': pathQueue[0], 'to': to};
            Meteor.call('addLink2', obj, function(error, result) {
                if (error) {
                    console.log('failed link')
                    alert(error.reason)
                } else {
                    console.log('NextLinkAddSuccess');
                    addedItems["links"].push(obj);
                    console.log(obj)
                    pathQueue.shift();
                    pathQueue.push('JA');
                    pathQueue.push('NEI');
                    Session.set('TopElement', 'JA');
                }
            });
        }
    }
});

AutoForm.hooks({
    insertFilterNForm: {
        onSubmit: function(insertDoc) {
            console.log('got to Submit')
            insert = insertDoc;
            if (pathQueue[0] === Session.get('TopElement')) {
                console.log('equal to top element')
                Session.set('From', Session.get('To'));
                Session.set('To', insertDoc.text);
            } else {
                console.log('not equal to top');
                Session.set('To', insertDoc.text);
            }
            insert = insertDoc;
            Meteor.call('addFilter', insertDoc, function(error, result) {
                if (error) {
                    console.log(error.reason);
                }
            });
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT 2')
        },
        endSubmit: function() {
            markCount = insert.number_of_outcomes;
            addedItems["filters"].push(insert);
            console.log('DONE')
            var from = Startcases.findOne({ 'text': Session.get('From')});
            if (from === undefined) {
                var from = Filters.findOne({ 'text': Session.get('From')});
            }
            console.log(from);
            var to = Filters.findOne({ 'text': Session.get('To')});
            if (pathQueue.length > 0) {
                var obj = {'from': from, 'mark': pathQueue[0], 'to': to};
            } else {
                var obj = {'from': from, 'mark': "", 'to': to};
            }
            Meteor.call('addLink2', obj, function(error, result) {
                if (error) {
                    console.log('failed link')
                    alert(error.reason)
                } else {
                    Session.set('firstFilterCreated', true);
                    console.log('NLinkAddSuccess');
                    Session.set('showQ', false);
                    addedItems["links"].push(obj);
                    console.log(obj)
                    pathQueue.shift();
                    Router.current().render('blank', {to: 'choices'});
                    Router.current().render('addMarks', {to: 'forms' });
                }
            });
        }
    }
});

AutoForm.hooks({
    insertLawForm: {
        onSubmit: function(insertDoc) {
            insert = insertDoc;
            Session.set('From', Session.get('To'));
            Session.set('To', insertDoc.paragraph);
            console.log('FromTo')
            console.log(Session.get('From'))
            console.log(Session.get('To'))
            Meteor.call('addLaw', insertDoc, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('To'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT')
        },
        endSubmit: function() {
            addedItems["laws"].push(insert)
            console.log('DONE')
        }
    }
});

AutoForm.hooks({
        insertMarkForm: {
        onSubmit: function(insertDoc) {
            marks.push(insertDoc.mark);
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
        },
        beginSubmit: function() {
        },
        endSubmit: function() {
            markCount-=1;
            if (markCount === 0) {
                Session.set('TopElement', marks[0]);
                while (marks.length > 0) {
                    pathQueue.push(marks.shift());
                }
                Router.current().render('pathButtons', {to: 'choices'});
                Router.current().render('blank', {to: 'forms'});
            } else {
                Router.current().render('addMarks', {to: 'forms'});
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
            return false;
        }
    }
});
