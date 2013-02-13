<<<<<<< Updated upstream
describe("S2Api", function() {
    var send;
    beforeEach(function () {
        spy = spyOn(S2.ajax, 'send').andCallThrough();
    });

    it("has initialised correctly", function() {
        expect(typeof S2).toEqual('object');
    });

    it("ajax.send is set up", function() {
        expect(typeof S2.ajax.send).not.toBeNull();
=======
require.config({
//   baseUrl: 'scripts'
});

require(['s2ajax'],function(s2ajax){
    //console.log(config)
    xdescribe("s2ajax", function() {
            var sendSpy,result;


            beforeEach(function () {

                sendSpy = spyOn(s2ajax, 'send').andCallFake(function (){
                    return ({abc:123});
                });
                result = s2ajax.send('root','orders.js');
            });





        it("is a function", function() {
            expect(typeof sendSpy).toEqual('function');

        });
        it("has been called", function() {
            expect(sendSpy).toHaveBeenCalled();
        });
        it("has returned a fake value", function() {
            expect(result.abc).toEqual(123);
        });


>>>>>>> Stashed changes
    });

    it("ajax send has been called", function() {
        expect(spy).toHaveBeenCalled();
    });



});

<<<<<<< Updated upstream
xdescribe("Ajax", function() {
    it("can search for barcodes", function() {
        expect(S2.search.barcodes('SRC123456')).not.toBeNull();
=======
require(['s2events'],function(s2event){
    //console.log(config)
    describe("s2events", function() {
        var eventSpy,result;


        beforeEach(function () {

            eventSpy = spyOn(s2event,'emit');
        });





        it("is a function", function() {
            expect(typeof sendSpy).toEqual('function');

        });
       /* it("has been called", function() {
            expect(sendSpy).toHaveBeenCalled();
        });
        it("has returned a fake value", function() {
            expect(result.abc).toEqual(123);
        });
*/

>>>>>>> Stashed changes
    });
});