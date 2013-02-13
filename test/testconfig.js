require.config({
    baseUrl: 'scripts',
    shim: {
    },
    paths: {
        hm: 'vendor/hm',
        esprima: 'vendor/esprima',
        jquery: 'vendor/jquery.min',
        d3: '../components/d3/d3.min'

    }
});

define(['s2ajax'], function(s2ajax) {





describe("App", function() {
    var spy;
    beforeEach(function () {
        console.log('setting up spy')
        spy = spyOn(s2ajax, 'send')//.andCallThrough();
    });
    //s2ajax.send();

    it("is set up", function() {
        expect(typeof s2ajax.send).toEqual('function');
    });


    it("was called", function() {
        expect(spy).toHaveBeenCalled();
        //expect(spy).not.toBeNull();
    });



});

});