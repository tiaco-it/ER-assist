//A router lets navigation to URLs feel more like navigation in an app
//compared to disjointed web pages

//Standard behaviour: If the user navigates to the url of the route, render the template
//with the same name

//Route names are relative to base url of the page

Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('contacts', {path: '/'}),
  this.route('new'),
  this.route('edit', {path: 'edit/:_id'}),
  this.route('more')
});