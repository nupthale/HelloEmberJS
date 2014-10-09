// Model
App.Comment = DS.Model.extend({
    commentId: DS.attr('string'),
    userId:DS.attr('string'),
    userAvatar:DS.attr('string'),
    userName:DS.attr('string'),
    phoneNo:DS.attr('string'),
    taobaoNick:DS.attr('string'),
    regTime:DS.attr('date'),
    userState: DS.attr('string')
});

App.CommentsController = Em.ArrayController.extend({
    actions: {
        toPage: function(queryString) {
            this.send('refreshModel', queryString);
        }
    }
});

// Route
App.CommentsRoute = Em.Route.extend({
    queryString:'',
    model:function() {
        return this.getComments();
    },
    setupController: function(controller, model) {
        controller.set('model', model.comments);
        controller.set('pageInfo', model.pageInfo);
    },
    actions: {
        refreshModel: function(queryString) {
            this.queryString = queryString;
            this.refresh();
        }
    },
    getComments: function() {
        var comments = [],
            url      = 'http://www.abc.com/abc.json' + (this.queryString ? '?'+this.queryString : '');
        return new Ember.RSVP.Promise(function(resolve) {
            $.ajax(url, {type:'GET'})
             .then(function(json) {
                json = JSON.parse(json);
                var index = 0;
                $.each(json.comments, function(index, comment) {
                    var commentObj = store.createRecord(App.Comment, comment);
                    var oddOrEven = index++%2 === 0 ? 'even' : 'odd';
                    commentObj.oddOrEven = oddOrEven;
                    comments.push(commentObj);
                });
                resolve({comments:comments, pageInfo:json.pageInfo});
             })
        });
    }
});

 