/* Dependencies */
import { ReactNode } from "react";
import classNames from "classnames";

// Models
type Props = {
  /**
   * Sets the field label.
   */
  label: string | ReactNode;
  /**
   * Sets the field as required.
   */
  required?: boolean;
  /**
   * Sets the tooltip content for the field.
   */
  toolTip?: string;
  /**
   * Id to use.
   */
  id: string;
  /**
   * Name of field
   */
  name: string;
  /**
   * Hidden
   */
  hidden?: boolean;
  /**
   * Class name
   */
  className?: string;
  /**
   * Cursor pointer
   */
  cursorPointer?: boolean;
};

/**
 * Label
 * @param props - Required component props
 * @returns
 */
export const Label = ({
  label,
  required,
  toolTip,
  id,
  name,
  hidden,
  className,
  cursorPointer,
}: Props) => {
  return (
    <div
      className={classNames(
        {
          "sr-only": hidden,
          "w-full flex flex-row flex-wrap items-center": !hidden,
        },
        className
      )}
    >
      <label
        htmlFor={id}
        className={classNames("w-full max-w-[calc(100%-40px)] text-base", {
          "cursor-pointer": cursorPointer,
        })}
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
    </div>
  );
};
