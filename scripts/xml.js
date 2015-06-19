define([''], function(){ // Registered in config.js
    var mData = null; // private
    var _fnc = {
        Xml:function(paramData){
            if(paramData){ // differnet ways of instantiating, but has to be instantiated at least once with paramData
                this.set(paramData);                
            } 
        }
    }; // End _fnc
    _fnc.Xml.prototype = {
        getFirstParent:function(){
            this.doc = this.get();
            return this.doc.firstChild;
        },
        getChildren:function(paramTagName){
            return this.doc.getElementsByTagName(paramTagName);
        },
        getNodeNameAndValues:function(paramTagName){
            var nodes = this.getChildren(paramTagName);
            var len = nodes.length;
            var arrayNodeVals = [];
            var hash = {};

            for(var i = 0; i < len; i++){
                hash = new Object(); // clear hash
                hash[nodes[i].nodeName] = nodes[i].firstChild.nodeValue;
                arrayNodeVals.push(hash);
            }
            return arrayNodeVals;
        },
        set:function(paramData){
            mData = paramData; // persist data between different instances
        },
        get:function(){
            return mData;
        }                 
    };

    return {
        fnc:_fnc
    };

});