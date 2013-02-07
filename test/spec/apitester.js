describe("S2Api", function() {
    it("has initialised correctly", function() {
        expect(typeof S2).toEqual('object');
    });

    it("has some resources", function() {
        expect(typeof S2.resources).not.toBeNull();
    });
});

describe("Ajax", function() {
    it("can search for barcodes", function() {
        expect(S2.search.barcodes('SRC123456')).not.toBeNull();
    });


});