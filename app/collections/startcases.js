// Validate input with SimpleSchema
StartcaseSchema = new SimpleSchema({
    text: {
        type: String
    }
});

// Create collection
Startcases = new Meteor.Collection('Startcases');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Startcases);

// Methods for user input
Meteor.methods({
    addStartcase: function(doc) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
        check(doc, StartcaseSchema);
        var obj = {text: doc.text};
        return Startcases.insert(obj);
    },
    editStartcase: function(obj) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
        check(obj._id, String);
        check(obj.updateDoc.$set, StartcaseSchema);
        return Startcases.update({_id: obj._id}, obj.updateDoc);
    },
    removeStartcase: function (id) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
        check(id, String);
        return Startcases.remove(id);
    }
});

// cache method calls offline, apply when online
if ( Meteor.isClient ) {
    Ground.methodResume([
        'addStartcase',
        'editStartcase',
        'removeStartcase'
    ]);
}