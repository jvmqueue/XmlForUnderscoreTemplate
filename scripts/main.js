/* template, util, xml dependencies definied in config.js */
require(['template' ,'util', 'xml'], function(template, util, xml){ // load and use modules
    var w = window, d = document;
    var $mNode = null;
    var getLclData = function(options){
        var strPath = options.path;
        var blnCache = false;
        var strFileType = options.fileType || 'xml';
        var nodeNameXml = options.nodeXml || '';
        var response = util.fnc.getData({ // not explicitly using the response. util.getData sends response to event handler
            $node:options.$node, 
            event:options.event || '', // event defined in main or during button click events
            path:strPath, 
            fileType:strFileType, 
            tagNameXml:nodeNameXml,
            $context:options.$context,
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
        setXmlData:function(e, paramData, paramXmlTagName, $paramThis){
            var $that = $paramThis;
            var strEventName = e.data.event; // defined during intialization of listener
            // set data on xml.fnc.Xml
            var objXml = new xml.fnc.Xml(paramData);
            $mNode.triggerHandler(strEventName); // trigger custom listener defined in main()            
        },
        initHtmlButtons:function(e){
            var doc = new xml.fnc.Xml();
            var nodeParent = doc.getFirstParent(); // no data necessary, because set during initial instantiation
            var hashData = doc.getNodeNameAndValues('button');
            var $nodeExist = $('#buttons');
           template.fnc.populateControls( {$nodeContainer:$nodeExist, hashNameValues:hashData} );
           setButtonEvents();
        },
        renderContent:function(e, paramData, paramXmlTagName){
            var $nodeExist = $('#mainContent');
            var doc = new xml.fnc.Xml(paramData);
            var tagNameXml = paramXmlTagName;
            var hashData = doc.getNodeNameAndValues(tagNameXml);

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
            var strPath = null;
            var strTemplatePath = null;
            var strEventXmlDataResponse = 'response:xml';
            var strXmlNode = null;

            switch(strId){
                case 'btn0':
                    strPath = 'data/home.xml';
                    strTemplatePath = 'templates/home.html';
                    strXmlNode = 'lineItem';
                    break;
                case 'btn1':
                    strPath = 'data/resume.xml';
                    strTemplatePath = 'templates/resume.html';
                    strXmlNode = 'lineItem';
                    break;                    
                default:
                    // TODO: throw exception
            } // End switch

            getLclData({$node:$nodeTarget, event:strEventXmlDataResponse, path:strPath, nodeXml:strXmlNode}); // fires strEventXmlDataResponse when data retrieved
            util.fnc.setListener({ // vars set in switch block, now simply apply them
                selector:strSelector, 
                event:strEventXmlDataResponse, 
                data:{templatePath:strTemplatePath}, 
                listener:listener.renderContent
            });            
        }

    }; // End listener


    var main = function(){
        var strSelector = '#container';
        $mNode = $(strSelector);
        var $context = $('#mainContent.colRight');
        var strEventXmlData = 'http:responseXmlData';
        var strEventXmlDataSet = 'xmlData:set';
        var strPath = 'data/buttons.xml';
        var fncListenerXmlData = listener.setXmlData;
        var fncListenerInitButtons = listener.initHtmlButtons;
        
        // when xml data retrieved fire strEventXmlData
        // fncListenerXml fires strEventXmlDataSet once it sets data
        util.fnc.setListener({selector:strSelector, event:strEventXmlData, data:{event:strEventXmlDataSet}, listener:fncListenerXmlData});
        util.fnc.setListener({selector:strSelector, event:strEventXmlDataSet, data:{}, listener:fncListenerInitButtons});
        getLclData({$node:$mNode, event:strEventXmlData, path:strPath, $context:$context});
    };

    var mainInterval = w.setInterval(function(){ // wait for DOM, we dont need jQuery for this
        if(d.getElementsByTagName('div').length > 0){
            w.clearInterval(mainInterval);
            main();
        }
    }, 44);
     

});