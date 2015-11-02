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

// NUMBERS
Meteor.publish('numbers', function() {
  return Numbers.find();
});

Meteor.publish('number', function(_id) {
  return Numbers.find({_id: _id});
});

// INFO
Meteor.publish('info', function() {
  return Info.find();
});

Meteor.publish('infoElement', function(_id) {
  return Info.find({_id: _id});
});

// UPLOADS
Meteor.publish("uploads", function () {
  console.log("publishing uploads");
  return Uploads.find();
});