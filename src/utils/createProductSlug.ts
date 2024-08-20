//Format must be like: "Tshirts/ADIDAS/ADIDAS-Mens-Red-Stripe-T-shirt/2601/buy"

export const createProductSlug = (str: string) => {
  const parts = str.split("/");

  const relevantParts = parts[2] + "-" + parts[3];

  const result = relevantParts.toLowerCase().replace(/-+/g, "-");

  return result;
};
