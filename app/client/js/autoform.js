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
            if (pathQueue[0] === 'NEI') {
                Session.set('To', insertDoc.text);
            } else if (pathQueue[0] === 'JA') {
            Session.set('From', Session.get('To'));
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
                    console.log('NLinkAddSuccess');
                    addedItems["links"].push(obj);
                    console.log(obj)
                    pathQueue.shift();
                    pathQueue.push('JA');
                    pathQueue.push('NEI');
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
