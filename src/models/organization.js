const { Schema, model } = require('mongoose');

const OrganizationModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    images: [{
      type: String,
    }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

OrganizationModelSchema.index({ name: 1 });

module.exports = model('organization', OrganizationModelSchema);
