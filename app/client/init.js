Meteor.startup(function () {
	if (Meteor.isCordova) Meteor.subscribe("elements");
});