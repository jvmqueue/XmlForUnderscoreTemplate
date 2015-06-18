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
            event:options.event, // event defined in main
            path:strPath, 
            fileType:strFileType, 
            cache:blnCache
        });
    };

    var listener = {
        setXmlData:function(e, paramData){
            var strEventName = e.data.event;
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
        }

    }; // End listener


    var main = function(){
        var strSelector = '#container';
        $mNode = $(strSelector);
        var strEventXmlData = 'http:responseXmlData';
        var strEventXmlDataSet = 'xmlData:set';
        var strPath = 'data/buttons.xml';
        var objData = {}; // any data we want to send to the listener
        var fncListenerXmlData = listener.setXmlData;
        var fncListener = listener.initHtmlButtons;
        
        // when xml data retrieved fire strEventXmlData
        // fncListenerXml fires strEventXmlDataSet once it sets data
        util.fnc.setListener({selector:strSelector, event:strEventXmlData, data:{event:strEventXmlDataSet}, listener:fncListenerXmlData});
        util.fnc.setListener({selector:strSelector, event:strEventXmlDataSet, data:objData, listener:fncListener});
        getLclData({$node:$mNode, event:strEventXmlData, path:strPath});
    };

    var mainInterval = w.setInterval(function(){ // wait for DOM, we dont need jQuery for this
        if(d.getElementsByTagName('div').length > 0){
            w.clearInterval(mainInterval);
            main();
        }
    }, 44);
     

});