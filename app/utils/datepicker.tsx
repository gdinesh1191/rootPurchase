 // app/utils/commonDatepicker.tsx
"use client";

import * as React from "react";
import { CalendarIcon, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

// --- Utility Functions (These remain the same) ---

/**
 * Formats a Date object to "DD/MM/YYYY" string.
 * @param date The date to format.
 * @returns Formatted date string or empty string if date is undefined.
 */
export function formatDate(date: Date | undefined): string {
  if (!date) return "";
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

/**
 * Checks if a value is a valid Date object.
 * @param date The value to check.
 * @returns True if it's a valid Date object, false otherwise.
 */
function isValidDate(date: Date | undefined): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Parses a "DD/MM/YYYY" string into a Date object.
 * @param dateString The date string to parse.
 * @returns A Date object or undefined if parsing fails.
 */
const parseDateString = (dateString: string): Date | undefined => {
  if (!dateString) return undefined;
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year) &&
        day >= 1 && day <= 31 &&
        month >= 0 && month <= 11 &&
        year >= 1000 && year <= 9999) {
      const parsed = new Date(year, month, day);
      if (parsed.getFullYear() === year &&
          parsed.getMonth() === month &&
          parsed.getDate() === day) {
        parsed.setHours(0, 0, 0, 0);
        return parsed;
      }
    }
  }
  return undefined;
};

/**
 * Compares two dates (year, month, day) for equality.
 * @param date1 First date.
 * @param date2 Second date.
 * @returns True if dates are identical (or both undefined), false otherwise.
 */
