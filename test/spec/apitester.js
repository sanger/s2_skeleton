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
    });

    it("ajax send has been called", function() {
        expect(spy).toHaveBeenCalled();
    });



});

xdescribe("Ajax", function() {
    it("can search for barcodes", function() {
        expect(S2.search.barcodes('SRC123456')).not.toBeNull();
    });
});