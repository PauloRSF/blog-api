import { APIError } from '@shared/errors/apiError';
import { BaseSchema } from 'yup';

const validateSchema = (schema: BaseSchema, data: Record<string, string | number>): void => {
  try {
    schema.validateSync(data);
  } catch (err) {
    throw new APIError(err.message, 400)
  }
}

export default validateSchema;
