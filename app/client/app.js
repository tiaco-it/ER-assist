var buttons  = new Array();
var marks = new Array();
var lawHolder = new Array();


query = function(string, item) {
	var qry = {};
	var qry2 = {};
	var qry3 = {};
	var qry4 = {};
	qry["text"] = item.text;
	qry2["from"] = Startcases.findOne(qry);
	qry3["from"] = Filters.findOne(qry)
	qry4["mark"] = string
	var con = Links.findOne({
		$and: [
        qry4,
        qry2
        ]

	});
	var con2 = Links.findOne({
		$and: [
        qry4,
        qry3
        ]
	})
	return [con, con2]
}

yes = function(item) {
	return query('JA', item)
};

no = function(item) {
	return query('NEI', item)
};
either = function(item) {
	return query('', item)
};
oneOutcome = function(cons){
	if ( typeof cons[0] !== "undefined" ) {
		if ( cons[0].to.hasOwnProperty('paragraph') ) {
			return true;
		}
		else { 
			return false;
	}
}
	else if (typeof cons[1] !== "undefined" ) {
		if ( cons[1].to.hasOwnProperty('paragraph') ) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		console.log("collection not built");
	}
};
twoOutcome = function(cons){
	if ( typeof cons[0] !== "undefined" ) {
		if ( cons[0].to.number_of_outcomes === 2 ) {
			return true;
		}
		else {
			return false;
		}
	}
	else if (typeof cons[1] !== "undefined" ) {
		if ( cons[1].to.number_of_outcomes === 2 ) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		console.log("collection not built");
	}
};



Template.home.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
			Meteor.subscribe("startcases");
			Meteor.subscribe("laws");
			Meteor.subscribe("filters");
			Meteor.subscribe("links");
    	};
  	});
});

Template.home.helpers({
	'startcases': function() {
        var cases = Startcases.find({})
        return cases && cases
    },
	'links': function() {
        var links = Links.find({})
        return links && links
    },
    'singleLink': function(fromItem) {
        Links.findOne({
             from: fromItem 
        })
    },
    'yesLink': function(scase) {
    	console.log("YES")
    	console.log(scase)
    	var qry = {};
    	var qry2 = {};
    	qry["text"] = scase.text;
    	qry2["from"] = Filters.findOne(qry);
        var li = Links.findOne({
            $and: [
            { mark: 'JA' },
            qry2
            ]
        })
        return li.to
    },
    'noLink': function(scase) {
    	console.log("NO")
    	console.log(scase)
    	var qry = {};
    	var qry2 = {};
    	qry["text"] = scase.text;
    	qry2["from"] = Filters.findOne(qry);
        var li = Links.findOne({
            $and: [
            { mark: 'NEI'},
            qry2
            ]
        })
        return li.to
    },
    'allLinks': function(fromItem) {
        Links.find({
             from: fromItem 
        })
    },
    'notClicked': function(id) {
    	return !Session.get(id)
    },
    'to': function(scase) {
    	var qry = {};
    	var qry2 = {};
    	qry["text"] = scase.text;
    	qry2["from"] = Startcases.findOne(qry);
    	var con = Links.findOne(qry2);
    	if ( typeof con === "undefined" )
    		console.log("collection not built")
    	else
    		return con.to
    },

    'currentFrom': function() {
    	return Session.get('currentFrom')
    },
    'oneEither': function(item) {
    	return oneOutcome(either(item))
    },
    'twoEither': function(item) {
    	return twoOutcome(either(item))
    },
    'oneYes': function(item) {
    	return oneOutcome(yes(item))
    },
    'twoYes': function(item) {
    	return twoOutcome(yes(item))
    },
    'oneNo': function(item) {
    	return oneOutcome(no(item))
    },
    'twoNo': function(item) {
    	return twoOutcome(no(item))
    },


});

Template.home.events({
    'click .button': function(e) {
    IonNavigation.skipTransitions = true;
		if ($(e.currentTarget).attr("level") === "start") {
			var f = buttons.pop()
			Session.set(f, false)
			$(e.currentTarget).fadeOut();
			Session.set('currentFrom', this)
			Session.set(e.currentTarget.id, true)
			buttons.push(e.currentTarget.id)
		}
		else if ($(e.currentTarget).attr("level") === "inter") {
			$(e.currentTarget).fadeOut();
			Session.set('currentFrom', this)
			Session.set(e.currentTarget.id, true)
			buttons.push(e.currentTarget.id)
		}
		else if ($(e.currentTarget).attr("level") === "end") {
			while ( buttons.length > 0 ){
				var f = buttons.pop()
				Session.set(f, false)
			}
			$(e.currentTarget).fadeOut();
			console.log("SET TO UNDEFINED")
			Session.set('currentFrom', undefined)
			}
		else {
			console.log("Failed button activation")
		}
	}
});

Template.next.events({
    'click': function(e) {
        IonNavigation.skipTransitions = true;
    }
});

Template.next.helpers({
	'current': function() {
		return Filters.findOne(Router.current().params._id)
	},
	'currentLinks': function() {
		qry = {};
		var a = Filters.findOne(Router.current().params._id)
		console.log(a)
    	qry["from"] = a;
    	return Links.find(qry)
	},
	'to': function(link) {
		return link.to
	}
})

Template.laws.helpers({
	'laws': function() {
		var laws = Laws.find({})
		return laws && laws
	}
});

Template.law.helpers({
	'thisLaw': function() {
		return Laws.findOne(Router.current().params._id)
	}
})

Template.ttabs.onRendered( function () {
    Session.set('currentTab', 'end')
})

Template.end.onCreated( function() {
    lawHolder.push(Router.current().params._id)
})

Template.endLayout.onDestroyed( function () {
    console.log('Destroyed')
    lawHolder.pop()
})

Template.summaryTab.helpers({
    'thisLaw': function() {
        var l = lawHolder[0]
        return Laws.findOne(l)
    }
})

Template.exampleTab.helpers({
    'thisLaw': function() {
        var l = lawHolder[0]
        return Laws.findOne(l)
    }
})

Template.lawTab.helpers({
    'thisLaw': function() {
        var l = lawHolder[0]
        return Laws.findOne(l)
    }
})

Template.end.helpers({
    'thisLaw': function() {
        var l = lawHolder[0]
        return Laws.findOne(l)
    }
})

//Asynchronous call to the collection method 'removeElement'
//The third argument is a special async arg, making the call async and forcing you
//to handle the possible async error as done here

Template.home.events({
	'click .button-assertive': function(e) {
		e.preventDefault();
		Meteor.call('removeElement', this._id, function(error, result) {
			if (error) alert(error.reason);
		});
		return;
	}
});

Template.edit.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
      		Meteor.subscribe("element", Router.current().params._id);
    	}
  	});
});

Template.edit.helpers({
	'selectedDoc': function() {
		return Elements.findOne(Router.current().params._id);
	}
});



//hooks provide callback when the given formID is provided in an AutoForm call
//The id is used to connect the forms to the hook
//When is the hook called? In this case onSubmit

AutoForm.hooks({
	insertElementForm: {
		onSubmit: function(insertDoc) {
			Meteor.call('addElement', insertDoc, function(error, result) {
				if (error) alert(error.reason);
			});
			$(".back-button").click();
			return false;
		}
	}
});

AutoForm.hooks({
	editElementForm: {
		onSubmit: function(insertDoc, updateDoc, currentDoc) {
			var obj = {_id: Router.current().params._id, updateDoc: updateDoc};
			Meteor.call('editElement', obj, function(error, result) {
				if (error) alert(error.reason);
			});
			$(".back-button").click();
			return false;
		}
	}
});