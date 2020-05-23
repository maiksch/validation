import { ValidationFunction } from "./types.ts";

type Rules = (toValidateObject: any, toValidateProperty: string) => string[];

type SchemaConfig<T> = { [property in keyof T]?: Rules };

interface Schema<T> {
  validate: (toValidateObject: T) => ValidationResult;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 *
 * @param config
 */
export function schema<T = any>(config: SchemaConfig<T>): Schema<T> {
  if (config == null || Object.keys(config).length === 0) {
    return {
      validate: (): ValidationResult => ({
        isValid: false,
        errors: ["No valid config provided"],
      }),
    };
  }

  return {
    validate: (toValidateObject: T): ValidationResult => {
      const propertyErrors: string[][] = Object.getOwnPropertyNames(config).map(
        (property) => {
          const propertyRules = (config as any)[property];
          return propertyRules(toValidateObject, property);
        }
      );

      const flattened = propertyErrors.reduce(
        (acc, cur) => [...acc, ...cur],
        []
      );
      return {
        isValid: flattened.length === 0,
        errors: flattened,
      };
    },
  };
}

/**
 *
 * @param validatorFunction
 */
export function rules(...validatorFunction: ValidationFunction[]): Rules {
  return (toValidateObject: any, toValidateProperty: string): string[] => {
    const errors = validatorFunction
      .map((validatorFunc) => {
        if (toValidateObject[toValidateProperty] === undefined) {
          console.log(
            `Object ${JSON.stringify(
              toValidateObject
            )} has no property ${toValidateProperty}`
          );
          return;
        }
        const toValidateValue = toValidateObject[toValidateProperty];
        return validatorFunc(toValidateValue, toValidateProperty);
      })
      .filter((error) => error != undefined);

    return errors as string[];
  };
}
