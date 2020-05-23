import { rules, schema } from "../mod.ts";
import { minLength, notEmpty, required } from "../rules.ts";

interface Car {
  manufacturer: string;
  model: string;
  hp: number;
}

const carSchema = schema<Car>({
  manufacturer: rules(minLength(5)),
  model: rules(notEmpty()),
  hp: rules(required()),
});

const tesla: Car = {
  manufacturer: "Tesla",
  model: "Model 3",
  hp: 490,
};

const result = carSchema.validate(tesla);

console.log(result);
// { isValid: true, errors: [] }
