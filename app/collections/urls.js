// Validate input with SimpleSchema
UrlSchema = new SimpleSchema({
    link: {
        type: String
    }
});

// Create collection
Urls = new Meteor.Collection('Urls');

// Make collection available offline if on a mobile device.
if (Meteor.isCordova) Ground.Collection(Urls);

// Methods for user input
Meteor.methods({
    addUrl: function(doc) {
        check(doc, UrlSchema);
        var obj = {link: doc.link};
        return Urls.insert(obj);
    },
    editUrl: function(obj) {
        check(obj._id, String);
        check(obj.updateDoc.$set, UrlSchema);
        return Urls.update({_id: obj._id}, obj.updateDoc);
    },
    removeUrl: function (id) {
        check(id, String);
        return Urls.remove(id);
    }
});

// cache method calls offline, apply when online
if ( Meteor.isClient ) {
    Ground.methodResume([
        'addUrl',
        'editUrl',
        'removeUrl'
    ]);
}