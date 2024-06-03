import React, { useCallback, useEffect, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/utils/cn";

interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  className?: string;
  min: number;
  max: number;
  step?: number;
  formatLabel?: (value: number) => string;
  onValueChange?: (value: number[] | number) => void;
  resetValues?: () => void;
}

const Slider = React.forwardRef(
  (
    {
      className,
      min,
      max,
      step,
      formatLabel,
      value,
      onValueChange,
      ...props
    }: SliderProps,
    ref
  ) => {
    const defaultRange = [min, max];
    const initialValue = Array.isArray(value) ? value : defaultRange;
    const [localValues, setLocalValues] = useState(initialValue);

    const handleValueChange = (newValues: any) => {
      setLocalValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    useEffect(() => {
      if (value?.toString() === defaultRange.toString()) {
        setLocalValues(defaultRange);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, min, max]);

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {localValues.map((value, index) => (
          <React.Fragment key={index}>
            <div
              className="absolute text-center"
              style={{
                left: `calc(${((value - min) / (max - min)) * 93}% + 0px)`,
                top: `10px`,
              }}
            >
              <span className="text-xs whitespace-nowrap">
                {formatLabel ? formatLabel(value) : value}
              </span>
            </div>
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
