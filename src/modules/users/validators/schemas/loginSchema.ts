import * as Yup from 'yup';

const userSchema = Yup.object({
  email: Yup.string().min(1, '"email" is not allowed to be empty').email('"email" must be a valid email').required('"email" is required'),
  password: Yup.string().min(1, '"password" is not allowed to be empty').required('"password" is required')
})

export default userSchema;
