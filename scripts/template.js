define(['underscore' ,'util', 'xml', 'regex'], function(_, util, xml, regEx){
    var listenerPopulateButtons = function(e, paramTemplate){
        var w = window, d = document;
        var data = e.data;
        var templateHtml = paramTemplate;
        var strIdTemplate = regEx.fnc.getIdFromString(templateHtml);
        var strTemplateHtml = $(templateHtml).html(); // our custom template, not the entire response text
        var strFragment = '';
        var strButtonValue = '';
        var template = _.template(strTemplateHtml);
        var $nodeExist = $('#buttons');
        
        for(var i = 0, len = data.length; i < len; i++){
               strButtonValue = data[i].button; // data from JSON so button[i] is next element. Elements are hashes having name value pairs
               strFragment += template( btnValue = strButtonValue ); // btnValue is variable defined in template
        }

        $nodeExist.html(strFragment);
    };
    var _fnc = {
        populateControls:function(options){
            var $nodeExist = options.$nodeContainer;
            var hash = options.hashNameValues;
            var strEvent = 'retrieved:template';
            var strSelector = '#' + $nodeExist.attr('id');
            // TODO: get template via util

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