window.MONAD = function(modifier) {
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

  // Adds a method to the mondad.  This (the context) will be bound to the monad.
  // The method inputs will be available within the function call and
  // the return is the final return of the call not the monad.
  // So to use this func should know about monads...
  unit.method = function (name, func) {
    prototype[name] = func;
    return unit;
  };

  // Adds a method to the monad with func's inputs bound to the monad.
  // func's return is the final return of the call not the monad.
  unit.lift_value = function (name, func) {
    prototype[name] = function () {
      return this.bind(func, arguments);
    };
    return unit;
  };

  // lift :: (a -> b) -> (monad(a) -> monad(b))
  // func's inputs are bound to the monad.
  // the return value is wrapped in another monad.
  unit.lift = function (name, func) {
    prototype[name] = function () {
      var result = this.bind(func, arguments);
      return result && result.is_monad === true ? result : unit(result);
    };

    return unit;
  };

  return unit;
};

