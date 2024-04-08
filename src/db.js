const mongoose = require('mongoose');
const { logger } = require('../config');

let pool;

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    pool = connection;
    logger.info('DATABASE connected successfully!');
  } catch (error) {
    logger.error('DATABASE connection failed! Exiting Now');
    logger.error(error);
    process.emit('SIGTERM');
    process.exit(1);
  }
  return true;
};

// process.on('SIGTERM', () => {
//   if (pool) {
//     logger.info('Releasing MongoDb pool.');
//     pool.disconnect();
//   }
// });
const getPool = () => pool;

module.exports = { connect, getPool };
