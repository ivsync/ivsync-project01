const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  dev_id: { type: String, required: true, unique: true },
  battery: { type: Number, required: true, min: 0, max: 100 },
  net_str: { type: String, required: true },
  inf_rate: { type: Number, required: true }, // Represents drops per second
  inf_vol: { type: Number, required: true },
  cur_vol: { type: Number, required: true },
  date_time: { type: Date, required: true },
  status: { type: String, required: true },
});

const Device = mongoose.models.Device || mongoose.model("Device", deviceSchema);

module.exports = Device;
