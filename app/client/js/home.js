var buttons  = new Array();
path = new Array();
lawHolder = new Array();

//Helpers for template helpers

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

Template.homeContent.onCreated( function () {
    Session.set('nextAdded', false);
    path = [];
    if (Session.get('cleanDB')) {
        dbCleanup();
    }
    if (Session.get('cleanPath')) {
        addPathCleanup();
    }
});

Template.homeContent.rendered = function () {
    IonNavigation.skipTransitions = true;
};

Template.homeContent.helpers({
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
        Session.set('question', scase.text);
        var li = Links.findOne({
            $and: [
                { mark: 'JA' },
                {'from.text': scase.text}
            ]
        });
        console.log(scase.text);
        console.log(li);
        return li.to
    },
    'noLink': function(scase) {
        Session.set('question', scase.text);
        var li = Links.findOne({
            $and: [
                { mark: 'NEI'},
                {'from.text': scase.text}
            ]
        });
        console.log(scase.text);
        console.log(li)
        return li.to
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

Template.homeContent.events({
    'click .removeButton': function(e) {
        IonPopup.confirm({
            title: 'Are you sure you want to remove the path?',
            template: 'Are you <strong>really</strong> sure?',
            onOk: function() {
                var scase = Startcases.findOne({ 'text': e.currentTarget.id });
                removePath(scase);
                console.log('Confirmed');
            },
            onCancel: function() {
                console.log('Cancelled');
            }
        });
    },
    'click .button': function(e) {
        IonNavigation.skipTransitions = true;
        if ($(e.currentTarget).attr("level") === "start") {
            while ( buttons.length > 0 ){
                var f = buttons.pop();
                Session.set(f, false)
            }
            $(e.currentTarget).fadeOut();
            Session.set('category', Startcases.findOne({ 'text': e.currentTarget.id }));
            Session.set('currentFrom', this);
            Session.set(e.currentTarget.id, true);
            buttons.push(e.currentTarget.id);
        }
        else if ($(e.currentTarget).attr("level") === "inter") {
            var item = {};
            item['question'] = Session.get('question');
            item['answer'] = $(e.currentTarget).text();
            path.push(item);
            Session.set('currentFrom', this);
            Session.set(e.currentTarget.id, true);
            buttons.push(e.currentTarget.id)
        }
        else if ($(e.currentTarget).attr("level") === "end") {
            while ( buttons.length > 0 ){
                var f = buttons.pop();
                Session.set(f, false)
            }
            var item = {};
            item['question'] = Session.get('question');
            item['answer'] = $(e.currentTarget).text();
            path.push(item);
            $(e.currentTarget).fadeOut();
            Session.set('currentFrom', undefined)
        }
        else {
            console.log("Button outside button event scope")
        }
    }
});

//Asynchronous call to the collection method 'removeElement'
//The third argument is a special async arg, making the call async and forcing you
//to handle the possible async error as done here


/*
Template.home.events({
    'click .button-assertive': function(e) {
        e.preventDefault();
        Meteor.call('removeElement', this._id, function(error, result) {
            if (error) alert(error.reason);
        });
        return;
    }
});
*/

// ------------ GLOBAL ------------ //

$('html').click(function(e) {
    if(!$(e.target).hasClass("button") ) {
    while ( buttons.length > 0 ){
        var f = buttons.pop();
        Session.set(f, false);
    }
    if (Router.current().route !== undefined) {
        if (Router.current().route.name === 'home') {
            path = [];
        }
    }
}
    else {
    }
});
