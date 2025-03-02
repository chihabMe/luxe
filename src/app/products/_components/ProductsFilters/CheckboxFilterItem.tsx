import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const CheckboxFilterItem = ({
  count,
  id,
  label,
  onChange,
}: {
  id: string;
  label: string;
  count: number;
  onChange: (mark: string) => void;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={() => {
          onChange(id);
        }}
        id={id}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label} ({count})
      </label>
    </div>
  );
};

export default CheckboxFilterItem;
