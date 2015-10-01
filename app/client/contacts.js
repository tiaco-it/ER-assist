Template.contacts.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
			Meteor.subscribe("contacts");
    	};
  	});
});

Template.contacts.helpers({
	'contacts': function() {
		return Contacts.find({});
	}
});

//Asynchronous call to the collection method 'removeContact'
//The third argument is a special async arg, making the call async and forcing you
//to handle the possible async error as done here

Template.contacts.events({
	'click .button-assertive': function(e) {
		e.preventDefault();
		Meteor.call('removeContact', this._id, function(error, result) {
			if (error) alert(error.reason);
		});
		return;
	}
});

Template.edit.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
      		Meteor.subscribe("contact", Router.current().params._id);
    	}
  	});
});

Template.edit.helpers({
	'selectedDoc': function() {
		return Contacts.findOne(Router.current().params._id);
	}
});

//hooks provide callback when the given formID is provided in an AutoForm call
//The id is used to connect the forms to the hook
//When is the hook called? In this case onSubmit

AutoForm.hooks({
	insertContactForm: {
		onSubmit: function(insertDoc) {
			Meteor.call('addContact', insertDoc, function(error, result) {
				if (error) alert(error.reason);
			});
			$(".back-button").click();
			return false;
		}
	}
});

AutoForm.hooks({
	editContactForm: {
		onSubmit: function(insertDoc, updateDoc, currentDoc) {
			var obj = {_id: Router.current().params._id, updateDoc: updateDoc};
			Meteor.call('editContact', obj, function(error, result) {
				if (error) alert(error.reason);
			});
			$(".back-button").click();
			return false;
		}
	}
});