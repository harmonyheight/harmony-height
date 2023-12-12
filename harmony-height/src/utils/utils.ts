import Cryptr from 'cryptr';
const cryptr = new Cryptr('super-secret-key', {
  encoding: 'base64',
  pbkdf2Iterations: 10000,
  saltLength: 10,
});
export const sellCountListing = (countListingByMonth: any[]) => {
  var count = countListingByMonth.reduce((accumaltor, x) => {
    return accumaltor + x.forSale;
  }, 0);
  return count;
};

export const rentCountListing = (countListingByMonth: any[]) => {
  var count = countListingByMonth.reduce((accumaltor, x) => {
    return accumaltor + x.forRent;
  }, 0);
  return count;
};

export function encrypt(password: string) {
  return cryptr.encrypt(password);
}

export function decrypt(password: string) {
  return cryptr.decrypt(password);
}

export function formatNumberWithCommas(number: any) {
  return number.toLocaleString('en-US', { style: 'decimal' });
}
