import { assertEquals, assertThrows } from '@std/assert';
import { Exception, Guard, IllegalArgumentException } from '@domaincrafters/std/mod.ts';
// Custom exception for testing
class CustomException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
/**
 * Tests for Guard.check
 */
Deno.test("Guard.check creates a new Guard instance", () => {
  // Arrange
  const value = "test";
  const parameterName = "testParam";

  // Act
  const guard = Guard.check(value, parameterName);

  // Assert
  assertEquals(guard instanceof Guard, true);
});

Deno.test("Guard.check sets default parameter name when not specified", () => {
  // Arrange
  const value = "test";

  // Act
  const guard = Guard.check(value);

  // Assert
  assertEquals(guard instanceof Guard, true);
});


/**
 * Tests for Guard.againstNullOrUndefined
 */
Deno.test("Guard.againstNullOrUndefined does not throw when value is not null or undefined", () => {
  // Arrange
  const value: string = "test";
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.againstNullOrUndefined();
});

Deno.test("Guard.againstNullOrUndefined throws when value is null", () => {
  // Arrange
  const value: any = null;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstNullOrUndefined();
    },
    IllegalArgumentException,
    'testParam cannot be null or undefined. Actual value: null.',
  );
});

Deno.test("Guard.againstNullOrUndefined throws when value is undefined", () => {
  // Arrange
  const value: any = undefined;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstNullOrUndefined();
    },
    IllegalArgumentException,
    'testParam cannot be null or undefined. Actual value: undefined.',
  );
});

Deno.test("Guard.againstNullOrUndefined throws CustomException when specified", () => {
  // Arrange
  const value: any = null;
  const guard = Guard.check(value, "testParam", CustomException);

  // Act & Assert
  assertThrows(
    () => {
      guard.againstNullOrUndefined();
    },
    CustomException,
    'testParam cannot be null or undefined. Actual value: null.',
  );
});

Deno.test("Guard.againstNullOrUndefined throws with custom message when specified", () => {
  // Arrange
  const value: any = null;
  const guard = Guard.check(value, "testParam");
  const customMessage = "Custom error message.";

  // Act & Assert
  assertThrows(
    () => {
      guard.againstNullOrUndefined(customMessage);
    },
    IllegalArgumentException,
    `${customMessage} Actual value: null.`,
  );
});

/**
 * Tests for Guard.againstWhitespace
 */
Deno.test("Guard.againstWhitespace does not throw when value is non-empty non-whitespace string", () => {
  // Arrange
  const value = "test";
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.againstWhitespace();
});

Deno.test("Guard.againstWhitespace throws when value is empty string", () => {
  // Arrange
  const value = "";
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstWhitespace();
    },
    IllegalArgumentException,
    'testParam cannot be empty or whitespace. Actual value: "".',
  );
});

Deno.test("Guard.againstWhitespace throws when value is whitespace string", () => {
  // Arrange
  const value = "   ";
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstWhitespace();
    },
    IllegalArgumentException,
    'testParam cannot be empty or whitespace. Actual value: "   ".',
  );
});

Deno.test("Guard.againstWhitespace throws when value is null", () => {
  // Arrange
  const value: any = null;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstWhitespace();
    },
    IllegalArgumentException,
    'testParam cannot be null or undefined. Actual value: null.',
  );
});

Deno.test("Guard.againstWhitespace throws when value is not a string", () => {
  // Arrange
  const value: any = 123;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstWhitespace();
    },
    IllegalArgumentException,
    "testParam must be a string. Actual value: 123.",
  );
});

/**
 * Tests for Guard.againstEmpty
 */
Deno.test("Guard.againstEmpty does not throw when value is non-empty string", () => {
  // Arrange
  const value = "test";
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.againstEmpty();
});

Deno.test("Guard.againstEmpty does not throw when value is non-empty array", () => {
  // Arrange
  const value = [1, 2, 3];
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.againstEmpty();
});

Deno.test("Guard.againstEmpty does not throw when value is object with length property", () => {
  // Arrange
  const value = { length: 1 };
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.againstEmpty();
});

Deno.test("Guard.againstEmpty throws when value is empty string", () => {
  // Arrange
  const value = "";
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstEmpty();
    },
    IllegalArgumentException,
    'testParam cannot be empty. Actual value: "".',
  );
});

