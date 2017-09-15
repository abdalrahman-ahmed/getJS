(function(win){
    var doc = win.document;

    var css = function(href, callback) {
        var link = doc.createElement("link");
        link.rel = "stylesheet";
        link.href = href;

        link.onload = function(e){
            for(i in doc.styleSheets)
                if(d = doc.styleSheets[i].href == e.target.href)
                    return typeof callback === 'function' ? callback() : null;
            return setTimeout(e.target.onload);
        };
        
        link.onerror = function(e){
            console.error('Error '+e.target.tagName+':'+e.target.href+' failed loading.');
            return typeof callback === 'function' ? callback() : null;
        }

        doc.head.appendChild(link);
        
        return link;
    };

    var js = function(src, callback) {
        var script = doc.createElement("script");
        script.src = src;
        script.async = true;

        script.onload = typeof callback == 'function' ? callback : null;

        script.onerror = function(e){
            console.error('Error '+e.target.tagName+':'+e.target.src+' failed loading.');
            return typeof callback === 'function' ? callback() : null;
        };

        doc.head.appendChild(script);
        
        return script;
    };

    var getjs = function(urls, callback, loaded){
        if(!loaded){
            extraLoad.list.push(urls instanceof Array ? urls : [urls]);
            extraLoad.callback.push(callback);
            if(!extraLoad.loading){
                getjs(0, 0, 1);
            }
        }else{
            if(extraLoad.list[0] instanceof Array && extraLoad.list[0].length){
                extraLoad.loading = true;
                var path = extraLoad.list[0].shift(),
                    isJS = /\.js$/.test(path),
                    url = /^https?:/.test(path) ? path : win.location.origin + path,
                    tag = isJS ? {name:'script',attr:'src',url:url,ext:'js'} : {name:'link',attr:'href',url:url,ext:'css'},
                    exist = !!doc.querySelector(tag.name+'['+tag.attr+'="'+tag.url+'"],'+tag.name+'['+tag.attr+'="'+path+'"]');

                if(!exist){
                    extraLoad.get[tag.ext](tag.url, function(){
                        getjs(0, 0, 1);
                    });
                }else{
                    getjs(0, 0, 1);
                }
            }else if(typeof extraLoad.callback[0] == 'function'){
                extraLoad.callback[0]();
                extraLoad.callback[0] = undefined;
                getjs(0, 0, 1);
            }else{
                if(!extraLoad.list.length){
                    extraLoad.loading = false;
                }else{
                    extraLoad.list.shift();
                    extraLoad.callback.shift();
                    getjs(0, 0, 1);
                }
            }
        }
    };

    win.getjs = win.getJS = getjs;
    win.extraLoad = {list:[],callback:[],get:{css:css,js:js},loading:false};
}(window));
