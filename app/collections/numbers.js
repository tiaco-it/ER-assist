// Validate input with SimpleSchema
NumberSchema = new SimpleSchema({
    title: {
        type: String
    },
    number: {
        type: Number
    },
    internal: {
        type: Boolean
    }
});

// Create collection
Numbers = new Meteor.Collection('Numbers');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Numbers);

// Methods for user input
Meteor.methods({
    addNumber: function(doc) {
        check(doc, NumberSchema);
        var obj = {title: doc.title, number: doc.number, type: doc.type};
        return Numbers.insert(obj);
    },
    editNumber: function(obj) {
        check(obj._id, String);
        check(obj.updateDoc.$set, NumberSchema);
        return Numbers.update({_id: obj._id}, obj.updateDoc);
    },
    removeNumber: function (id) {
        check(id, String);
        return Numbers.remove(id);
    }
});

// cache method calls offline, apply when online
if ( Meteor.isClient ) {
    Ground.methodResume([
        'addNumber',
        'editNumber',
        'removeNumber'
    ]);
}