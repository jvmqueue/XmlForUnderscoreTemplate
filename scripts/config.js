requirejs.config({
    paths:{
        "jquery":["base/bower_components/jquery/dist/jquery"],
        "underscore":["base/bower_components/underscore/underscore"],
        "bootstrap":["base/bower_components/bootstrap/dist/js/bootstrap"], 
        "util":["util"], 
        "xml":["xml"],
        "regex":["regex"],
        "template":["template"], 
        "myTestAlias":["testOnly"] // loads only when a module requires it, where myTestAlias is its alias
    },
    shim:{
        'jquery':{
            exports:'$'
        },
        'bootstrap':{
            deps:['jquery']
        },
        'underscore':{
            exports:'_'
        },
        'util':{
            deps:['jquery']
        },
        'main':{
            deps:['template' ,'util', 'xml']
        },
        'template':{ // loading template will load dependencies, even if template.js does not call bootstrap explicitly
            deps:['underscore', 'regex', 'bootstrap']
        } 
    },
    deps:['main'] // where our program begins execution
});
//requirejs(["scripts/main.js"]);  // where our program begins execution