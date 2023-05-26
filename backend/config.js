const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { BD_ADDRESS = 'mongodb://127.0.0.1/mestodb' } = process.env;
const { PORT = 3000 } = process.env;

module.exports = {
  JWT_SECRET,
  BD_ADDRESS,
  PORT,
};
