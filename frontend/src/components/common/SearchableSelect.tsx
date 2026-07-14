import { useEffect, useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchableSelectProps<T> {
  label?: string;

  placeholder?: string;

  value?: string;

  selectedOption?: T | null;

  options: T[];

  loading?: boolean;

  getOptionLabel: (option: T) => string;

  getOptionValue: (option: T) => string;

  onSearch: (value: string) => void;

  onSelect: (option: T) => void;
}

function SearchableSelect<T>({
  label,
  placeholder = "Search...",
  value,
  selectedOption,
  options,
  loading = false,
  getOptionLabel,
  getOptionValue,
  onSearch,
  onSelect,
}: SearchableSelectProps<T>) {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  console.log("selectedOption:", selectedOption);
  console.log(
    "label:",
    selectedOption ? getOptionLabel(selectedOption) : "EMPTY",
  );

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            <span>
              {selectedOption ? getOptionLabel(selectedOption) : placeholder}
            </span>

            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholder}
              value={search}
              onValueChange={setSearch}
            />

            <CommandList>
              {loading && (
                <div className="p-4 text-sm text-center">Loading...</div>
              )}

              <CommandEmpty>No records found.</CommandEmpty>

              <CommandGroup>
                {options.map((item) => (
                  <CommandItem
                    key={getOptionValue(item)}
                    value={getOptionValue(item)}
                    onSelect={() => {
                      onSelect(item);

                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value === getOptionValue(item)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />

                    {getOptionLabel(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchableSelect;
