const createValueCore = <T = string | number | boolean>(name: string, parsedValue: string | null, transformer: (value: string) => T, validator?: (value: T) => boolean): T => {
  if (parsedValue === null) {
    throw new Error(`${name} was found, but the value was null. This probably means the parser needs to be updated.`);
  }

  let value;

  try {
    value = transformer(parsedValue);
  } catch {
    throw new Error(`The parsed value "${name}" could not be transformed. Value: "${JSON.stringify(parsedValue)}"`);
  }

  if (validator != null && !validator(value)) {
    throw new Error(`The transformed value "${name}" was invalid. Value: "${value}"`);
  }

  return value;
};

export const createValue = <T = string | number | boolean>(name: string, parsedValue: string | null | undefined, transformer: (value: string) => T, validator?: (value: T) => boolean): T => {
  if (parsedValue === undefined) {
    throw new Error(`"${name}" was not found. This probably means the parser needs to be updated.`);
  }

  return createValueCore(name, parsedValue, transformer, validator);
};

export const createOptionalValue = <T = string | number | boolean>(name: string, parsedValue: string | null | undefined, transformer: (value: string) => T, validator?: (value: T) => boolean): T | undefined => {
  if (parsedValue === undefined) {
    return parsedValue;
  }

  return createValueCore(name, parsedValue, transformer, validator);
};