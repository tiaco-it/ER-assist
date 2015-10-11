Template.home.helpers({
    'links': function() {
        var links = Links.find({})
    }
    'path': function(filter) {
        if (filter.number_of_outcomes < 2) {

        }
    }
    'singleLink': function() {
        Links.findOne({
            { from: fromItem }
        })
    }
    'yesLink': function() {
        Links.findOne({
            $and: [
            { mark: 'JA' },
            { from: fromItem }
            ]
        })
    }
    'noLink': function() {
        Links.findOne({
            $and: [
            { mark: 'NEI'},
            { from: fromItem}
            ]
        })
    'allLinks': function() {
        Links.find({
            { from: fromItem }
        })
    }
    }

if TO.toLaw:
    path = To  // Rett til template Laws
else //to is a filter
    if TO.number_of_outcomes > 2
        path = selectionTemplate //options taken from links where this item is in the 'from' field
    else if TO.number_of_outcomes == 2
        overlay yes/no if clicked // path on buttons from links where this is from
    else if TO.number_of_outcomes == 1
        path = getLinkByFromField(TO) // 

