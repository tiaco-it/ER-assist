Meteor.publish('elements', function() {
  return Elements.find();
});

Meteor.publish('contact', function(_id) {
  return Contacts.find({_id: _id});
});

// STARTCASES
Meteor.publish('startcases', function() {
  return Statcases.find();
});

Meteor.publish('startcase', function(_id) {
  return Statcases.find({_id: _id});
});

// LAWS
Meteor.publish('laws', function() {
  return Laws.find();
});

Meteor.publish('law', function(_id) {
  return Laws.find({_id: _id});
});

// FILTERS
Meteor.publish('filters', function() {
  return Filters.find();
});

Meteor.publish('filter', function(_id) {
  return Filters.find({_id: _id});
});

// LINKS
Meteor.publish('links', function() {
  return Links.find();
});

Meteor.publish('link', function(_id) {
  return Links.find({_id: _id});