Deno.test("Guard.againstEmpty throws when value is empty array", () => {
  // Arrange
  const value: any[] = [];
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstEmpty();
    },
    IllegalArgumentException,
    "testParam cannot be empty. Actual value: [].",
  );
});

Deno.test("Guard.againstEmpty throws when value is object with length 0", () => {
  // Arrange
  const value = { length: 0 };
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstEmpty();
    },
    IllegalArgumentException,
    'testParam cannot be empty. Actual value: {"length":0}.',
  );
});

Deno.test("Guard.againstEmpty throws when value does not have length property", () => {
  // Arrange
  const value = {};
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstEmpty();
    },
    IllegalArgumentException,
    "testParam must be a string, array, or have a length property to check for empty. Actual value: {}.",
  );
});

/**
 * Tests for Guard.againstNegative
 */
Deno.test("Guard.againstNegative does not throw when value is positive number", () => {
  // Arrange
  const value = 5;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.againstNegative();
});

Deno.test("Guard.againstNegative does not throw when value is zero", () => {
  // Arrange
  const value = 0;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.againstNegative();
});

Deno.test("Guard.againstNegative throws when value is negative number", () => {
  // Arrange
  const value = -1;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstNegative();
    },
    IllegalArgumentException,
    "testParam cannot be negative. Actual value: -1.",
  );
});

Deno.test("Guard.againstNegative throws when value is NaN", () => {
  // Arrange
  const value = NaN;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstNegative();
    },
    IllegalArgumentException,
    "testParam must be a valid number. Actual value: null.",
  );
});

/**
 * Tests for Guard.againstZero
 */
Deno.test("Guard.againstZero does not throw when value is positive number", () => {
  // Arrange
  const value = 5;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.againstZero();
});

Deno.test("Guard.againstZero throws when value is zero", () => {
  // Arrange
  const value = 0;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstZero();
    },
    IllegalArgumentException,
    "testParam cannot be zero. Actual value: 0.",
  );
});

Deno.test("Guard.againstZero throws when value is NaN", () => {
  // Arrange
  const value = NaN;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.againstZero();
    },
    IllegalArgumentException,
    "testParam must be a valid number. Actual value: null.",
  );
});

/**
 * Tests for Guard.isInRange
 */
Deno.test("Guard.isInRange does not throw when value is within range", () => {
  // Arrange
  const value = 5;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.isInRange(1, 10);
});

Deno.test("Guard.isInRange throws when value is below min", () => {
  // Arrange
  const value = 0;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.isInRange(1, 10);
    },
    IllegalArgumentException,
    "testParam must be between 1 and 10. Actual value: 0.",
  );
});

Deno.test("Guard.isInRange throws when value is above max", () => {
  // Arrange
  const value = 11;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.isInRange(1, 10);
    },
    IllegalArgumentException,
    "testParam must be between 1 and 10. Actual value: 11.",
  );
});

Deno.test("Guard.isInRange throws when value is NaN", () => {
  // Arrange
  const value = NaN;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.isInRange(1, 10);
    },
    IllegalArgumentException,
    "testParam must be a valid number. Actual value: null.",
  );
});

/**
 * Tests for Guard.matches
 */
Deno.test("Guard.matches does not throw when value matches regex", () => {
  // Arrange
  const value = "abc123";
  const regex = /^[a-z]+\d+$/;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.matches(regex);
});

Deno.test("Guard.matches throws when value does not match regex", () => {
  // Arrange
  const value = "123abc";
  const regex = /^[a-z]+\d+$/;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.matches(regex);
    },
    IllegalArgumentException,
    'testParam does not match the required pattern. Actual value: "123abc".',
  );
});

Deno.test("Guard.matches throws when value is not a string", () => {
  // Arrange
  const value = 123;
  const regex = /^[a-z]+\d+$/;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.matches(regex);
    },
    IllegalArgumentException,
    "testParam must be a string. Actual value: 123.",
  );
});

/**
 * Tests for Guard.isType
 */
Deno.test("Guard.isType does not throw when value is of specified type", () => {
  // Arrange
  const value = "test";
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  guard.isType("string");
});

Deno.test("Guard.isType throws when value is not of specified type", () => {
  // Arrange
  const value = 123;
  const guard = Guard.check(value, "testParam");

  // Act & Assert
  assertThrows(
    () => {
      guard.isType("string");
    },
    IllegalArgumentException,
    "testParam must be of type string. Actual value: 123.",
  );
});
