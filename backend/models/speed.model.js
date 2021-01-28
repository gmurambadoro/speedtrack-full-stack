const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const speedSchema = new Schema({
    download: Number,
    upload: Number,
    ping: Number,
    server: {
        url: String,
        lat: String,
        lon: String,
        name: String,
        country: String,
        cc: String,
        sponsor: String,
        id: String,
        host: String,
        d: Number,
        latency: Number,
    },
    timestamp: String,
    bytes_sent: Number,
    bytes_received: Number,
    share: String,
    client: {
        ip: String,
        lat: String,
        lon: String,
        isp: String,
        isprating: String,
        rating: String,
        ispdlavg: String,
        ispulavg: String,
        loggedin: String,
        country: String,
    }
});

speedSchema.plugin(mongoosePaginate);

const Speed = mongoose.model('Speed', speedSchema);

module.exports = Speed;