const randomstring = require('randomstring');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.ENCRYPTED_KEY, {
  encoding: 'base64',
  pbkdf2Iterations: 10000,
  saltLength: 10,
});
function generateVerificationCode() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  });
}
function encrypt(password) {
  return cryptr.encrypt(password);
}

function decrypt(password) {
  return cryptr.decrypt(password);
}
module.exports = { generateVerificationCode, decrypt, encrypt };
