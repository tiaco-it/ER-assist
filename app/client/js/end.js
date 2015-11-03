var lawHolder = new Array();


Template.endLayout.helpers({
    'thisLaw': function() {
        var l = lawHolder[0]
        return Laws.findOne(l)
    }
});

Template.endLayout.onCreated(function() {
    lawHolder.push(Router.current().params._id);
});

Template.endLayout.onDestroyed( function () {
    console.log('Destroyed');
    lawHolder.pop();
});