interface DiscountProps {
  price: number;
  discountedPrice?: number;
  className?: string;
}

export const Price: React.FC<DiscountProps> = ({
  price,
  discountedPrice,
  className,
}) => {
  const hasDiscount = discountedPrice !== price;

  return (
    <p className={className}>
      <span
        className={`${hasDiscount ? "text-gray-500 line-through" : undefined}`}
      >
        {price} €
      </span>{" "}
      {hasDiscount && (
        <span className="text-red-500">{discountedPrice}&nbsp;€</span>
      )}
    </p>
  );
};
