require.config({
  shim: {
  },

  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min'
  }
});

require(['api'], function(api) {
  // use app here
  window.S2 = new api({
    url: "http://mattdenner.apiary.io"
  });
});
