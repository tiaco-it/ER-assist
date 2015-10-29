//A router lets navigation to URLs feel more like navigation in an app
//compared to disjointed web pages

//Standard behaviour: If the user navigates to the url of the route, render the template
//with the same name

//Route paths are relative to base url of the page

Router.configure({
  layoutTemplate: 'defaultLayout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.route('/', function () {
    this.layout('defaultLayout')
    this.render('home') 
}, {
    name: 'home'
});

Router.route('/laws', function (){
    this.layout('defaultLayout')
    this.render('laws');
  }, {
    name: 'laws'
});

Router.route('/law/:_id', function (){
    this.render('law');
  }, {
    name: 'law'
});

Router.route('/next/:_id', function (){
    this.layout('defaultLayout')
    this.render('next');
  }, {
    name: 'next'
});

Router.route('/links', function () {
    this.render('links');
});

Router.route('/info', function () {
    this.render('info');
});

Router.route('/info/:_id', function (){
    this.render('infoElement');
}, {
    name: 'infoElement'
});

Router.route('/infoAbout', function (){
    this.layout('infoAbout')
    this.render('infoAbout', {to: 'tab'});
}, {
    name: 'infoAbout'
});

Router.route('/end/:_id', function (){
    this.layout('endLayout')
    this.render('end', {to: 'tab'});
  }, {
    name: 'end'
});

Router.route('/lawTab', function (){
    this.layout('endLayout')
    this.render('lawTab', {to: 'tab'});
  }, {
    name: 'lawTab'
});
Router.route('/summaryTab', function (){
    this.layout('endLayout')
    this.render('summaryTab', {to: 'tab'});
  }, {
    name: 'summaryTab'
});
Router.route('/exampleTab', function (){
    this.layout('endLayout')
    this.render('exampleTab', {to: 'tab'});
  }, {
    name: 'exampleTab'
});

Router.route('/signin', function (){
    this.layout('defaultLayout')
    this.render('signin');
  }, {
    name: 'signin'
});

Router.route('/admin', function () {
  this.layout('defaultLayout')
  this.render('admin');
}, {
  name: 'admin'
});

Router.route('/admin/cases', function () {
  this.layout('defaultLayout')
  this.render('admincases');
}, {
  name: 'admincases'
});

Router.route('/admin/filters', function () {
  this.layout('defaultLayout')
  this.render('adminfilters');
}, {
  name: 'adminfilters'
});

Router.route('/admin/links', function () {
  this.layout('defaultLayout')
  this.render('adminlinks');
}, {
  name: 'adminlinks'
});

Router.route('/admin/laws', function () {
  this.layout('defaultLayout')
  this.render('adminlaws');
}, {
  name: 'adminlaws'
});

Router.route('/login', function () {
  this.render('login');
}, {
  name: 'login'
});

Router.route('/editcase/:_id', function () {
  this.layout('defaultLayout');
  this.render('editcase');
}, {
  name: 'editcase'
});
