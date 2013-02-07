define([], function () {
    //class
    /*var S2Resource = function (type, json, parent) {
        this.parent = parent;
        this.json = json;
        this.actions = json.actions;
        this.type = type;

        //emit events
        $(document).trigger('createdResource',this);

        //check for sub resources
        for (var key in json){
            if(json[key].actions && key !== 'parent'){
                json[key].parent = this;

                node = {};
                node[key] = json[key];

                S2.resources.add(node);
            }

        }
        return this;

    };
    */

    var S2Mapper = function (){
        $(document).ready(function () {
            S2.event.actOn.bind('initialize',function (){
                console.log('initialiseeed');
            });
        });


        $(document).bind('gotJson',function (data){
            alert('hurrah:' + data)
        });
        $(document).bind('createdResource',function (event,resource){

            console.log('Created resource of type: ' + resource.type + ' \\/');
            console.log(resource);
        });
    };

    S2Mapper.prototype.log = function (text){
        //console.log(text);
    };

    S2Mapper.prototype.resources = {
        add: function (json){
            for (var key in json){
                node = json[key];
                parent = node.parent || null


                if(node.actions){
                    new S2Resource(key,node,parent);
                }


            }
        }
    };
    S2Mapper.prototype.event = {
        actOn: $(document),
        send: function (event,data) {
            S2.event.actOn.trigger(event,data)
            //S2.ajax.send('root', 'order.json', null, 'gotResources');
        },
        listeners: function () {

        }
    }
    //S2.ajax.send('root', 'order.json', null, 'gotResources');
    S2Mapper.prototype.ajax = {
        url: '',
        //url: 'http://sangerlimsapi.apiary.io',
        //url: 'http://mattdenner.apiary.io',
        send: function (action, actionPath, data, event) {
            $.ajax({
                type: S2.ajax.actionMethods[action],
                url: S2.ajax.url + (actionPath || ''),
                contentType: "json",
                dataType: "json",
                data: data,
                success: function (json) {
                    if (callback) {
                        S2.event.send(event, json);
                        //callback(json);

                    }
                }

            });
        },
        actionMethods: {
            search:'POST',
            first:'post',
            create:'post',
            read:'post',
            last:'post',
            update:'post',
            root:'GET'
        }
    };
    S2Mapper.prototype.search ={
            barcodes: function (barcode){
                S2.ajax.send('search', S2.resources.search.all, {barcode:barcode}, S2.resources.add);
            }
        }



    return S2Mapper;
});
