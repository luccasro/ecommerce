import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface ColumnsSelectorProps {
  onChangeColumn?: (column: number) => void;
}

export const ColumnsSelector = ({ onChangeColumn }: ColumnsSelectorProps) => {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const savedColumn = localStorage.getItem("columns");
    if (savedColumn) {
      const newColumn = parseInt(savedColumn);
      setColumns(newColumn);
      onChangeColumn?.(newColumn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeColumns = (column: number) => {
    localStorage.setItem("columns", column.toString());
    setColumns(column);
    onChangeColumn?.(column);
  };

  return (
    <p className="hidden lg:block text-sm mr-4">
      <span className="text-muted-foreground">VIEW:</span>{" "}
      <span
        className={cn(
          "text-muted-foreground",
          columns === 3 && "text-foreground"
        )}
      >
        <Button
          variant="ghost"
          onClick={() => changeColumns(3)}
          className="p-0 hover:bg-transparent"
        >
          3
        </Button>
      </span>{" "}
      <span className="text-foreground">|</span>{" "}
      <span
        className={cn(
          "text-muted-foreground",
          columns === 4 && "text-foreground"
        )}
      >
        <Button
          variant="ghost"
          onClick={() => changeColumns(4)}
          className="p-0 hover:bg-transparent"
        >
          4
        </Button>
      </span>
    </p>
  );
};
