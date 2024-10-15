/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * Represents a universally unique identifier (UUID).
 *
 * This class provides methods to create, parse, and compare UUIDs.
 * It ensures that all UUIDs conform to the standard UUID format.
 *
 * @example Usage
 * ```ts
 * import { UUID } from './UUID.ts';
 *
 * // Creating a new UUID
 * const newUuid = UUID.create();
 * console.log(newUuid.toString()); // e.g., '3d6f0a3b-7b9c-4d2a-9f3c-1e2d3c4b5a6f'
 *
 * // Parsing an existing UUID string
 * const parsedUuid = UUID.parse('550e8400-e29b-41d4-a716-446655440000');
 * console.log(parsedUuid.value); // '550e8400-e29b-41d4-a716-446655440000'
 *
 * // Using the EMPTY UUID
 * console.log(UUID.EMPTY.toString()); // '00000000-0000-0000-0000-000000000000'
 *
 * // Comparing two UUIDs
 * const uuid1 = UUID.create();
 * const uuid2 = UUID.parse(uuid1.toString());
 * console.log(uuid1.equals(uuid2)); // true
 *
 * // Comparing a UUID with a string
 * const uuid = UUID.create();
 * console.log(uuid.equals(uuid.toString())); // true
 */
import { v4 } from '@std/uuid';
import { IllegalArgumentException } from '@domaincrafters/std/mod.ts';

export class UUID {
    /**
     * A constant representing an empty UUID.
     *
     * @example
     * console.log(UUID.EMPTY.toString()); // Outputs: '00000000-0000-0000-0000-000000000000'
     */
    public static readonly EMPTY: UUID = new UUID('00000000-0000-0000-0000-000000000000');

    /**
     * The string value of the UUID.
     *
     * @internal
     */
    private readonly _value: string;

    /**
     * Creates an instance of UUID.
     *
     * **Note:** This constructor is private. Use {@link UUID.create} or {@link UUID.parse} to create instances.
     *
     * @param value - The string representation of the UUID.
     */
    private constructor(value: string) {
        this._value = value;
    }

    /**
     * Generates a new UUID using the cryptographic random UUID generator.
     *
     * @returns A new {@link UUID} instance with a randomly generated UUID.
     *
     * @example
     * const newUuid = UUID.create();
     * console.log(newUuid.toString());
     */
    static create(): UUID {
        return new UUID(crypto.randomUUID());
    }

    /**
     * Parses a string to create a {@link UUID} instance.
     *
     * @param uuidString - The string representation of the UUID to parse.
     * @returns A new {@link UUID} instance corresponding to the provided string.
     *
     * @throws {IllegalArgumentException} If the provided string is not a valid UUID.
     *
     * @example
     * const parsedUuid = UUID.parse('550e8400-e29b-41d4-a716-446655440000');
     */
    static parse(uuidString: string): UUID {
        if (!v4.validate(uuidString)) {
            throw new IllegalArgumentException('Invalid UUID');
        }

        return new UUID(uuidString);
    }

    /**
     * Returns the string representation of the UUID.
     *
     * @returns The UUID as a string.
     *
     * @example
     * const uuid = UUID.create();
     * console.log(uuid.toString()); // e.g., '3d6f0a3b-7b9c-4d2a-9f3c-1e2d3c4b5a6f'
     */
    public toString(): string {
        return this._value;
    }

    /**
     * Gets the string value of the UUID.
     *
     * @returns The UUID as a string.
     *
     * @example
     * const uuid = UUID.create();
     * console.log(uuid.value); // e.g., '3d6f0a3b-7b9c-4d2a-9f3c-1e2d3c4b5a6f'
     */
    get value(): string {
        return this._value;
    }

    /**
     * Compares this UUID with another UUID or a string representation of a UUID.
     *
     * @param other - The UUID or string to compare with.
     * @returns `true` if the UUIDs are equal (case-insensitive), otherwise `false`.
     *
     * @example
     * const uuid1 = UUID.create();
     * const uuid2 = UUID.parse(uuid1.toString());
     * console.log(uuid1.equals(uuid2)); // true
     *
     * @example
     * const uuid = UUID.create();
     * console.log(uuid.equals(uuid.toString())); // true
     */
    public equals(other: UUID | string): boolean {
        const otherValue = other instanceof UUID ? other._value : other;
        return this._value.toLowerCase() === otherValue.toLowerCase();
    }
}
