import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const CheckboxFilterItem = ({
  count,
  checked,
  id,
  label,
  onChange,
}: {
  id: string;
  label: string;
  count: number;
  onChange: (mark: string) => void;
  checked:boolean;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
      checked={checked}
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
