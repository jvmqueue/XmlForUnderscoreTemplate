/* access via alias in scripts/config.js */
define([], function(){
  var w = window, d = document;
  var _fnc = {
      setListener:function(options){
        $(options.selector).on(options.event, options.data, options.listener);
      },
      getData:function(options){
        var noCache = new Date().getMilliseconds();
        return $.ajax({ // return the response so that callee does not have to look for reponse
            url:options.path + ( !!options.cache ? '' : '?noCache=' + noCache ),
            context:d.body,
            'file':options.fileType === 'xml' ? jQuery.parseXML : '',
            crossDomain:false,
            dataType:( !!options.fileType ? options.fileType : 'xml' ),
            tagNameXml:options.tagNameXml || '',
            ifModified:true,
            $node:options.$node || false,
            event:options.event || false,
            success:function(paramData){
              if(!!options.event){
                options.$node.triggerHandler(options.event, [paramData, options.tagNameXml]);
              }
            },
            statusCode:{
              404:function(){
                throw new Error('Exception: 404 - file not found');
              }
            },
            error:function(paramError){                
              throw new Error(
                'Exception: util.getData failed with:' + paramError.statusText +
                ' fileType:\t' + options.fileType +
                '\n, but file came back as:\t' + paramError.responseText
              ); 
            }
          }).done(function(){/* anything after done */});

      } // End getData

  }; // End _fnc

  return{
    fnc:_fnc
  };

});