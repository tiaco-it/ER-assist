// Validate input with SimpleSchema
LawSchema = new SimpleSchema({
    law: {
        type: String
    },
    paragraph: {
        type: String
    },
    text: {
        type: String
    },
    summary: {
        type: String
    },
    example: {
        type: String
    }
});

// Create collection
Laws = new Meteor.Collection('Laws');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Laws);

// Methods for user input
Meteor.methods({
    addLaw: function(doc) {
        check(doc, LawSchema);
        var obj = {law: doc.law, paragraph: doc.paragraph, text: doc.text};
        return Laws.insert(obj);
    },
    editLaw: function(obj) {
        check(obj._id, String);
        check(obj.updateDoc.$set, LawSchema);
        return Laws.update({_id: obj._id}, obj.updateDoc);
    },
    removeLaw: function (id) {
        check(id, String);
        return Laws.remove(id);
    }
});

// cache method calls offline, apply when online
if ( Meteor.isClient ) {
    Ground.methodResume([
        'addLaw',
        'editLaw',
        'removeLaw'
    ]);
}