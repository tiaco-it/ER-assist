Template.endLayout.helpers({
    'thisLaw': function() {
        var l = lawHolder[0];
        var lt = Laws.find(l);
        if (lt.size() > 1) {
        	lt.forEach(function (post) {
        		console.log(post.category);
        		console.log(Session.get('category').text);
        		if (post.category === Session.get('category').text) {
        			console.log('triggered fit');
        			return post;
        		}
        	});
        }
    }
});

Template.endLayout.onCreated(function() {
	var l = Laws.findOne(Router.current().params._id);
	console.log(l.paragraph);
	lawHolder.push(l.paragraph);
});

Template.endLayout.onDestroyed( function () {
    lawHolder.pop();
});