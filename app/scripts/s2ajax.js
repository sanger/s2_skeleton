define(['s2events'], function (s2event) {

    var actionMethods = {
        search:'POST',
            first:'post',
            create:'post',
            read:'post',
            last:'post',
            update:'post',
            root:'GET'
    }

    var url = '';
    return {

    //url: 'http://sangerlimsapi.apiary.io',
    //url: 'http://mattdenner.apiary.io',
    send: function (action, actionPath, data, event) {
        $.ajax({
            type: actionMethods[action],
            url: url + (actionPath || ''),
            contentType: "json",
            dataType: "json",
            data: data,
            success: function (json) {
                if (event) {
                    s2event.send(event, json);
                }
            }

        });
    }
    };
});