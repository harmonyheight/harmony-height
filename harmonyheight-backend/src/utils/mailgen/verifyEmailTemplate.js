// emailGenerator.js
const Mailgen = require('mailgen');

// Create a Mailgen instance
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Harmony Height',
    link: 'https://youtube.com',
  },
});

// Function to generate the email HTML
const generateVerificationCodeEmail = (code, name) => {
  const email = {
    body: {
      name: name,
      intro:
        'Welcome to Harmony Height! Please verify your email address by entering the following code:',
      table: {
        data: [
          {
            key: 'Verification Code:',
            value: code,
          },
        ],
      },
      outro:
        'If you did not sign up for Harmony Height, you will not access some features.',
    },
  };

  return mailGenerator.generate(email);
};

module.exports = { generateVerificationCodeEmail };
