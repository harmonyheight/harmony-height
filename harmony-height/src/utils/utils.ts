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
