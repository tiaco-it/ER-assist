Meteor.publish('elements', function() {
  return Elements.find();
});

Meteor.publish('element', function(_id) {
  return Elements.find({_id: _id});
});