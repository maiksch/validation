import { ValidationFunction } from "./types.ts";

type MessageFunction = (property: string, value: string) => string;

/**
 *
 * @param typeValue
 * @param message
 */
export function type(
  typeValue: string,
  message?: MessageFunction
): ValidationFunction {
  return (value: string, property: string) => {
    if (typeof value !== typeValue) {
      return message
        ? message(property, value)
        : `${property} should be ${typeValue} but is ${typeof value}`;
    }
  };
}

/**
 * Checks if a string is not empty
 * @param message
 */
export function notEmpty(message?: MessageFunction): ValidationFunction {
  return (value: string, property: string) => {
    if (typeof value !== "string") {
      console.info(
        `Validating notEmpty for non-string type value (${property})`
      );
      return;
    }

    if (value == null || value.length === 0) {
      return message
        ? message(property, value)
        : `${property} should not be empty`;
    }
  };
}

/**
 *
 * @param min
 * @param message
 */
export function minLength(
  min: number,
  message?: MessageFunction
): ValidationFunction {
  return (value: string, property: string) => {
    if (value == null || value.length < min) {
      const actualValue = value == null ? "is null" : `has ${value.length}`;
      return message
        ? message(property, value)
        : `${property} should have minimum length of ${min} but ${actualValue}`;
    }
  };
}

/**
 *
 * @param max
 * @param message
 */
export function maxLength(
  max: number,
  message?: MessageFunction
): ValidationFunction {
  return (value: string, property: string) => {
    if (value == null || value.length > max) {
      const actualValue = value == null ? "is null" : `has ${value.length}`;
      return message
        ? message(property, value)
        : `${property} should have maximum length of ${max} but ${actualValue}`;
    }
  };
}

/**
 *
 * @param compare
 * @param message
 */
export function notEqual(
  compare: any,
  message?: MessageFunction
): ValidationFunction {
  return (value: any, property: string) => {
    if (value === compare) {
      return message
        ? message(property, value)
        : `${property} should not be equal to ${compare}`;
    }
  };
}

/**
 *
 * @param message
 */
export function required(message?: MessageFunction): ValidationFunction {
  return (value: any, property: string) => {
    if (value == null) {
      return message ? message(property, value) : `${property} is required`;
    }
  };
}
