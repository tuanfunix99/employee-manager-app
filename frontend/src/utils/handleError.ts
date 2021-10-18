
interface validationErrorsType {
    [property: string]: string
}

export const handleValidationError = (validationErrors: validationErrorsType) => {
  let errors: string[] = [];
  for (const property in validationErrors) {
    errors.push(`${validationErrors[property]}`);
  }
  return errors;
};

export const handleErrorNotFound = (notfoundError: string) => {
  let errors: string[] = [];
  errors.push(notfoundError);
  return errors;
};
