define([], function() {
  var S2Api = function(options){

    var S2Resource = function(json){
      var resource = Object.create(null);

      for (var node in json){
        if (node === 'actions'){

          // Replace the actions node with methods on the main resource object
          for (var action in json.actions){
            resource[action] = function(data){
              var childResource = Object.create(null);

              childResource.addResource = function(resourceType, resource){
                this.type = resourceType;
                $.extend(this, new S2Resource(resource));
              };

              actionMethods[action](childResource, json[node][action], data);
              return childResource;
            };
          }

        } else { resource[node] = json[node]; }
      }
      return resource;
    };

    var root = Object.create(null);
    root.addResource = function(resourceType, resource){
      this.type          = 'S2root';
      this[resourceType] = new S2Resource(resource);
    };

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

  return new S2Api({
    url: "http://mattdenner.apiary.io"
  });
});
