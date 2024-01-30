const { Schema, model } = require('mongoose');
/* eslint-disable func-names */
/* eslint-disable camelcase */
const deviceStatsSchema = new Schema({
    battery: { type: Number, required: true, min: 0, max: 100 },
    net_str: { type: String, required: true },
    inf_rate: { type: Number, required: true }, // Represents drops per second
    inf_vol: { type: Number, required: true },
    cur_vol: { type: Number, required: true },
    status: { type: String, required: true },
    dev_id: { type: Schema.Types.ObjectId, ref: "devices", required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const DeviceStats = model("device_stats", deviceStatsSchema);

module.exports = DeviceStats