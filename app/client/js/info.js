Template.infos.helpers({
    'infos': function() {
        var infos = Infos.find({})
        return infos && infos
    }
});

Template.info.helpers({
    'thisInfo': function() {
        return Infos.findOne(Router.current().params._id)
    }
});