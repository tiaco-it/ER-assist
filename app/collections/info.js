// Validate input with SimpleSchema
InfoSchema = new SimpleSchema({
    title: {
        type: String
    },
    text: {
        type: String
    }
});

// Create collection
Info = new Meteor.Collection('Info');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Info);

// Methods for user input
Meteor.methods({
    addInfo: function(doc) {
        check(doc, InfoSchema);
        var obj = {text: doc.text};
        return Info.insert(obj);
    },
    editInfo: function(obj) {
        check(obj._id, String);
        check(obj.updateDoc.$set, InfoSchema);
        return Info.update({_id: obj._id}, obj.updateDoc);
    },
    removeInfo: function (id) {
        check(id, String);
        return Info.remove(id);
    }
});

// cache method calls offline, apply when online
if ( Meteor.isClient ) {
    Ground.methodResume([
        'addInfo',
        'editInfo',
        'removeInfo'
    ]);
}