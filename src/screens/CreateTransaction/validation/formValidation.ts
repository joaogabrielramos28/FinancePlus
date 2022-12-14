import * as Yup from "yup";

export const FirstStepSchemaValidation = Yup.object().shape({
  category: Yup.string().required("Categoria é obrigatória"),
});

export const SecondStepSchemaValidation = Yup.object().shape({
  subCategory: Yup.string().required("SubCategoria é obrigatório"),
});

export const ThirdStepSchemaValidation = Yup.object().shape({
  amount: Yup.string().required("Valor é obrigatório"),
  date: Yup.string().required("Data é obrigatório"),
  type: Yup.string().required("Tipo é obrigatório"),
  description: Yup.string().required("Descrição é obrigatório"),
});
