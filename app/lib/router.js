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
    this.render('home');
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

Router.route('/step/_id', function (){
    this.layout('defaultLayout')
    this.render('step');
  }, {
    name: 'step'
});

Router.route('/edit/:_id', function () {
    this.render('edit');
  }, {
    name: 'edit'
    // reference for future code
    //var params = this.params; // {_id: 'some id'}
    //var id = params._id; // 'some id'
});

Router.route('/new', function () {
    this.render('new');
});

Router.route('/more', function () {
    this.render('more');
});

Router.route('/unused', function () {
    this.render('unused');
});