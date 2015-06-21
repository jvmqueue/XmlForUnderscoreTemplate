/* template, util, xml dependencies definied in config.js */
require(['template' ,'util', 'xml'], function(template, util, xml){ // load and use modules
    var w = window, d = document;
    var $mNode = null;
    var getLclData = function(options){
        var strPath = options.path;
        var blnCache = false;
        var strFileType = options.fileType || 'xml';
        var response = util.fnc.getData({ // not explicitly using the response. util.getData sends response to event handler
            $node:options.$node, 
            event:options.event || '', // event defined in main
            path:strPath, 
            fileType:strFileType, 
            cache:blnCache
        });
    };

    var setButtonEvents = function(){
        var strSelector = null;
        var interval = w.setInterval(function(){ // wait for buttons to render, we do not need jQuery for this
            if( !!d.getElementById('btn0') ){
                w.clearInterval(interval);
                strSelector = ('.button');
                util.fnc.setListener({selector:strSelector, event:'click', data:{}, listener:listener.buttonEvents});
            }
        }, 44);
    };

    var listener = {
        setXmlData:function(e, paramData){
            var strEventName = e.data.event; // defined during intialization of listener
            // set data on xml.fnc.Xml
            var objXml = new xml.fnc.Xml(paramData);
            $mNode.trigger(strEventName); // trigger custom listener defined in main()            
        },
        initHtmlButtons:function(e){
            var doc = new xml.fnc.Xml();
            var nodeParent = doc.getFirstParent(); // no data necessary, because set during initial instantiation
            var hashData = doc.getNodeNameAndValues('button');
            var $nodeExist = $('#buttons');
           template.fnc.populateControls( {$nodeContainer:$nodeExist, hashNameValues:hashData} );
           setButtonEvents();
        },
        renderContent:function(e, paramData){
            var $nodeExist = $('#mainContent');
            var doc = new xml.fnc.Xml(paramData);
            var hashData = doc.getNodeNameAndValues('lineItem');
            var strTemplatePath = e.data.templatePath;
            template.fnc.populateMainContent( {
                $nodeContainer:$nodeExist, 
                hashNameValues:hashData,
                templatePath:strTemplatePath
            } );
        },
        buttonEvents:function(e){
            var strId = e.target.id;
            var strSelector = '#' + strId;
            var $nodeTarget = $(strSelector);
            var strPath = 'data/home.xml';
            var strEventXmlDataResponse = 'response:xml';
            switch(strId){
                case 'btn0':
                    util.fnc.setListener({
                        selector:strSelector, 
                        event:strEventXmlDataResponse, 
                        data:{templatePath:'templates/home.html'}, 
                        listener:listener.renderContent
                    });
                    getLclData({$node:$nodeTarget, event:strEventXmlDataResponse, path:strPath}); // fires strEventXmlDataResponse when data retrieved
                    break;
                default:
                    // TODO: throw exception
            } // End switch
        }

    }; // End listener


    var main = function(){
        var strSelector = '#container';
        $mNode = $(strSelector);
        var strEventXmlData = 'http:responseXmlData';
        var strEventXmlDataSet = 'xmlData:set';
        var strPath = 'data/buttons.xml';
        var fncListenerXmlData = listener.setXmlData;
        var fncListenerInitButtons = listener.initHtmlButtons;
        var fncListenerSetBtnEvents = listener.setButtonEvents;

        
        // when xml data retrieved fire strEventXmlData
        // fncListenerXml fires strEventXmlDataSet once it sets data
        util.fnc.setListener({selector:strSelector, event:strEventXmlData, data:{event:strEventXmlDataSet}, listener:fncListenerXmlData});
        util.fnc.setListener({selector:strSelector, event:strEventXmlDataSet, data:{}, listener:fncListenerInitButtons});
        getLclData({$node:$mNode, event:strEventXmlData, path:strPath});
    };

    var mainInterval = w.setInterval(function(){ // wait for DOM, we dont need jQuery for this
        if(d.getElementsByTagName('div').length > 0){
            w.clearInterval(mainInterval);
            main();
        }
    }, 44);
     

});