import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BagProduct } from "@/models";
import { useEffect, useState } from "react";

interface SizeQuantityComponentProps {
  bagItem: BagProduct;
  size: string;
  quantity: number;
  disabled?: boolean;
  className?: string;
  onChange?: (size: string, quantity: number) => void;
}

export const SizeQuantity: React.FC<SizeQuantityComponentProps> = ({
  bagItem,
  size,
  quantity,
  disabled,
  className,
  onChange,
}) => {
  const [quantityValue, setQuantityValue] = useState(quantity);
  const [sizeValue, setSizeValue] = useState(size);

  const handleOnChangeSize = (value: string) => {
    setSizeValue(value);
    onChange?.(value, quantityValue);
  };

  const handleOnChangeQuantity = (value: string) => {
    setQuantityValue(parseInt(value, 10));
    onChange?.(sizeValue, parseInt(value, 10));
  };

  return (
    <form className={className}>
      <div className="w-1/2 flex flex-col justify-center mr-4 md:mr-6">
        <Select
          defaultValue={size}
          value={size}
          onValueChange={handleOnChangeSize}
          disabled={disabled}
        >
          <SelectTrigger className="py-6">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>
          <SelectContent>
            {bagItem?.sizes?.map((size, index) => (
              <SelectItem value={size.value} key={index}>
                <div> {size.value}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        <Select
          defaultValue={`${quantity}`}
          value={`${quantity}`}
          onValueChange={handleOnChangeQuantity}
          disabled={disabled}
        >
          <SelectTrigger className="py-6">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <SelectItem value={(index + 1).toString()} key={index}>
                <div>{index + 1}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
};
