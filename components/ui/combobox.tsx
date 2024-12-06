"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps<T> {
  options: T[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  label?: string
  labelClassName?: string
  getDisplayValue: (option: T) => string
  getValue: (option: T) => string
}

export function Combobox<T>({ 
  options, 
  value, 
  onValueChange,
  placeholder = "Select...",
  label,
  labelClassName = "text-vanilla",
  getDisplayValue,
  getValue
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)

  const displayValue = React.useMemo(() => {
    const selectedOption = options.find(opt => getValue(opt) === value)    
    return selectedOption ? getDisplayValue(selectedOption) : placeholder
  }, [value, options, getDisplayValue, getValue, placeholder])

  return (
    <div className="space-y-2">
      {label && (
        <label className={cn(
          "block text-sm font-medium",
          labelClassName
        )}>
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              "bg-background-dark text-vanilla border-bistre/20",
              "hover:bg-vanilla/10 hover:text-vanilla",
              "focus:ring-1 focus:ring-vanilla/20",
              "transition-colors duration-200",
              "h-9 sm:h-10 px-3 py-2",
              "text-sm sm:text-base"
            )}
          >
            {displayValue}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={cn(
            "w-[--radix-popover-trigger-width] p-0",
            "bg-background-dark border-bistre/20",
            "shadow-lg shadow-black/20"
          )}
          align="start"
        >
          <Command>
            <CommandInput 
              placeholder={`Search ${label?.toLowerCase() || "options"}...`}
              className={cn(
                "text-vanilla",
                "border-b border-bistre/20",
                "placeholder:text-vanilla/50",
                "h-9 sm:h-10",
                "text-sm sm:text-base"
              )}
            />
            <CommandList 
              className={cn(
                "max-h-[300px] overflow-y-auto",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-track]:bg-background-dark",
                "[&::-webkit-scrollbar-thumb]:bg-vanilla/20",
                "[&::-webkit-scrollbar-thumb:hover]:bg-vanilla/30",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "[&::-webkit-scrollbar-track]:rounded-full"
              )}
            >
              <CommandEmpty className="py-6 text-sm text-vanilla/70">
                No {label?.toLowerCase() || "option"} found.
              </CommandEmpty>
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      onValueChange(getValue(option))
                      setOpen(false)
                    }}
                    className={cn(
                      "text-vanilla",
                      "hover:bg-vanilla/10",
                      "aria-selected:bg-vanilla/10",
                      "cursor-pointer",
                      "transition-colors duration-200",
                      "py-2 px-3",
                      "text-sm sm:text-base"
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === getValue(option) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {getDisplayValue(option)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}