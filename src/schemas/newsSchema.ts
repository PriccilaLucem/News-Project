import * as yup from "yup";

const newsSchema = yup.object().shape({
  name: yup.string().required(),
  text: yup.string().required(),
  category: yup.string().required(),
});

export default newsSchema;
