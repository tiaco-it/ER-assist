Template.endLayout.onCreated(function() {
	var l = Laws.findOne(Router.current().params._id);
	console.log(l.paragraph);
	lawHolder.push(l.paragraph);
});

Template.endLayout.onDestroyed( function () {
    lawHolder.pop();
});