// Validate input with SimpleSchema
LinkSchema = new SimpleSchema({
    from: {
        type: Object
    },
    mark: {
        type: String
    },
    to: {
        type: Object
    }
});

EditLinkSchema = new SimpleSchema({
    mark: {
        type: String
    }
});

// Create collection
Links = new Meteor.Collection('Links');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Links);

// Methods for user input
Meteor.methods({
    addLink: function(doc) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
        check(doc, LinkSchema);
        var obj = {from: doc.from, mark: doc.mark, to: doc.to};
        return Links.insert(obj);
    },
    addLink2: function(doc) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
        var obj = {from: doc.from, mark: doc.mark, to: doc.to};
        return Links.insert(obj);
    },
    editLink: function(obj) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
        check(obj._id, String);
        check(obj.updateDoc.$set, LinkSchema);
        return Links.update({_id: obj._id}, obj.updateDoc);
    },
    removeLink: function (id) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
        check(id, String);
        return Links.remove(id);
    }
});

// cache method calls offline, apply when online
if ( Meteor.isClient ) {
    Ground.methodResume([
        'addLink',
        'editLink',
        'removeLink'
    ]);
}