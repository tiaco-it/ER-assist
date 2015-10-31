Meteor.startup(function () {
	if (Meteor.isCordova) {
	Meteor.subscribe("startcases");
	Meteor.subscribe("laws");
	Meteor.subscribe("filters");
	Meteor.subscribe("links");
	Meteor.subscribe("urls");
	Meteor.subscribe("info");
	}
});