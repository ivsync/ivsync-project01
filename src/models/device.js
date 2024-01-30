const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  device_id: { type: String, required: true, unique: true },
  battery: { type: Number, min: 0, max: 100, default: 100 },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Device = mongoose.model("device", deviceSchema);

module.exports = Device;
