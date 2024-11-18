import { assert, assertEquals, assertThrows } from "@std/assert";
import { NotFoundException, Optional } from '@domaincrafters/std/mod.ts';

Deno.test("Optional.of() should create an Optional containing the given value", () => {
  // Arrange
  const value = 42;

  // Act
  const optional = Optional.of(value);

  // Assert
  assert(optional.isPresent);
  assertEquals(optional.value, value);
});

Deno.test("Optional.of() should throw an Error when value is undefined", () => {
  // Arrange
  const value = undefined;

  // Act & Assert
  assertThrows(
    () => {
      Optional.of(value);
    },
    Error,
    "Cannot create Optional.of with undefined or null",
  );
});

Deno.test("Optional.of() should throw an Error when value is null", () => {
  // Arrange
  const value = null;

  // Act & Assert
  assertThrows(
    () => {
      Optional.of(value);
    },
    Error,
    "Cannot create Optional.of with undefined or null",
  );
});

Deno.test("Optional.ofNullable() should create an Optional containing the given value", () => {
  // Arrange
  const value = "hello";

  // Act
  const optional = Optional.ofNullable(value);

  // Assert
  assert(optional.isPresent);
  assertEquals(optional.value, value);
});

Deno.test("Optional.ofNullable() should create an empty Optional when value is undefined", () => {
  // Arrange
  const value = undefined;

  // Act
  const optional = Optional.ofNullable(value);

  // Assert
  assert(!optional.isPresent);
});

Deno.test("Optional.empty() should create an empty Optional", () => {
  // Arrange & Act
  const optional = Optional.empty();

  // Assert
  assert(!optional.isPresent);
});

Deno.test("Optional.value should return the value when Optional is present", () => {
  // Arrange
  const value = 100;
  const optional = Optional.of(value);

  // Act
  const result = optional.value;

  // Assert
  assertEquals(result, value);
});

Deno.test("Optional.value should throw an Error when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty();

  // Act & Assert
  assertThrows(
    () => {
      const value = optional.value;
      console.log(value);
    },
    Error,
    "Value not found.",
  );
});

Deno.test("Optional.isPresent should return true when Optional has value", () => {
  // Arrange
  const optional = Optional.of("test");

  // Act
  const result = optional.isPresent;

  // Assert
  assertEquals(result, true);
});

Deno.test("Optional.isPresent should return false when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty();

  // Act
  const result = optional.isPresent;

  // Assert
  assertEquals(result, false);
});

Deno.test("Optional.getOrElse() should return the value when Optional is present", () => {
  // Arrange
  const value = 10;
  const defaultValue = 20;
  const optional = Optional.of(value);

  // Act
  const result = optional.getOrElse(defaultValue);

  // Assert
  assertEquals(result, value);
});

Deno.test("Optional.getOrElse() should return defaultValue when Optional is empty", () => {
  // Arrange
  const defaultValue = 20;
  const optional = Optional.empty<number>();

  // Act
  const result = optional.getOrElse(defaultValue);

  // Assert
  assertEquals(result, defaultValue);
});

Deno.test("Optional.map() should apply mapper function when Optional is present", () => {
  // Arrange
  const optional = Optional.of<number>(5);
  const mapper = (x: number) => x * 2;

  // Act
  const result = optional.map(mapper);

  // Assert
  assert(result.isPresent);
  assertEquals(result.value, 10);
});

Deno.test("Optional.map() should return empty Optional when mapper returns null", () => {
  // Arrange
  const optional = Optional.of<number>(5);
  const mapper = (_: number) => null;

  // Act
  const result = optional.map(mapper);

  // Assert
  assert(!result.isPresent);
});

Deno.test("Optional.map() should return empty Optional when mapper returns undefined", () => {
  // Arrange
  const optional = Optional.of<number>(5);
  const mapper = (_: number) => undefined;

  // Act
  const result = optional.map(mapper);

  // Assert
  assert(!result.isPresent);
});

Deno.test("Optional.map() should return empty Optional when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty<number>();
  const mapper = (x: number) => x * 2;

  // Act
  const result = optional.map(mapper);

  // Assert
  assert(!result.isPresent);
});

Deno.test("Optional.flatMap() should apply mapper function when Optional is present", () => {
  // Arrange
  const optional = Optional.of<number>(5);
  const mapper = (x: number) => Optional.of(x * 2);

  // Act
  const result = optional.flatMap(mapper);

  // Assert
  assert(result.isPresent);
  assertEquals(result.value, 10);
});

Deno.test("Optional.flatMap() should return empty Optional when mapper returns null", () => {
  // Arrange
  const optional = Optional.of<number>(5);
  const mapper = (_: number) => null;

  // Act
  const result = optional.flatMap(mapper);

  // Assert
  assert(!result.isPresent);
});

Deno.test("Optional.flatMap() should return empty Optional when mapper returns undefined", () => {
  // Arrange
  const optional = Optional.of<number>(5);
  const mapper = (_: number) => undefined;

  // Act
  const result = optional.flatMap(mapper);

  // Assert
  assert(!result.isPresent);
});

