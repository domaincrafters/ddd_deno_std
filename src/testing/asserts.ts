import { v4 } from '@std/uuid';
import { assert } from '@std/assert/assert';
import { UUID } from '@domaincrafters/std/mod.ts';

/**
 * Asserts that the provided UUID is valid.
 * @param uuid - The UUID string or Guid instance to validate.
 * @throws Error if the UUID is invalid.
 */
export function assertUUIDIsValid(uuid: string | UUID): void {
    const uuidString = uuid instanceof UUID ? uuid.toString() : uuid;
    assert(v4.validate(uuidString), `Invalid UUID: ${uuidString}`);
}
