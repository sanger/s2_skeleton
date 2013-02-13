define(['s2api', '_'], function (s2, us) {
   // debugger;
    $('#viewListeners').click(function(){
        console.log(s2.listeners);
    });
    $('#viewResources').click(function(){
        console.log(s2.resources);
    });
    new s2.listener('resourceUpdated', processResource);



    function processResource(resource) {

        $('#content').append(
            '<div id="' + resource.uuid + '" class="span3"><div class="pull-left alert"> ' +
            'Hi, I\'m a ' + resource.resourceType + ' resource. ' +
            'My uuid is ' + resource.rawJson.uuid +
            '<div class="btn span1" onclick="">Create</div></div>'
        );

    }

    return s2;
})
/*window.modules = {
 tube: {
 view: '<div>{{uuid}}</div>',
 controller: function (){
 //S2Mapper.replace();
 }
 },
 search: {
 view: '<input id="barcode" value="SRC123456"/><input id="submit" class="btn" value="search"/>',
 controller: function (){
 console.log(document.getElementById('barcode'));
 $('#submit').on('click',function () {
 S2.search.barcodes($('#barcode').val());
 });
 }
 },

 upload: {
 view: '<input id="dropzone" class="alert hero" value ="Drop CSV here"/>',
 controller: function (){

 $('#dropzone').on({
 dragover: function (){
 $(this).addClass('lead');
 },
 dragout:function (){
 $(this).removeClass('lead');
 },
 drop: function (e) {
 //TODO fine for Chrome, check FF
 e.originalEvent.preventDefault();

 var files = e.originalEvent.dataTransfer.files;
 for (var i = 0; i < files.length; i++) {
 var reader = new FileReader();
 reader.onloadend = function (file){
 var rows = file.currentTarget.result.split('\n');
 rows.forEach(function(row){
 console.log(row);
 });

 };
 // t = reader.readAsText(document.getElementById('dropzone').files[0]);
 //console.log(t);
 t = reader.readAsText(files[i]);
 }
 return false;
 }
 });
 //$(document).trigger('drop');
 }
 }
 };



 runModule = function (module) {
 var m = modules[module];
 $('#content').append(m.view);
 m.controller();
 };
 runModule('upload');
 */