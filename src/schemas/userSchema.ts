import * as yup from "yup";
import * as bcrypt from "bcrypt";

const userSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup
    .string()
    .required()
    .transform((value) => bcrypt.hashSync(value, 10)),
  email: yup.string().email().required(),
  is_adm: yup.boolean(),
});

export default userSchema;
