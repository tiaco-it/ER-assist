// Validate input with SimpleSchema
FilterSchema = new SimpleSchema({
    text: {
        type: String
    },
    number_of_outcomes: {
        type: Number
    }
});

// Create collection
Filters = new Meteor.Collection('Filters');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Filters);

// Methods for user input
Meteor.methods({
    addFilter: function(doc) {
        check(doc, FilterSchema);
        var obj = {text: doc.text, number_of_outcomes: doc.number_of_outcomes};
        return Filters.insert(obj);
    },
    editFilter: function(obj) {
        check(obj._id, String);
        check(obj.updateDoc.$set, FilterSchema);
        return Filters.update({_id: obj._id}, obj.updateDoc);
    },
    removeFilter: function (id) {
        check(id, String);
        return Filters.remove(id);
    }
});

// cache method calls offline, apply when online
if ( Meteor.isClient ) {
    Ground.methodResume([
        'addFilter',
        'editFilter',
        'removeFilter'
    ]);
}