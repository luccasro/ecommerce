interface DiscountProps {
  price: number;
  discountedPrice?: number;
}

export const Price: React.FC<DiscountProps> = ({ price, discountedPrice }) => {
  const hasDiscount = discountedPrice !== price;

  return (
    <>
      <span
        className={`${hasDiscount ? "text-gray-500 line-through" : undefined}`}
      >
        {price} €
      </span>{" "}
      {hasDiscount && <span className="text-red-500">{discountedPrice} €</span>}
    </>
  );
};
