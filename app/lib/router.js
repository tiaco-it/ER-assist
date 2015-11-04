//A router lets navigation to URLs feel more like navigation in an app
//compared to disjointed web pages

//Standard behaviour: If the user navigates to the url of the route, render the template
//with the same name

//Route paths are relative to base url of the page

Router.configure({
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe("startcases"),
            Meteor.subscribe("laws"),
            Meteor.subscribe("filters"),
            Meteor.subscribe("links"),
            Meteor.subscribe("urls"),
            Meteor.subscribe("numbers"),
            Meteor.subscribe("info") ];
  }
});

Router.route('/', function() {
    this.layout('defaultLayout');
    this.render('homeHeader', {to: 'header'});
    this.render('homeContent');
    this.render('mtabs', {to: 'footer'});
  }, {
  name: 'home'
});

Router.route('/laws', function (){
    this.layout('defaultLayout');
    this.render('laws');
  }, {
    name: 'laws'
});

Router.route('/law/:_id', function (){
    this.layout('defaultLayout');
    this.render('law');
  }, {
    name: 'law'
});

Router.route('/next/:_id', function (){
    this.layout('defaultLayout');
    this.render('nextHeader', {to: 'header'});
    this.render('next');
  }, {
    name: 'next'
});

Router.route('/links', function (){
    this.layout('topTabsLayout');
    this.render('linksLayout');
    this.render('urls', {to: 'tabTemplate'});
  }, {
    name: 'links'
});

Router.route('/info', function (){
    this.layout('topTabsLayout');
    this.render('infoLayout');
    this.render('howto', {to: 'tabTemplate'});
  }, {
    name: 'info'
});

Router.route('/end/:_id', function (){
    this.layout('topTabsLayout');
    this.render('endLayout');
    this.render('tlaw', {to: 'tabTemplate'});
  }, {
    name: 'end'
});

Router.route('/admin', function () {
  this.layout('defaultLayout');
  this.render('admin');
}, {
  name: 'admin'
});

Router.route('/admin/cases', function () {
  this.layout('defaultLayout');
  this.render('admincases');
}, {
  name: 'admincases'
});

Router.route('/admin/filters', function () {
  this.layout('defaultLayout');
  this.render('adminfilters');
}, {
  name: 'adminfilters'
});

Router.route('/admin/links', function () {
  this.layout('defaultLayout');
  this.render('adminlinks');
}, {
  name: 'adminlinks'
});

Router.route('/admin/laws', function () {
  this.layout('defaultLayout');
  this.render('adminlaws');
}, {
  name: 'adminlaws'
});

Router.route('/edit/case/:_id', function () {
  this.layout('editLayout');
  this.render('editcase', {to: 'edit'});
}, {
  name: 'edit.case'
});

Router.route('/add/case', function () {
  this.layout('editLayout');
  this.render('addcase', {to: 'add'});
}, {
  name: 'add.case'
});

Router.route('edit/url/:_id', function (){
    this.layout('editLayout')
    this.render('editurl', {to: 'edit'});
  }, {
    name: 'edit.url'
});

Router.route('/add/url', function () {
  this.layout('editLayout');
  this.render('addurl', {to: 'add'});
}, {
  name: 'add.url'
});

Router.route('edit/number/:_id', function (){
    this.layout('editLayout')
    this.render('editnumber', {to: 'edit'});
  }, {
    name: 'edit.number'
});

Router.route('/add/number', function () {
  this.layout('editLayout');
  this.render('addnumber', {to: 'add'});
}, {
  name: 'add.number'
});

Router.route('edit/law/:_id', function (){
    this.layout('editLayout')
    this.render('addlaw', {to: 'add'});
    this.render('editlaw', {to: 'edit'});
  }, {
    name: 'edit.law'
});

Router.route('edit/filter/:_id', function (){
    this.layout('editLayout')
    this.render('addfilter', {to: 'add'})
    this.render('editfilter', {to: 'edit'});
  }, {
    name: 'edit.filter'
});

Router.route('edit/info/:_id', function (){
    this.layout('editLayout')
    this.render('addinfo', {to: 'add'})
    this.render('editinfo', {to: 'edit'});
  }, {
    name: 'edit.info'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'login',
    layoutTemplate: 'defaultLayout',
    redirect: '/',
});
