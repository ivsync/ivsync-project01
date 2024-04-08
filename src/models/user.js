/* eslint-disable func-names */
/* eslint-disable camelcase */
const { Schema, model } = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(require('mongoose'));

const {
  DEFAULT_PROFILE_IMG, USER_ROLES, USER_STATUS, GENDER,
} = require('../utils/constants');

const userSchema = new Schema({
  user_id: {
    type: Number,
  },
  first_name: {
    type: String,
    maxlength: 60,
    trim: true,
  },
  last_name: {
    type: String,
    maxlength: 60,
    trim: true,
  },
  email: {
    type: String,
    maxlength: 60,
    trim: true,
    lowercase: true,
  },
  profile_img: {
    type: String,
    maxlength: 200,
    default: DEFAULT_PROFILE_IMG,
  },
  gender: {
    type: String,
    enum: GENDER,
  },
  role: {
    type: String,
    enum: USER_ROLES,
    default: 'STAFF',
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'ACTIVE',
    enum: USER_STATUS,
  },
  is_onboarded: {
    type: Boolean,
    default: false,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
  },
  bio: {
    type: String,
    maxlength: 2000,
  },
  department: {
    type: String,
    maxlength: 100,
  },
  designation: {
    type: String,
    maxlength: 100,
  },
  address_book: [{
    label: {
      type: String, // TO save things like "Home Address", "Office Address"
    },
    state: {
      type: String,
    },
    building_number: {
      type: Number,
    },
    flat: {
      type: String,
    },
    floor: {
      type: String,
    },
    direction: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    country: {
      type: String,
      default: 'NG',
    },
    is_default: {
      type: Boolean,
      default: false,
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true, getters: true } });

userSchema.index({ phone_number: 1, email: 1 });
userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: 'user_id' });
// userSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

userSchema.virtual('full_name')
  .get(function () { return `${this.first_name} ${this.last_name}`; })
  .set(function (v) {
    // `v` is the value being set, so use the value to set
    // `first_name` and `last_name`.
    const first_name = v.substring(0, v.indexOf(' '));
    const last_name = v.substring(v.indexOf(' ') + 1);
    this.set({ first_name, last_name });
  });
const userModel = model('user', userSchema);

module.exports = userModel;
