pathBuilder = function(scase) {
	console.log(scase);
	var queue = [];
	var path = [];
	queue.push(Links.findOne({'from':scase}));
	console.log('initial link');
	console.log(Links.findOne({'from': scase}));

	while (queue.length > 0) {
		var next = queue.pop();
		console.log('next item');
		console.log(next);
		if (!(Laws.findOne({ 'text': next.to.text }) === undefined)) {
			var law = Laws.findOne({ 'text': next.to.text});
			//path.push(law) if you want to remove the laws
		} else {
			var filter = Filters.findOne({ 'text': next.to.text });
			path.push(filter);
			var links = Links.find({ 'from': filter }).fetch();
			while (links.length > 0) {
				var link = links.pop();
				queue.push(link);
				path.push(link);
			}
		}
	}
	return path;
};

removePath = function(scase) {
	var removals = pathBuilder(scase);
	while (removals.length > 0) {
		var remove = removals.pop();
		if (remove.hasOwnProperty('mark')) {
			Meteor.call('removeFilter', remove._id, function(error, result) {
				if (error) {
					alert(error.reason)
				} else {
					console.log('Filter part of path removed');
				}
			});
		} else if (remove.hasOwnProperty('from')) {
			Meteor.call('removeLink', remove._id, function(error, result) {
				if (error) {
					alert(error.reason) 
				} else {
					console.log('Link part of path removed');
				}
			});
		}
	}
	Meteor.call('removeStartcase', scase._id, function(error, result) {
		if (error) {
			alert(error.reason)
		} else {
			console.log('Startcase part of path removed');
		}
	});
};