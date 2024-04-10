/* Dependencies */
import classNames from "classnames";

// Models
type Props = {
  /**
   * Sets the error state on the field.
   */
  error?: string;
  /**
   * Sets the support text on the field.
   */
  supportText?: string;
  /**
   * Id to use.
   */
  id: string;
  /**
   * Name of field
   */
  name: string;
};

/**
 * Support Text
 * @param Props - Required component props
 * @returns
 */
export const SupportText = ({ error, supportText, id, name }: Props) => {
  if (error || supportText) {
    return (
      <div className="w-full flex flex-row flex-wrap items-start mt-half">
        <small
          className={classNames("text-sm block w-full", {
            "text-error": error,
            "text-white": !error,
          })}
          id={`${id}_${name}-help`}
        >
          {!error ? supportText : error}
        </small>
      </div>
    );
  }

  return <></>;
};
