const randomstring = require('randomstring');

function generateVerificationCode() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  });
}

module.exports = { generateVerificationCode };
