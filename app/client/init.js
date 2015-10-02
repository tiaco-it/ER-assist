Meteor.startup(function () {
	if (Meteor.isCordova) {
		Meteor.subscribe("contacts");
		Meteor.subscribe("startcases");
		Meteor.subscribe("laws");
		Meteor.subscribe("filters");
		Meteor.subscribe("links");
	}
});
