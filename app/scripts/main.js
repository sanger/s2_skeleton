require.config({
  shim: {
  },

  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min',
    d3: '../components/d3/d3.min'
    
  }
});

require(['s2ajax','config'], function(s2ajax, config) {
    //only need to list above variables used below

    s2ajax.send('root','order.json', null, 'initialise');


    $(document).on('initialise', function (){
        //test
        console.log('msg receved');
    })
});