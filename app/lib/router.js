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
            Meteor.subscribe("links") ];
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

/*
Router.route('/', function () {
    this.layout('defaultLayout')
    this.render('home') 
}, {
    name: 'home'
});
*/

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
    this.render('next');
  }, {
    name: 'next'
});

Router.route('/links', function () {
    this.layout('defaultLayout');
    this.render('links');
});

Router.route('/info', function () {
    this.layout('defaultLayout');
    this.render('info');
});

Router.route('/info/:_id', function (){
    this.layout('defaultLayout');
    this.render('infoElement');
}, {
    name: 'infoElement'
});

Router.route('/infoAbout', function (){
    this.layout('infoAbout');
    this.render('infoAbout', {to: 'tab'});
}, {
    name: 'infoAbout'
});

Router.route('/end/:_id', function (){
    this.render('endLayout');
  }, {
    name: 'end'
});

Router.route('/lawTab', function (){
    this.layout('endLayout');
    this.render('lawTab', {to: 'tab'});
  }, {
    name: 'lawTab'
});
Router.route('/summaryTab', function (){
    this.layout('endLayout');
    this.render('summaryTab', {to: 'tab'});
  }, {
    name: 'summaryTab'
});
Router.route('/exampleTab', function (){
    this.layout('endLayout');
    this.render('exampleTab', {to: 'tab'});
  }, {
    name: 'exampleTab'
});

Router.route('/signin', function (){
    this.layout('defaultLayout');
    this.render('signin');
  }, {
    name: 'signin'
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

Router.route('/login', function () {
  this.render('login');
}, {
  name: 'login'
});

Router.route('/edit/case/:_id', function () {
  this.layout('editLayout');
  this.render('addcase', {to: 'add'});
  this.render('editcase', {to: 'edit'});
}, {
  name: 'edit.case'
});

Router.route('edit/link/:_id', function (){
    this.layout('editLayout')
    this.render('addlink', {to: 'add'});
    this.render('editlink', {to: 'edit'});
  }, {
    name: 'edit.link'
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

Router.route('edit/url/:_id', function (){
    this.layout('editLayout')
    this.render('addurl', {to: 'add'});
    this.render('editlink', {to: 'edit'});
  }, {
    name: 'edit.url'
});
