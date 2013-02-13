
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



    });

    it("ajax send has been called", function() {
        expect(spy).toHaveBeenCalled();
    });



});


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


    });
});