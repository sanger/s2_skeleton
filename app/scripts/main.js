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

require(['mapper'], function(mapper) {
    var S2 = {};
    new mapper(S2);

    //dataMap = mapper(S2)
});