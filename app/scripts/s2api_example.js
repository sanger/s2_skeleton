// S2.new -> S2object
var apiRoot = S2.init({ url: 'http://blah.blah' });


var tube1 = apiRoot.
  search().
  first({barcode: '1234567890123'});


var tube2 = apiRoot.tube().create();


tube1.transferTo(tube2);

var trasnferToNew2DTube = OPERATION();

var transfer = trasnferToNew2DTube();

transfer.bind(findTube).bind(create);
