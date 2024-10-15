/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { v4 } from '@std/uuid';
import { assert } from '@std/assert/assert';
import { UUID } from '@domaincrafters/std/mod.ts';

/**
 * Asserts that the provided UUID is valid.
 *
 * This function validates whether the given UUID string or {@link UUID} instance conforms to the standard UUID format.
 * If the UUID is invalid, it throws an {@link Error} with a descriptive message.
 *
 * @param uuid - The UUID string or {@link UUID} instance to validate.
 * @throws {Error} If the UUID is invalid.
 *
 * @example Usage
 * ```ts ignore
 * import { assertUUIDIsValid, UUID } from './UUID.ts';
 *
 * // Example 1: Valid UUID string
 * const validUuidStr = '550e8400-e29b-41d4-a716-446655440000';
 * assertUUIDIsValid(validUuidStr); // No error thrown
 * console.log('Valid UUID string passed validation.');
 *
 * // Example 2: Valid UUID instance
 * const uuidInstance = UUID.create();
 * assertUUIDIsValid(uuidInstance); // No error thrown
 * console.log('Valid UUID instance passed validation.');
 * ```
 */
export function assertUUIDIsValid(uuid: string | UUID): void {
    const uuidString = uuid instanceof UUID ? uuid.toString() : uuid;
    assert(v4.validate(uuidString), `Invalid UUID: ${uuidString}`);
}
