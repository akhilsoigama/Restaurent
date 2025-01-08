import * as Yup from 'yup';

const Schemas = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Confirm password is required"),
    mobile: Yup.string().required("Mobile number is required"),
});
export default Schemas

export const loginSchemas = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})