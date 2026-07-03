import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Customer } from "@/types/customer";

interface CustomerComboboxProps {
  customers: Customer[];

  loading?: boolean;

  value?: string;

  onSearch: (value: string) => void;

  onChange: (customer: Customer) => void;
}

const CustomerCombobox = ({
  customers,
  loading = false,
  value,
  onSearch,
  onChange,
}: CustomerComboboxProps) => {
  const [open, setOpen] = useState(false);

  const selectedCustomer = customers.find((customer) => customer._id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedCustomer
            ? `${selectedCustomer.name} (${selectedCustomer.phone})`
            : "Search Customer"}

          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[450px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search customer..."
            onValueChange={onSearch}
          />

          <CommandList>
            <CommandEmpty>
              {loading ? "Loading..." : "No customer found."}
            </CommandEmpty>

            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer._id}
                  value={customer._id}
                  onSelect={() => {
                    onChange(customer);

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === customer._id ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <div className="flex flex-col">
                    <span className="font-medium">{customer.name}</span>

                    <span className="text-xs text-muted-foreground">
                      📞 {customer.phone}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerCombobox;
