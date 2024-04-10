/* Dependencies */
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

// Helpers
import { getDescribedBy } from "@/helpers";

// Components
import { InputAutoComplete, characterCount } from "../Input/Input";
import { Label } from "../../Shared/Label/Label";
import { CharacterCount } from "../../Shared/CharacterCount/CharacterCount";
import { SupportText } from "../../Shared/SupportText/SupportText";

// Models
type Props = {
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
   * Sets the field label.
   */
  label: string;

  /**
   * Sets the field maximum character limit.
   */
  maxLength?: number;

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
   * Sets the field value.
   */
  value: string;

  /**
   * Form id
   */
  formId: string;
};

/**
 * Input Component
 */
export const TextArea = ({
  autoFocus,
  autoComplete,
  disabled,
  error,
  label,
  maxLength,
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

      <textarea
        id={id}
        name={name}
        onChange={onChange.bind(this)}
        onBlur={onBlur.bind(this)}
        aria-invalid={error ? true : false}
        aria-describedby={describedBy}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        value={value ? value : ""}
        inputMode="text"
        className={classNames(
          "mt-half w-full px-2 py-2 text-base bg-form-background border-2 text-form-foreground rounded-24 min-h-[100px]",
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
