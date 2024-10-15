import { assertThrows } from '@std/assert/throws';
import { assertEquals } from '@std/assert/equals';
import { assertUUIDIsValid, IllegalArgumentException, UUID } from '@domaincrafters/std/mod.ts';

Deno.test("Creating a new uuid returns a valid uuid", () => {
    // Arrange & Act
    const uuid = UUID.create();

    // Assert
    assertUUIDIsValid(uuid);
});

Deno.test("Creating a new uuid from a string returns a valid uuid", () => {
    // Arrange & Act
    const uuid = UUID.parse('550e8400-e29b-41d4-a716-446655440000');

    // Assert
    assertUUIDIsValid(uuid);
});

Deno.test("Creating a new uuid from a corrupted string throws an error", () => {
    // Arrange
    const uuid = '550e8400-e29b-41d4-a716-44665544000';
    // Act & Assert
    assertThrows(() => UUID.parse(uuid), IllegalArgumentException);
});

Deno.test("Creating a new uuid from an empty string throws an error", () => {
    // Arrange
    const uuid = '';
    // Act & Assert
    assertThrows(() => UUID.parse(uuid), IllegalArgumentException);
});

Deno.test("Comparing two equal uuids returns true", () => {
    // Arrange
    const uuid1 = UUID.create();
    const uuid2 = UUID.parse(uuid1.toString());

    // Act & Assert
    assertEquals(uuid1.equals(uuid2), true);
});

Deno.test("Comparing two different uuids returns false", () => {
    // Arrange
    const uuid1 = UUID.create();
    const uuid2 = UUID.create();

    // Act & Assert
    assertEquals(uuid1.equals(uuid2), false);
});

Deno.test("Comparing a uuid with an equal string representation returns true", () => {
    // Arrange
    const uuid = UUID.create();

    // Act & Assert
    assertEquals(uuid.equals(uuid.toString()), true);
});

Deno.test("Converting a uuid to a string returns a string", () => {
    // Arrange
    const uuid = UUID.create();

    // Act & Assert
    assertEquals(typeof uuid.toString(), 'string');
});

Deno.test("Converting a uuid to a string returns a valid uuid", () => {
    // Arrange
    const uuid = UUID.create();

    // Act & Assert
    assertUUIDIsValid(uuid.toString());
});

Deno.test("Creating an empty uuid return an empty uuid", () => {
    // Arrange & Act
    const uuid = UUID.EMPTY;

    // Assert
    assertEquals(uuid.toString(), '00000000-0000-0000-0000-000000000000');
});

Deno.test("Getting the value of an empty uuid returns an empty string", () => {
    // Arrange & Act
    const uuid = UUID.EMPTY;

    // Assert
    assertEquals(uuid.value, '00000000-0000-0000-0000-000000000000');
});

Deno.test("Getting the value of a uuid returns a string", () => {
    // Arrange
    const uuid = UUID.create();

    // Act & Assert
    assertEquals(typeof uuid.value, 'string');
});

Deno.test("Getting the value of a uuid returns the uuid", () => {
    // Arrange
    const uuid = UUID.create();

    // Act & Assert
    assertEquals(uuid.value, uuid.toString());
});
