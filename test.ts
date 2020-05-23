import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { schema, rules } from "./mod.ts";
import { notEmpty } from "./rules.ts";

Deno.test("Empty schema config", () => {
  const object = {};
  const emptySchema = schema({});

  const result = emptySchema.validate(object);

  assertEquals(result.isValid, false);
  assertEquals(result.errors.length, 1);
  assertEquals(result.errors[0], "No valid config provided");
});

Deno.test("notEmpty", () => {
  const object = {
    emptyString: "",
    notEmptyString: "not empty",
  };
  const objectSchema = schema({
    emptyString: rules(notEmpty()),
    notEmptyString: rules(notEmpty()),
  });

  const result = objectSchema.validate(object);

  assertEquals(result.isValid, false);
  assertEquals(result.errors.length, 1);
  assertEquals(result.errors[0], "emptyString should not be empty");
});
