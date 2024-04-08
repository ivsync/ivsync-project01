const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const AuthModelSchema = new Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  password: {
    type: String,
    default: null,
  },
  old_passwords: [
    {
      type: String,
      default: [],
    },
  ],
  email_verification: {
    token: {
      type: String,
      default: null,
    },
    expires: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  reset_password: {
    token: {
      type: String,
      default: null,
    },
    expires: {
      type: Number,
      default: 0,
    },
    code: {
      type: String,
    },
  },
  is_suspended: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  temp_token: {
    type: String,
  },
  role: {
    type: String,
    default: 'STAFF',
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

AuthModelSchema.index({ user: 1 });

// eslint-disable-next-line func-names
AuthModelSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, parseInt(SALT_ROUNDS, 10));
  return next();
});

module.exports = model('auth', AuthModelSchema);
