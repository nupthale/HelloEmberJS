Ember.Handlebars.registerBoundHelper("pagination",function(pageInfo,options){

    var page          = pageInfo,
        totalPage     = page.totalPage,
        range         = 3,
        currentPage   = Math.min(page.currentPage, page.totalPage),
        prevPage      = (currentPage - 1) || 1,
        nextPage      = currentPage >= page.totalPage ? page.totalPage : (currentPage + 1),
        query         = pageInfo.query || {};
        
    var param = function(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(i + '=' + obj[i]);
        }
        return arr.join('&');
    };

    /* to use refreshModel action */
    // var bar = Ember.Handlebars.get(this, pageInfo, options);
    var action = function(argument, query) {
        var args = Array.prototype.slice.call(argument, 1);
        args.unshift(param(query));
        args.unshift("refreshModel");
        return Ember.Handlebars.helpers.action.apply(this, args);
    }

    query.page = prevPage;
    var prevString = '<li class="'+ (currentPage === 1? 'disabled' : '') +'">'
                   + '<a '+ new Em.Handlebars.SafeString(action(arguments, query)) +'>&laquo;</a>';

    var pageString = '';
    if(currentPage - range >= 2) {
        query.page = 1;
        pageString += '<li class="'+ (currentPage === 1? 'active' : '') +'">'
                    + '<a '+ new Em.Handlebars.SafeString(action(arguments, query)) +'>1</a></li>'
                    + '<li><a>...</a></li>';
    }

    for(var i = 1; i < totalPage; i++) {
        query.page = i;
        if(i >= Math.max(currentPage - range, 1) && i <= Math.min(range + currentPage, totalPage)) {
            pageString += '<li class="' +(currentPage === i? 'active': '') +'">'
                        + '<a '+ new Em.Handlebars.SafeString(action(arguments, query))+'>'+ i +'</a></li>';
        }
    }

    if(currentPage + range <= totalPage -1) {
        query.page = totalPage;
        pageString += '<li><a>...</a></li>'
                    + '<li class="'+ (currentPage === totalPage? 'active':'') +'">'
                    + '<a '+ new Em.Handlebars.SafeString(action(arguments, query))+'>'+ totalPage +'</a></li>';
    }

    var nextString = '';
    query.page = nextPage;
    nextString += '<li class="'+ (currentPage === totalPage? 'disabled':'') +'">'
                + '<a '+ new Em.Handlebars.SafeString(action(arguments, query))+'>&raquo;</a></li>';
    
    return new Em.Handlebars.SafeString(prevString + pageString + nextString);
});