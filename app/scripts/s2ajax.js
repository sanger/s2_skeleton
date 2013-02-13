define(['config', 's2resource', 's2api'], function (config, s2resource, s2) {
    "use strict";
    var s2ajax = {
        send:function (action, actionPath, data, callback) {
            $.ajax({
                type:       config.actionMethods[action],
                url:        config.apiUrl + (actionPath || ''),
                contentType:"json",
                dataType:   "json",
                data:       data,
                success:    function (json) {

                    s2.emit({
                        event:   'gotJson',
                        callback:callback,
                        data:    json
                    });
                }
            });
        },
        search:  {
            /*
             barcodes: function (barcode){

             s2ajax.ajaxSend('search', S2.resources.search.all, {barcode: barcode}, S2.resources.add);
             }
             */
        },
        parseJson:function (json) {
            //console.log(json);
            for (var key in json) {
                var node = json[key];

                if (node.uuid) {//if this is actually a resource
                    new s2resource[key](node);

                }


            }
        }
    };
    return s2ajax;
});