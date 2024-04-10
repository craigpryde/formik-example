/* Dependencies */
import { useEffect, useState, ChangeEvent, useMemo } from "react";
import classNames from "classnames";

// Components
import { Label } from "../../Shared/Label/Label";
import { SupportText } from "../../Shared/SupportText/SupportText";
import { CharacterCount } from "../../Shared/CharacterCount/CharacterCount";

// Helpers
import { getDescribedBy } from "@/helpers";

// Models
export type InputType =
  | "text"
  | "email"
  | "number"
  | "tel"
  | "search"
  | "password"
  | "url";

export type InputMode =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url";

export type InputAutoComplete =
  | "on"
  | "name"
  | "honorific-prefix"
  | "honorific-suffix"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "nickname"
  | "email"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "organization"
  | "organization-title"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level1"
  | "address-level2"
  | "address-level3"
  | "address-level4"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "transaction-currency"
  | "transaction-amount"
  | "language"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-area-code"
  | "tel-local"
  | "tel-extension"
  | "impp"
  | "url"
  | "photo";

export type Props = {
  /**
   * Toggles auto focus on the field at load.
   */
  autoFocus?: boolean;

  /**
   * Sets the auto complete setting on the field.
   */
  autoComplete?: InputAutoComplete;

  /**
   * Disables the field.
   */
  disabled?: boolean;

  /**
   * Sets the error state on the field.
   */
  error?: string;

  /**
   * Sets the input mode for the field.
   */
  inputMode: InputMode;

  /**
   * Sets the field label.
   */
  label: string;

  /**
   * Sets the maximum number value allowed for the field.
   */
  max?: number;

  /**
   * Sets the field maximum character limit.
   */
  maxLength?: number;

  /**
   * Sets the minimum number value allowed for the field.
   */
  min?: number;

  /**
   * Sets the field minimum character limit.
   */
  minLength?: number;

  /**
   * Sets the field name.
   */
  name: string;

  /**
   * Field on change event handler.
   */
  onChange: Function;

  /**
   * Field on blur event handler.
   */
  onBlur: Function;

  /**
   * Sets the field placeholder.
   */
  placeholder?: string;

  /**
   * Sets the field as readonly.
   */
  readOnly?: boolean;

  /**
   * Sets the field as required.
   */
  required?: boolean;

  /**
   * Shows and emits character counts on the field.
   */
  showCharCount?: boolean;

  /**
   * Sets the support text on the field.
   */
  supportText?: string;

  /**
   * Sets the tooltip content for the field.
   */
  toolTip?: string;

  /**
   * Sets the type of input for the field.
   */
  type: InputType;

  /**
   * Sets the field value.
   */
  value: string | number;

  /**
   * Form id
   */
  formId: string;
};

// Functions
/**
 * References input event and default value to return char count.
 * @param event - The input event if available.
 * @param defaultValue - The default component value.
 */
export const characterCount = (
  defaultValue: string,
  event?: ChangeEvent<HTMLInputElement>
): number => {
  return !event ? defaultValue.length : event.target["value"].length;
};

/**
 * Input Component
 */
export const Input = ({
  autoFocus,
  autoComplete,
  disabled,
  error,
  inputMode,
  label,
  max,
  maxLength,
  min,
  minLength,
  name,
  onChange,
  onBlur,
  placeholder,
  readOnly,
  required,
  showCharCount,
  supportText,
  toolTip,
  type,
  value,
  formId,
}: Props) => {
  // Set The Initial State
  const [charCount, setCharCount] = useState(0);
  const [describedBy, setDescribedBy] = useState<string | undefined>(undefined);

  // Generate a unique ID for the input.
  const id = useMemo(() => {
    return `${formId}-${name}`;
  }, [formId, name]);

  // Set The Initial ID
  useEffect(() => {
    if (showCharCount) {
      setCharCount(characterCount(value as string, undefined));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Set the Tool tip on ID Change
  useEffect(() => {
    setDescribedBy(getDescribedBy({ error, id, name, supportText, toolTip }));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Sets the character count
   */
  useEffect(() => {
    if (showCharCount) {
      setCharCount(characterCount(value as string));
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  // Render the component.
  return (
    <div className="w-full">
      <Label id={id} label={label} required={required} name={name} />
      <input
        id={id}
        type={type}
        name={name}
        onChange={onChange.bind(this)}
        onBlur={onBlur.bind(this)}
        aria-invalid={error ? true : false}
        aria-describedby={describedBy}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
        required={required}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        value={value || value === 0 ? value : ""}
        inputMode={inputMode ? inputMode : "text"}
        className={classNames(
          "mt-half w-full px-2 py-half text-base bg-form-background border-2 text-form-foreground rounded-24",
          {
            "border-error": error,
            "border-form-border": !error,
            "cursor-not-allowed opacity-75": disabled,
          }
        )}
      />
      {showCharCount && maxLength && (
        <CharacterCount charCount={charCount} maxLength={maxLength} />
      )}

      <SupportText
        supportText={supportText}
        id={id}
        name={name}
        error={error}
      />
    </div>
  );
};
