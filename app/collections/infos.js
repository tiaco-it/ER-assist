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
Infos = new Meteor.Collection('Infos');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Infos);

// Methods for user input
Meteor.methods({
    addInfo: function(doc) {
        check(doc, InfoSchema);
        var obj = {text: doc.text};
        return Infos.insert(obj);
    },
    editInfo: function(obj) {
        check(obj._id, String);
        check(obj.updateDoc.$set, InfoSchema);
        return Infos.update({_id: obj._id}, obj.updateDoc);
    },
    removeInfo: function (id) {
        check(id, String);
        return Infos.remove(id);
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