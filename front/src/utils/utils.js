export const calculettePromotions = (cart, subTotal) => {
  let total = 0;
  let temp = subTotal;

  cart.promotionalCodeItems.forEach((code) => {
    if (code.isPercent) {
      let amountWithPromotion = temp - total;
      let percent = code.promotion / 100;
      total += amountWithPromotion * percent;
    } else {
      total += code.promotion;
    }
  });

  return total;
};

export const formatPrice = (price) => {
  return price.toFixed(2).toString().replace('.', ',') + '€';
};

export const formatDate = (date, locale = 'en-GB') => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date object');
  }
  return new Intl.DateTimeFormat(locale).format(date);
};
