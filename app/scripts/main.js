require.config({

    shim: {
    },
    paths:{
        hm:     'vendor/hm',
        esprima:'vendor/esprima',
        jquery: 'vendor/jquery.min',
        d3:     '../components/d3/d3.min',
        _:      'vendor/underscore'

    }
});
require(['s2ajax','app','s2resource'], function (s2ajax,app,s2resource) {
    //this runs last
    s2.listener('gotJson', s2ajax.parseJson);
    s2ajax.send('root', 'tube.json', null, null);
    return {};
});