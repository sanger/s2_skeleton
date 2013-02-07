require.config({
  shim: {
  },

  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min'
    
  }
});

require(['api','app'], function(api,app) {
  // use app here
  window.S2 = new api({
    //url: "http://mattdenner.apiary.io"
  });
  console.log(S2);
  S2.ajax.send('root', 'order.json', null, S2.resources.add);
});