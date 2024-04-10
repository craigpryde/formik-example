/* Dependencies */

// Models
type Props = {
  /**
   * Sets the field maximum character limit.
   */
  maxLength: number;
  /**
   * Character count
   */
  charCount: number;
};

/**
 * Character Count
 * @param Props - Required component props
 * @returns
 */
export const CharacterCount = ({ maxLength, charCount }: Props) => {
  return (
    <small className={`ml-auto text-right my-half`}>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        You have {maxLength - charCount} characters remaining.
      </span>
      {charCount}/{maxLength}
    </small>
  );
};
