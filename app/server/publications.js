Meteor.publish('elements', function() {
  return Elements.find();
});

Meteor.publish('element', function(_id) {
  return Elements.find({_id: _id});
});

// STARTCASES
Meteor.publish('startcases', function() {
  return Startcases.find();
});

Meteor.publish('startcase', function(_id) {
  return Startcases.find({_id: _id});
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
});

// URLS
Meteor.publish('urls', function() {
  return Urls.find();
});

Meteor.publish('url', function(_id) {
  return Urls.find({_id: _id});
});

// INFOS
Meteor.publish('infos', function() {
  return Infos.find();
});

Meteor.publish('info', function(_id) {
  return Infos.find({_id: _id});
});
