import * as Yup from 'yup';

const postSchema = Yup.object({
  title: Yup.string().required('"title" is required'),
  content: Yup.string().required('"content" is required')
})

export default postSchema;
