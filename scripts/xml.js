define([''], function(){ // Registered in config.js
    var mData = null; // private
    var _fnc = {
        Xml:function(paramData){
            if(paramData){ // differnet ways of instantiating, but has to be instantiated at least once with paramData
                this.set(paramData);                
            } 
        }
    }; // End _fnc ...
    _fnc.Xml.prototype = {
        getFirstParent:function(){
            this.doc = this.get();
            return this.doc.firstChild;
        },
        getChildren:function(paramTagName){
            this.doc = this.doc || this.get(); // ensure doc exists
            return this.doc.getElementsByTagName(paramTagName);
        },
        getNodeNameAndValues:function(paramTagName){
            var nodes = this.getChildren(paramTagName);
            var len = nodes.length;
            var arrayNodeVals = [];
            var hash = {};
            //TODO: {nodeName:nodeValue, attributes[{name:value}, {name, value}]} AND rename getNodeNameAndValues to getNodeNameAndAttributes
            for(var i = 0; i < len; i++){
                hash = new Object(); // clear hash

                hash[nodes[i].nodeName] = nodes[i].firstChild.nodeValue;
                if(nodes[i].attributes.length > 0){
                    this.getAttributes(hash, nodes[i]);
                }

                
                arrayNodeVals.push(hash);
                
            }
            return arrayNodeVals;
        },
        getAttributes:function(paramHash, paramNode){
            var attributes = paramNode.attributes;
            var len = attributes.length; 
            var arryAttributes = [];
            
            for(var i = 0; i < len; i++){
                arryAttributes[attributes[i].name] = attributes[i].value;
            }
            paramHash['attributes'] = arryAttributes;
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