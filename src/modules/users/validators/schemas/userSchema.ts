import * as Yup from 'yup';

const userSchema = Yup.object({
  displayName: Yup.string().min(8, '"displayName" length must be at least 8 characters long'),
  email: Yup.string().email('"email" must be a valid email').required('"email" is required'),
  image: Yup.string(),
  password: Yup.string().min(6, '"password" must be at least 6 characters long').required('"password" is required')
})

export default userSchema;
