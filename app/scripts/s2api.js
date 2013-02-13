define([], function () {
    var actOn = $(document);
    S2 = function () {
        this.listeners = [];
        this.resources = Object.create(null);
    };
    S2.prototype.new = function () {
        return this.uuid;
    }
    S2.prototype.emit = function (data) {
        //console.log('Event emitted (data below)')
        //console.log(data);
        actOn.trigger('s2event', data);
    };
    S2.prototype.listener = function (event, callback) {
        //console.log('New listener added for "' + event + '"');
        actOn.on('s2event', function (e, data) {
            if (data.event === event) {
                //console.log('Event heard: ' + data.event)// + '", data below');
                //console.log(data)
                callback(data.data);
                //TODO need to clean up listeners?
            }
        });
        s2.listeners.push({event:event, callback:callback});
    }
    s2 = new S2;
    return s2;
})