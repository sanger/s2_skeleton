define([],function () {
    var actOn = $(document);

    return  {

        send: function (event,data) {
            actOn.trigger(event,data)
            //S2.ajax.send('root', 'order.json', null, 'gotResources');
        },
        listeners: {
            //initialise: {x,y,z}
        }
    }
});