define(['underscore' ,'util', 'xml', 'regex'], function(_, util, xml, regEx){
    var w = window, d = document;
    var listenerPopulateButtons = function(e, paramTemplate){
        var data = e.data;
        var templateHtml = paramTemplate;
        var strIdTemplate = regEx.fnc.getIdFromString(templateHtml);
        var strTemplateHtml = $(templateHtml).html(); // our custom template, not the entire response text
        var strFragment = '';
        var strButtonValue = '';
        var strId = '';
        var template = _.template(strTemplateHtml);
        var $nodeExist = $('#buttons');
        
        for(var i = 0, len = data.length; i < len; i++){
               strButtonValue = data[i].button; // data from JSON so button[i] is next element. Elements are hashes having name value pairs
               strId = 'btn' + i;               
               strFragment += template(btnId = strId, btnValue = strButtonValue); // btnValue is variable defined in template
        }

        $nodeExist.html(strFragment);
    };
    var listenerPopulateMainContent = function(e, paramTemplate){
        var data = e.data;
        var templateHtml = paramTemplate;
        var strIdTemplate = regEx.fnc.getIdFromString(templateHtml);
        var strTemplateHtml = $(templateHtml).html(); // our custom template, not the entire response text
        var strFragment = '';
        var strLineItemValue = '';
        var strId = '';
        var template = _.template(strTemplateHtml);
        var $nodeExist = $('#mainContent'); // TODO: should be defined via parameter

        for(var i = 0, len = data.length; i < len; i++){
               strLineItemValue = data[i].lineItem; // data from JSON so button[i] is next element. Elements are hashes having name value pairs           
               strFragment += template(lineItemValue = strLineItemValue); // btnValue is variable defined in template
        }

        $nodeExist.html(strFragment);
    };
    var _fnc = {
        populateMainContent:function(options){
            var $nodeExist = options.$nodeContainer;
            var hash = options.hashNameValues;
            var strEvent = 'retrieved:template';
            var strTemplatePath = options.templatePath;
            var strSelector = '#' + $nodeExist.attr('id');

            util.fnc.setListener({ // define the listener
                selector:strSelector,
                event:strEvent,
                data:hash,
                listener:listenerPopulateMainContent
            });
            var req = util.fnc.getData({ // fires listener once data retrieved
                path:strTemplatePath,
                cache:false,
                fileType:'text',
                $node:$nodeExist,
                event:strEvent
            });                                


        },
        populateControls:function(options){
            var $nodeExist = options.$nodeContainer;
            var hash = options.hashNameValues;
            var strEvent = 'retrieved:template';
            var strSelector = '#' + $nodeExist.attr('id');
            
            // get template via util
            util.fnc.setListener({
                selector:strSelector,
                event:strEvent,
                data:hash,
                listener:listenerPopulateButtons
            });


            var req = util.fnc.getData({
                path:'templates/buttons.html',
                cache:false,
                fileType:'text',
                $node:$nodeExist,
                event:strEvent
            });
        }
    };

    return{
        fnc:_fnc
    }
} );