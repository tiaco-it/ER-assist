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
            Session.set('text2', insertDoc.text);
            Meteor.call('addStartcase', insertDoc, function(error, result) {
                if (error) {
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
            Router.current().render('pathButtons', {to: 'choices'});
            console.log('DONE')
        }
    }
});

AutoForm.hooks({
    insertFirstFilterForm: {
        onSubmit: function(insertDoc) {
            Session.set('text1', Session.get('text2'));
            Session.set('text2', insertDoc.text);
            Meteor.call('addFilter', insertDoc, function(error, result) {
                if (error) alert(error.reason);
                Session.set('FilterID', 'todo');
            });
            this.done();
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('text2'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT')
        },
        endSubmit: function() {
            console.log('DONE')
            var from = Startcases.findOne({ 'text': Session.get('text1')});
            var to = Filters.findOne({ 'text': Session.get('text2')});
            var obj = {'from': from, 'mark': "", 'to': to};
            Meteor.call('addLink2', obj, function(error, result) {
                if (error) {
                    alert(error.reason)
                } else {
                    console.log('LinkAddSuccess');
                    Router.current().render('itemToAdd', {to: 'next'});
                    Session.set('first', true);
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
            Session.set('text1', Session.get('text2'));
            Session.set('text2', insertDoc.text);
            Meteor.call('addFilter', insertDoc, function(error, result) {
                if (error) alert(error.reason);
                Session.set('FilterID', 'todo');
            });
            this.done;
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('text2'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT')
        },
        endSubmit: function() {
            console.log('DONE')
            var from = Startcases.findOne({ 'text': Session.get('text1')});
            if (from === undefined) {
                from = Filters.findOne({ 'text': Session.get('text1')});
            }
            var to = Filters.findOne({ 'text': Session.get('text2')});
            var obj = {'from': from, 'mark': pathQueue[0], 'to': to};
            Meteor.call('addLink2', obj, function(error, result) {
                if (error) {
                    alert(error.reason)
                } else {
                    console.log('LinkAddSuccess');
                    pathQueue.shift();
                    pathQueue.push('JA');
                    pathQUeue.push('NEI');
                }
            });
        }
    }
});

AutoForm.hooks({
    insertLawForm: {
        onSubmit: function(insertDoc) {
            Session.set('text1', Session.get('text2'));
            Session.set('text2', insertDoc.paragraph);
            Meteor.call('addLaw', insertDoc, function(error, result) {
                if (error) alert(error.reason);
            });
            $(".back-button").click();
            return false;
        },
        onSuccess: function(formType, result) {
            console.log(Session.get('text2'));
        },
        beginSubmit: function() {
            console.log('STARTING SUBMIT')
        },
        endSubmit: function() {
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