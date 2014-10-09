var App = Em.Application.create({
    LOG_TRANSITION:true
});

App.Router.map(function() {
    this.resource('comments', {path:'/'});
    this.resource('dynamics', {path:'/dynamics'});
    this.resource('activities', {path:'/activities'});
    this.resource('services', {path:'/services'});
    this.resource('violations', {path:'/violations'});
});

App.Store = DS.Store.extend({
  adapter: DS.RESTAdapter
});

store = App.Store.create({});

App.ApplicationController = Em.Controller.extend({
    selectedTab:'comments'
});

App.TabView = Em.View.extend({
    tagName:'li',
    active: false,
    classNameBindings: ['isActive:active'],
    isActive: function(e) {
        return this.get('item') === this.get('controller.selectedTab');
    }.property('item', 'controller.selectedTab').cacheable(),
    click: function() {
        var curTab = this.get('item');
        this.get('controller').set('selectedTab', curTab);
    }
});