const areDatesEqual = (date1: Date | undefined, date2: Date | undefined): boolean => {
  if (!date1 && !date2) return true;
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// --- Component Props (These remain the same) ---

interface DatePickerProps {
  className?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  "data-validate"?: string;
  id: string;

  selected: Date | undefined;
  onChange: (date: Date | undefined) => void; // Note: type here could change to Date if it's always a date

  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
}

// --- DatePicker Component ---

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  placeholder = "Select date",
  name,
  required = false,
  "data-validate": dataValidate,
  id,
  selected,
  onChange,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
}) => {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Initialize selected date to 'today' if it's undefined
  // This is the core change to ensure a date is always present internally
  const initialInternalDate = selected || today;

  const [inputValue, setInputValue] = React.useState(formatDate(initialInternalDate));
  const [open, setOpen] = React.useState(false);
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(initialInternalDate);

  // Effect to synchronize internal state with the 'selected' prop
  // Crucial: now it ensures that if 'selected' from parent is undefined, it defaults to 'today'
  React.useEffect(() => {
    const effectiveSelected = selected || today; // If parent says undefined, default to today
    const formattedEffectiveSelected = formatDate(effectiveSelected);

    if (inputValue !== formattedEffectiveSelected) {
      setInputValue(formattedEffectiveSelected);
    }

    if (!areDatesEqual(calendarMonth, effectiveSelected)) {
      setCalendarMonth(effectiveSelected);
    }
  }, [selected, today, inputValue, calendarMonth]); // Add inputValue and calendarMonth to dependencies for full sync

  // Also, a one-time call to onChange if selected is initially undefined
  // This ensures the parent state also reflects `today` if it starts undefined.
  React.useEffect(() => {
      if (selected === undefined) {
          onChange(today);
      }
  }, [selected, onChange, today]);


  /**
   * Handles changes to the text input field.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const parsedDate = parseDateString(value);

    if (isValidDate(parsedDate)) {
      const isDateAllowed =
        (!minDate || (parsedDate && parsedDate >= minDate)) &&
        (!maxDate || (parsedDate && parsedDate <= maxDate)) &&
        (!disableFuture || (parsedDate && parsedDate <= today)) &&
        (!disablePast || (parsedDate && parsedDate >= today));

      if (isDateAllowed) {
        // Only update if different from current selected (which might be `today` by default)
        if (!areDatesEqual(parsedDate, selected)) {
            onChange(parsedDate);
        }
      } else {
        // If out of range, set to today's date if it's allowed, otherwise just prevent update
        // We ensure a date is always selected
        if (selected !== today && (!minDate || today >= minDate) && (!maxDate || today <= maxDate) && (!disableFuture || today <= today) && (!disablePast || today >= today)) {
             onChange(today);
        }
      }
    } else if (!value) { // If input is cleared
      // If the input becomes empty, revert to today's date
      if (selected !== today) {
          onChange(today);
      }
    }
    // If value is present but invalid, no change to selected
  };

  /**
   * Handles date selection from the calendar popover.
   */
  const handleCalendarSelect = (date: Date | undefined) => {
    // If date is undefined (e.g., from clicking outside or unselecting)
    // default to `today` as per requirement.
    const newSelectedDate = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : today;

    // Only call onChange if the new date is different from the current selected date
    if (!areDatesEqual(newSelectedDate, selected)) {
        onChange(newSelectedDate);
    }
    setOpen(false); // Close the popover
  };

  /**
   * Handles final processing after input loses focus.
   */
  const handleInputBlur = () => {
    const parsedDate = parseDateString(inputValue);

    // Determine the effective date to set
    let dateToSet = parsedDate;
    if (!isValidDate(parsedDate)) { // If input is not a valid date, or empty
        dateToSet = today; // Default to today
    }

    // Apply date restrictions to dateToSet
    const isDateAllowed =
      (!minDate || (dateToSet && dateToSet >= minDate)) &&
      (!maxDate || (dateToSet && dateToSet <= maxDate)) &&
      (!disableFuture || (dateToSet && dateToSet <= today)) &&
      (!disablePast || (dateToSet && dateToSet >= today));

    if (!isDateAllowed) {
        dateToSet = today; // If chosen date is not allowed, default to today
    }

    // Only update parent's state if the date is actually different
    if (!areDatesEqual(dateToSet, selected)) {
      onChange(dateToSet);
    }

    // Ensure inputValue matches the final selected date after blur
    setInputValue(formatDate(dateToSet));
  };


  /**
   * Handles keyboard navigation for opening the calendar.
   */
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  /**
   * Handles clearing the selected date. Now clears to `today`.
   */
  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent popover from opening/closing
    // Instead of `onChange(undefined)`, we now call `onChange(today)`
    if (!areDatesEqual(today, selected)) {
        onChange(today);
    }
    // inputValue will be updated by the useEffect sync
  };

  return (
    <div className={cn("relative", className)}>
      {/* Hidden input for form submission, ensures the form gets the value */}
      <input
        type="hidden"
        name={name}
        // Always use the 'selected' prop for the hidden input, defaulting to today if selected is undefined
        value={formatDate(selected || today)}
        required={required}
        data-validate={dataValidate}
      />

      <div className="relative flex items-center">
        <Input
          id={id}
          value={inputValue}
          placeholder={placeholder}
          className="pr-10"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autoComplete="off"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={`popover-content-${id}`}
          readOnly={false}
        />

       
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 h-full w-auto p-2"
              aria-label="Open date picker"
                 >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={`popover-content-${id}`}
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <Calendar
              mode="single"
               selected={selected || today}
              captionLayout="dropdown"
               month={calendarMonth}
              onMonthChange={setCalendarMonth}
              onSelect={handleCalendarSelect}
              initialFocus
              disabled={(dateToCheck) => {
                const normalizedDateToCheck = new Date(
                  dateToCheck.getFullYear(),
                  dateToCheck.getMonth(),
                  dateToCheck.getDate()
                );
                const normalizedMinDate = minDate ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : undefined;
                const normalizedMaxDate = maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()) : undefined;

                if (disableFuture && normalizedDateToCheck > today) return true;
                if (disablePast && normalizedDateToCheck < today) return true;
                if (normalizedMinDate && normalizedDateToCheck < normalizedMinDate) return true;
                if (normalizedMaxDate && normalizedDateToCheck > normalizedMaxDate) return true;
                return false;
              }}
            />
          </PopoverContent>
        </Popover>

        
      </div>
    </div>
  );
};

export default DatePicker;