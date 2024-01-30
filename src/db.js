const mongoose = require('mongoose');

let pool;
const moongoseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let logger = {
  info: console.log,
  error: console.error,
};

const connect = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
      moongoseConfig,
    );
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
