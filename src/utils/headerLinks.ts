export const headerLinks = [
  { name: "Women", href: "/shopping/women", key: "women" },
  { name: "Men", href: "/shopping/men", key: "men" },
  { name: "Unisex", href: "/shopping/unisex", key: "unisex" },
  { name: "Clothing", href: "/shopping/clothing", key: "clothing" },
  { name: "Shoes", href: "/shopping/shoes", key: "shoes" },
];

export const getHeaderLink = (key: string) => {
  return headerLinks.find((link) => link.key === key);
};
