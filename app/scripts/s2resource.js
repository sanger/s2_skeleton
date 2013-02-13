define(['s2ajax', 's2events', 's2api', 's2resource'], function (s2ajax, s2event, s2, s2resource) {
    "use strict";


    var s2resource =  {
        tube: function (node) {
            this.resourceType = 'tube';
            this.aliquots = [];
            for (var aliquot in node.aliquots){

                for (var contents in node.aliquots[aliquot]){
                    if (contents === 'sample' || contents === 'tag'){
                        this['aliquots'].push(new s2resource[contents](node.aliquots[aliquot][contents]));

                    }

                }

            }
            return completeResource (this,node);
        },
        sample: function (node){
            this.resourceType = 'sample';
            return completeResource (this,node);
        },
        tag: function (node){
            this.resourceType = 'tag';
            return completeResource (this,node);
        }


    }


    function completeResource (resource, node){
        resource.rawJson = node;
        for (var action in resource.rawJson.actions){
            resource[action] = function (sendData){
                s2ajax.send(action, resource.rawJson.actions[action], sendData, null);
            };

        }


        if(!s2.resources[resource.rawJson.uuid]) {
            s2.resources[resource.rawJson.uuid] = resource;
        }

        $.extend(true, s2.resources[resource.rawJson.uuid], resource);
        s2.emit({event:'resourceUpdated', data: resource});

        return resource;

    }



/*


    for (var resourceType in s2resource) {

        s2resource[resourceType].prototype.init = function (type){
            this.uuid = node.uuid;

            //this.rawJson = data;


        };
        s2resource[resourceType].prototype.create = function (data){
            s2ajax.send('create',this.rawJson.actions.create,data,null);
            //return this.resourceType;
        };
        s2resource[resourceType].prototype.read = function (data){
            s2ajax.send('create',this.rawJson.actions.read,data,null);
            //return this.resourceType;
        };
        s2resource[resourceType].prototype.update = function (data){
            s2ajax.send('create',this.rawJson.actions.update,data,null);

        };
        s2resource[resourceType].prototype.delete = function (data){
            s2ajax.send('create',this.rawJson.actions.delete,data,null);
            //return this.resourceType;
        };

    }
*/

    return s2resource;

});





/*
 var resource  = {
 //parent: parent,
 json: json,
 actions: json.actions,
 resourceType: type
 };

 s2[type] = s2[type] || {}
 s2[type][json.uuid] = resource;
 console.log('Created s2.' + type + '[' + json.uuid + ']');
 //check for sub resources

 for (var key in json) {
 //console.log(json)
 if (typeof json[key] == 'array' || typeof json[key] == 'object') {
 //console.log('checking' + key);
 s2resource.parseJson(json[key]);
 }
 /*console.log('checking:'+ key)
 if (key !== 'parent') {
 json[key].parent = resource;
 node = {};
 node[key] = json[key];
 //if(json[key].uuid)

 new s2resource.parseJson(node);
 }

 }
 ;
 }
 */