Template.home.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
			self.subscribe("elements");
    	};
  	});
});

Template.home.helpers({
	'items': function() {
		var ele = Elements.find({});
		return ele && ele
	}
});

Template.laws.helpers({
	'laws': function() {
		console.log('logging helper activation')
		var laws = Laws.find({})
		return laws && laws
	}
});

Template.law.helpers({
	'law': function() {
		var law = Laws.find({});
		return law && law
	}
});

Template.law.helpers({
	'thisLaw': function() {
		return Laws.findOne(Router.current().params._id)
	}
})

Template.unused.helpers( {
	var id = this._id;
		var qry = {};
		qry[title] = id
		var law = Laws.find(qry);
		//Check if law exists before returning (error fix)
		return law && law
})

//Asynchronous call to the collection method 'removeElement'
//The third argument is a special async arg, making the call async and forcing you
//to handle the possible async error as done here

Template.home.events({
	'click .button-assertive': function(e) {
		e.preventDefault();
		Meteor.call('removeElement', this._id, function(error, result) {
			if (error) alert(error.reason);
		});
		return;
	}
});

Template.edit.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
      		Meteor.subscribe("element", Router.current().params._id);
    	}
  	});
});

Template.edit.helpers({
	'selectedDoc': function() {
		return Elements.findOne(Router.current().params._id);
	}
});



//hooks provide callback when the given formID is provided in an AutoForm call
//The id is used to connect the forms to the hook
//When is the hook called? In this case onSubmit

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