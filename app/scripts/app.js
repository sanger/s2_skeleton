define([], function() {
  var MONAD = function(modifier) {
    'use strict';

    var prototype = Object.create(null);
    prototype.is_monad = true;


    // unit :: bare value -> monad(value)
    function unit(value) {
      var monad = Object.create(prototype);

      // bind :: (a -> monad(b)) -> (monad(a) -> monad(b))
      monad.bind = function (func, args) {
        return func.apply(
          undefined,
          [value].concat(Array.prototype.slice.apply(args || []))
        );
      };


      if (typeof modifier === 'function') {
        value = modifier(monad, value);
      }

      return monad;
    }

    unit.method = function (name, func) {
      prototype[name] = func;
      return unit;
    };

    // unit :: (a -> b) -> (a -> monad(b))
    unit.lift_value = function (name, func) {
      prototype[name] = function () {
        return this.bind(func, arguments);
      };
      return unit;
    };

    unit.lift = function (name, func) {
      prototype[name] = function () {
        var result = this.bind(func, arguments);
        return result && result.is_monad === true ? result : unit(result);
      };

      return unit;
    };

    return unit;
  };


  var S2Element = MONAD(function(monad, resource){
    monad.resources = {};

    var ajaxCalls = {
      post: function(actionPath){
        return function(){
          return $.ajax({
            type:        "POST",
            // url:         S2.path + actionPath,
            url:         "http://mattdenner.apiary.io/" + actionPath,
            contentType: "json",
            dataType:    "json",
          }).done(function(response){
            console.debug('done');
            monad.resources[resource] = S2Element(response.valueOf());
          });
        };
      },

      get: function(actionPath){
        return function(){
          return $.ajax({
            type:        "POST",
            // url:         S2.path + actionPath,
            url:         "http://mattdenner.apiary.io/" + actionPath,
            contentType: "json",
            dataType:    "json",
          }).done(function(response){
            console.debug('done');
            monad.resources[resource] = S2Element(response.valueOf());
          });
        };
      }

    };

    var actionMethods = {
      all: ajaxCalls.get,
      first: ajaxCalls.post,
      create: ajaxCalls.post,
      read: ajaxCalls.post,
      last: ajaxCalls.post,
      update: ajaxCalls.post

    };

    for (action in resource.actions){
      monad[action] = actionMethods[action](resource.actions[action]);
    }

  });


  window.S2Root = function(options){

    var S2       = Object.create(null);
    S2.path      = options.url;
    var resources = {};

    var search = function(elementName) {
      if (elementName === undefined) return Object.keys(resources);
      return resources[elementName];
    };

    var loadResources = function(response){
      console.debug('Loading API root:-');
      for (resource in response.valueOf()) {
        resources[resource] = S2Element(response.valueOf()[resource]);
        console.debug('\t...adding '+resource);
      }
    };

    var launchDebugger = function(response){
      console.debug('Failed to load API root');
      debugger;
    };

    $.ajax({
      type:        "GET",
      url:         S2.path,
      contentType: "json",
      dataType:    "json"
    }).done(loadResources).
      fail(launchDebugger);


    return search;
  };

  window.S2 = new S2Root({
    url: "http://mattdenner.apiary.io/"
  });


  return 'Hello from S2';
});
