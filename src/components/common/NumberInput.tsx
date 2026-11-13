import { useRef, useState, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";

type NumberInputProps = Omit<ComponentProps<typeof Input>, "type">;

const isZero = (value: unknown) => value !== "" && value != null && Number(value) === 0;

/**
 * Number field that clears an initial 0 on focus so typing doesn't produce "05", and restores
 * the 0 if the field is left empty. The saved value never changes just by focusing.
 */
export function NumberInput({ value, defaultValue, onFocus, onChange, onBlur, readOnly, ...props }: NumberInputProps) {
  const [hideZero, setHideZero] = useState(false);
  const originalZero = useRef<string | null>(null);
  const controlled = value !== undefined;

  return (
    <Input
      {...props}
      type="number"
      readOnly={readOnly}
      {...(controlled ? { value: hideZero && isZero(value) ? "" : value } : { defaultValue })}
      onFocus={(event) => {
        if (!readOnly && isZero(event.currentTarget.value)) {
          if (controlled) {
            setHideZero(true);
          } else {
            originalZero.current = event.currentTarget.value;
            event.currentTarget.value = "";
          }
        }
        onFocus?.(event);
      }}
      onChange={(event) => {
        originalZero.current = null;
        setHideZero(event.currentTarget.value === "");
        onChange?.(event);
      }}
      onBlur={(event) => {
        if (!controlled && originalZero.current !== null && event.currentTarget.value === "") {
          event.currentTarget.value = originalZero.current;
        }
        originalZero.current = null;
        setHideZero(false);
        onBlur?.(event);
      }}
    />
  );
}
