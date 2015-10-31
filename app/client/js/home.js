var buttons  = new Array();
var marks = new Array();
var lawHolder = new Array();

query = function(string, item) {
    var con = Links.findOne({
        $and: [
            {'mark': string },
            {'from.text': item.text}
        ]

    });
    var con2 = Links.findOne({
        $and: [
            {'mark': string},
            {'from.text': item.text}
        ]
    });
    return [con, con2]
};

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
        console.log('@oneOutcome');
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
        console.log('@twoOutcome');
        console.log("collection not built");
    }
};

// ------------ HOME ------------ //

Template.home.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("startcases");
            self.subscribe("laws");
            self.subscribe("filters");
            self.subscribe("links");
        }
    });
});

Template.home.helpers({
    'startcases': function() {
        var cases = Startcases.find({});
        return cases && cases
    },
    'links': function() {
        var links = Links.find({});
        return links && links
    },
    'laws': function() {
        var links = Laws.find({});
        return links && links
    },
    'filters': function() {
        var links = Filters.find({});
        return links && links
    },
    'singleLink': function(fromItem) {
        Links.findOne({
            from: fromItem
        })
    },
    'yesLink': function(scase) {
        var li = Links.findOne({
            $and: [
                { mark: 'JA' },
                {'from.text': scase.text}
            ]
        });
        return li.to
    },
    'noLink': function(scase) {
        var li = Links.findOne({
            $and: [
                { mark: 'NEI'},
                {'from.text': scase.text}
            ]
        });
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
        var con = Links.findOne({ 'from.text': scase.text})
        if ( typeof con === "undefined" ) {
            console.log('@to');
            console.log("collection not built");
        }
        else {
            return con.to
        }
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
    'username': function() {
        return Meteor.user().username
    },
        'link': function() {
        var links = Links.findOne({});
        return links && links
    },
        'filter': function() {
        var links = Filters.findOne({});
        return links && links
    },
        'law': function() {
        var links = Laws.findOne({});
        return links && links
    },
});

Template.home.events({
    'click .button': function(e) {
        IonNavigation.skipTransitions = true;
        if ($(e.currentTarget).attr("level") === "start") {
            while ( buttons.length > 0 ){
                var f = buttons.pop();
                Session.set(f, false)
            }
            $(e.currentTarget).fadeOut();
            Session.set('currentFrom', this);
            Session.set(e.currentTarget.id, true);
            buttons.push(e.currentTarget.id)
        }
        else if ($(e.currentTarget).attr("level") === "inter") {
            $(e.currentTarget).fadeOut();
            Session.set('currentFrom', this);
            Session.set(e.currentTarget.id, true);
            buttons.push(e.currentTarget.id)
        }
        else if ($(e.currentTarget).attr("level") === "end") {
            while ( buttons.length > 0 ){
                var f = buttons.pop();
                Session.set(f, false)
            }
            $(e.currentTarget).fadeOut();
            console.log("SET TO UNDEFINED");
            Session.set('currentFrom', undefined)
        }
        else if ($(e.currentTarget).attr("func") === "edit") {

        }
        else {
            console.log("Failed button activation")
        }
    }
});

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

// ------------ NEXT ------------ //

Template.next.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("laws");
            self.subscribe("filters");
            self.subscribe("links");
        }
    });
});

Template.next.helpers({
    'current': function() {
        return Filters.findOne(Router.current().params._id)
    },
    'currentLinks': function() {
        return Links.find( { 'from._id': Router.current().params._id } );
    },
    'to': function(link) {
        return link.to
    }
});

Template.next.events({
    'click': function(e) {
        IonNavigation.skipTransitions = true;
    }
});

// ------------ END ------------ //

Template.end.helpers({
    'thisLaw': function() {
        var l = lawHolder[0]
        return Laws.findOne(l)
    }
});


// ------------ TABS ------------ //

Template.end.onCreated(function() {
    lawHolder.push(Router.current().params._id)
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("startcases");
            self.subscribe("laws");
            self.subscribe("filters");
            self.subscribe("links");
        }
    });
});

Template.ttabs.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("startcases");
            self.subscribe("laws");
            self.subscribe("filters");
            self.subscribe("links");
        }
    });
});

Template.ttabs.onRendered( function () {
    Session.set('currentTab', 'end')
});

Template.end.onCreated(function () {
    lawHolder.push(Router.current().params._id)
})

Template.endLayout.onCreated(function() {
    lawHolder.push(Router.current().params._id)
    var self = this;
    self.autorun(function() {
        if ( Meteor.status().connected ) {
            self.subscribe("startcases");
            self.subscribe("laws");
            self.subscribe("filters");
            self.subscribe("links");
        }
    });
});

Template.endLayout.onDestroyed( function () {
    console.log('Destroyed');
    lawHolder.pop()
});


Template.summaryTab.helpers({
    'thisLaw': function() {
        var l = lawHolder[0];
        return Laws.findOne(l)
    }
});

Template.exampleTab.helpers({
    'thisLaw': function() {
        var l = lawHolder[0];
        return Laws.findOne(l)
    }
});

Template.lawTab.helpers({
    'thisLaw': function() {
        var l = lawHolder[0];
        return Laws.findOne(l)
    }
});