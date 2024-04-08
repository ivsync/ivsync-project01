const { Schema, model } = require('mongoose');

const SettingsModelSchema = new Schema({
  email_communication: {
    type: Boolean,
    default: true,
  },
  sms_communication: {
    type: Boolean,
    default: true,
  },
  phone_communication: {
    type: Boolean,
    default: true,
  },
  promotion_offers: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

});

module.exports = model('setting', SettingsModelSchema);
