import numeral from 'numeral';
import { parse, toSeconds } from 'iso8601-duration';
import isString from 'lodash.isstring';
import isNumber from 'lodash.isnumber';

export const identity = <T>(value: T): T => value;

export const isNonEmptyString = (value: unknown): value is string =>isString(value) && value.length > 0;

export const toNumber = (value: string): number => {
  const converted = numeral(value).value();
  if (!isNumber(converted)) {
    throw new Error('The value could not be converted to a number.');
  }

  return converted;
};

export const toNumberISO8601Seconds = (value: string): number => {
  const converted = toSeconds(parse(value));
  if (!isNumber(converted)) {
    throw new Error('The ISO8601 value could not be converted to a number.');
  }

  return converted;
};

export const toBoolean = (value: string): boolean => {
  switch (value.trim().toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      throw new Error('The value could not be converted to a boolean.');
  }
};