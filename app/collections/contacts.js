//SimpleSchema validates (constrains) input information, typically user input
ContactsSchema = new SimpleSchema({
  name: {
    type: String,
    min: 3,
    max: 20
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true
  },
  lastUpdated: {
    type: Date,
    optional: true
  }
});

Contacts = new Meteor.Collection('Contacts');

//Meteor.is(options) checks where meteor is running, in this case on Cordova which means mobile
//Ground.Collection makes the collection available offline
if (Meteor.isCordova) Ground.Collection(Contacts);

//Methods for user input to the collection: Adding, editing, removing
Meteor.methods({
  addContact: function(doc) {
    check(doc, ContactsSchema);
    var obj = {name: doc.name, email: doc.email, createdAt: new Date};
    return Contacts.insert(obj);
  },
  editContact: function(obj) {
    _.extend(obj.updateDoc.$set, {lastUpdated: new Date});
    check(obj._id, String);
    check(obj.updateDoc.$set, ContactsSchema);
    return Contacts.update({_id: obj._id}, obj.updateDoc);
  },
  removeContact: function(id) {
    check(id, String);
    return Contacts.remove(id);
  }
});

//Lets you cache method calls on the collection so that they apply when the app goes online
//Simple "last update wins" conflict resolution at server
if ( Meteor.isClient ) {
  Ground.methodResume([
      'addContact',
      'editContact',
      'removeContact'
  ]);
}