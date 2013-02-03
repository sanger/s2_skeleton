define([], function() {
  var S2Api = function(options){

    var S2Resource = function(json){
      function processActions(actions){
        // Replace the actions node with methods on the main resource object
        for (var action in actions){
          resource[action] = function(data){
            var prototype = Object.create(null);

            prototype.addResource = function(resourceType, resource){
              this.type = resourceType;
              $.extend(this, new S2Resource(resource));
            };

            var childResource = Object.create(prototype);

            actionMethods[action](childResource, json[node][action], data);
            return childResource;
          };
        }
      }

      var resource = Object.create(null);

      for (var node in json){
        if (node === 'actions'){
          processActions(json.actions);
        } else if (json[node] instanceof Array) {
          // process as collection of nested resource
        } else if (json[node] instanceof Object) {
          // This has to be done after the check for Array, which is also an object
        } else { resource[node] = json[node]; }
      }
      return resource;
    };

    var prototype = Object.create(null);
    prototype.addResource = function(resourceType, resource){
      this.type          = 'S2root';
      this[resourceType] = new S2Resource(resource);
    };

    var root = Object.create(prototype);

    var ajaxCall = function(method){
      return function(parent, actionPath, data){
        $.ajax({
          type:         method,
          url:          options.url + (actionPath || ''),
          contentType:  "json",
          dataType:     "json",
          data:         data,
        }).done(function(response){
          for (resourceType in response.valueOf()){
            parent.addResource(resourceType, response.valueOf()[resourceType]);
          }
        });
      }

    };


    var actionMethods = {
      all:     ajaxCall('post'),
      first:   ajaxCall('post'),
      create:  ajaxCall('post'),
      read:    ajaxCall('post'),
      last:    ajaxCall('post'),
      update:  ajaxCall('post'),
      root:    ajaxCall('get')
    }


    actionMethods.root(root)

    return root;
  };
  return S2Api;
});
