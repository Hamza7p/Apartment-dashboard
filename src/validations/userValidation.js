import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  phone: yup
    .string()
    .required("users.validation.phoneRequired")
    .matches(/^9639\d{8}$/, "users.validation.phoneFormat"),
  password: yup
    .string()
    .required("users.validation.passwordRequired")
    .min(4, "users.validation.passwordMin"),
  role: yup
    .string()
    .required("users.validation.roleRequired")
    .oneOf(["user", "admin"], "users.validation.roleInvalid"),
  first_name: yup
    .string()
    .required("users.validation.firstNameRequired"),
  last_name: yup
    .string()
    .required("users.validation.lastNameRequired"),
  date_of_birth: yup
    .string()
    .required("users.validation.dateOfBirthRequired")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "users.validation.dateOfBirthFormat"),
});

export default createUserSchema;

