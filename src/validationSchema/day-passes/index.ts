import * as yup from 'yup';

export const dayPassValidationSchema = yup.object().shape({
  availability: yup.boolean().required(),
  organization_id: yup.string().nullable(),
});