Deno.test("Optional.flatMap() should return empty Optional when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty<number>();
  const mapper = (x: number) => Optional.of(x * 2);

  // Act
  const result = optional.flatMap(mapper);

  // Assert
  assert(!result.isPresent);
});

Deno.test("Optional.filter() should return same Optional when predicate is true", () => {
  // Arrange
  const optional = Optional.of<number>(5);
  const predicate = (x: number) => x > 3;

  // Act
  const result = optional.filter(predicate);

  // Assert
  assert(result.isPresent);
  assertEquals(result.value, 5);
});

Deno.test("Optional.filter() should return empty Optional when predicate is false", () => {
  // Arrange
  const optional = Optional.of<number>(2);
  const predicate = (x: number) => x > 3;

  // Act
  const result = optional.filter(predicate);

  // Assert
  assert(!result.isPresent);
});

Deno.test("Optional.filter() should return same empty Optional when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty<number>();
  const predicate = (x: number) => x > 3;

  // Act
  const result = optional.filter(predicate);

  // Assert
  assert(!result.isPresent);
});

Deno.test("Optional.ifPresent() should call consumer when Optional is present", () => {
  // Arrange
  const optional = Optional.of<string>("hello");
  let called = false;
  const consumer = (value: string) => {
    called = true;
    assertEquals(value, "hello");
  };

  // Act
  optional.ifPresent(consumer);

  // Assert
  assert(called);
});

Deno.test("Optional.ifPresent() should not call consumer when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty<string>();
  let called = false;
  const consumer = (_: string) => {
    called = true;
  };

  // Act
  optional.ifPresent(consumer);

  // Assert
  assert(!called);
});

Deno.test("Optional.orElseThrow() should return value when Optional is present", () => {
  // Arrange
  const optional = Optional.of(5);
  const errorSupplier = () => new Error("No value");

  // Act
  const result = optional.orElseThrow(errorSupplier);

  // Assert
  assertEquals(result, 5);
});

Deno.test("Optional.orElseThrow() should throw Error from errorSupplier when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty<number>();
  const errorSupplier = () => new Error("No value");

  // Act & Assert
  assertThrows(
    () => {
      optional.orElseThrow(errorSupplier);
    },
    Error,
    "No value",
  );
});

Deno.test("Optional.equals() should return true for Optionals with same value", () => {
  // Arrange
  const optional1 = Optional.of(5);
  const optional2 = Optional.of(5);

  // Act
  const result = optional1.equals(optional2);

  // Assert
  assertEquals(result, true);
});

Deno.test("Optional.equals() should return false for Optionals with different values", () => {
  // Arrange
  const optional1 = Optional.of(5);
  const optional2 = Optional.of(10);

  // Act
  const result = optional1.equals(optional2);

  // Assert
  assertEquals(result, false);
});

Deno.test("Optional.equals() should return true for two empty Optionals", () => {
  // Arrange
  const optional1 = Optional.empty<number>();
  const optional2 = Optional.empty<number>();

  // Act
  const result = optional1.equals(optional2);

  // Assert
  assertEquals(result, true);
});

Deno.test("Optional.equals() should return false for empty and non-empty Optional", () => {
  // Arrange
  const optional1 = Optional.of(5);
  const optional2 = Optional.empty<number>();

  // Act
  const result = optional1.equals(optional2);

  // Assert
  assertEquals(result, false);
});

Deno.test("Optional.toString() should return Optional(value) when Optional is present", () => {
  // Arrange
  const optional = Optional.of(5);

  // Act
  const result = optional.toString();

  // Assert
  assertEquals(result, "Optional(5)");
});

Deno.test("Optional.toString() should return Optional.empty when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty<number>();

  // Act
  const result = optional.toString();

  // Assert
  assertEquals(result, "Optional.empty");
});

Deno.test("Optional should handle objects", () => {
  // Arrange
  interface TestObject {
    a: number;
  }
  const obj: TestObject = { a: 1 };
  const optional = Optional.of<TestObject>(obj);

  // Act
  const result = optional.value;

  // Assert
  assertEquals(result, obj);
  assertEquals(result.a, 1);
});

Deno.test("Optional.equals() should handle object references", () => {
  // Arrange
  const obj1 = { a: 1 };
  const obj2 = { a: 1 };
  const optional1 = Optional.of(obj1);
  const optional2 = Optional.of(obj1);
  const optional3 = Optional.of(obj2);

  // Act
  const result1 = optional1.equals(optional2); // Same reference
  const result2 = optional1.equals(optional3); // Different references

  // Assert
  assertEquals(result1, true);
  assertEquals(result2, false);
});

Deno.test("Optional.getOrThrow() should return the value when Optional is present", () => {
  // Arrange
  const value = 42;
  const optional = Optional.of(value);

  // Act
  const result = optional.getOrThrow("Value not found");

  // Assert
  assertEquals(result, value);
});

Deno.test("Optional.getOrThrow() should throw NotFoundException with provided message when Optional is empty", () => {
  // Arrange
  const optional = Optional.empty<number>();
  const errorMessage = "Could not find this value.";

  // Act & Assert
  assertThrows(
    () => {
      optional.getOrThrow(errorMessage);
    },
    NotFoundException,
    errorMessage,
  );
});
