// Validate input with SimpleSchema
LinkSchema = new SimpleSchema({
    from: {
        type: Object
    },
    to: {
        type: Object
    }
});

// Create collection
Links = new Meteor.Collection('Links');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Links);

// Methods for user input
Meteor.methods({
    addLink: function(doc) {
        check(doc, LinkSchema);
        var obj = {from: doc.from, to: doc.to};
        return Links.insert(obj);
    },
    editLink: function(obj) {
        check(obj._id, String);
        check(obj.updateDoc.$set, LinkSchema);
        return Links.update({_id: obj._id}, obj.updateDoc);
    },
    removeLink: function (id) {
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