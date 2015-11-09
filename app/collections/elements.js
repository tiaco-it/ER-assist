//SimpleSchema validates (constrains) input information, typically user input
ElementsSchema = new SimpleSchema({
  data1: {
    type: String,
    min: 3,
    max: 20
  },
  data2: {
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

Elements = new Meteor.Collection('Elements');
//Meteor.is(options) checks where meteor is running, in this case on Cordova which means mobile
//Ground.Collection makes the collection available offline

if (Meteor.isCordova) Ground.Collection(Elements);

//Methods for user input to the collection: Adding, editing, removing

Meteor.methods({
  addElement: function(doc) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check(doc, ElementsSchema);
    var obj = {data1: doc.data1, data2: doc.data2, createdAt: new Date};
    return Elements.insert(obj);
  },
  editElement: function(obj) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    _.extend(obj.updateDoc.$set, {lastUpdated: new Date});
    check(obj._id, String);
    check(obj.updateDoc.$set, ElementsSchema);
    return Elements.update({_id: obj._id}, obj.updateDoc);
  },
  removeElement: function(id) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check(id, String);
    return Elements.remove(id);
  }
});

//Lets you cache method calls on the collection so that they apply when the app goes online
//Simple "last update wins" conflict resolution at server

if ( Meteor.isClient ) {
  Ground.methodResume([
    'addElement',
    'editElement',
    'removeElement'
  ]);
}
