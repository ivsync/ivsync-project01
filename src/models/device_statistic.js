// Import mongoose
const mongoose = require("mongoose");

// Define DeviceStats Schema
const deviceStatsSchema = new mongoose.Schema(
  {
    battery: { type: Number, required: true, min: 0, max: 100 },
    net_str: { type: String, required: true },
    inf_rate: { type: Number, required: true }, // Represents drops per second
    inf_vol: { type: Number, required: true },
    cur_vol: { type: Number, required: true },
    status: { type: String, required: true },
    dev_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Create and export DeviceStats model
module.exports = mongoose.model("DeviceStats", deviceStatsSchema);
