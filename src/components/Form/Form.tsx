/* Dependencies */
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../Controls/Input/Input";
import { handleFieldError } from "@/helpers";
import { TextArea } from "../Controls/TextArea/TextArea";

// Models
type InitialValues = {
  first_name: string;
  last_name: string;
  email: string;
  note: string;
};

// Validation
const formValidation = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  note: Yup.string().required("Note is required"),
});

// Constants
const initialValues: InitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  note: "",
};

/**
 * Form Example
 */
export const Form = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidation}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 p-2">
          <div className="w-full grid gird-cols-1 md:grid-cols-2 gap-2">
            <Input
              label="First Name"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={handleFieldError(errors, touched, "first_name")}
              inputMode="text"
              type="text"
              required
              formId="form-first-name"
            />

            <Input
              label="Last Name"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={handleFieldError(errors, touched, "last_name")}
              inputMode="text"
              type="text"
              required
              formId="form-last-name"
            />
          </div>

          <div className="w-full">
            <Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={handleFieldError(errors, touched, "email")}
              inputMode="email"
              type="email"
              required
              formId="form-email"
            />
          </div>

          <div className="w-full">
            <TextArea
              label="Note"
              name="note"
              value={values.note}
              onChange={handleChange}
              onBlur={handleBlur}
              error={handleFieldError(errors, touched, "note")}
              required
              formId="form-note"
            />
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
