/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * Abstract std class for custom exceptions.
 * Extends the built-in {@link Error} class.
 *
 * @abstract
 * @class Exception
 * @extends Error
 */
export abstract class Exception extends Error {
    /**
     * Creates an instance of {@link Exception}.
     *
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

/**
 * Represents domain-specific exceptions.
 *
 * @class DomainException
 * @extends Exception
 */
export class DomainException extends Exception {}

/**
 * Represents illegal state exceptions.
 *
 * @class IllegalStateException
 * @extends Exception
 */
export class IllegalStateException extends Exception {}

/**
 * Represents not found exceptions.
 *
 * @class NotFoundException
 * @extends Exception
 */
export class NotFoundException extends Exception {}

/**
 * Represents illegal argument exceptions.
 *
 * @class IllegalArgumentException
 * @extends Exception
 */
export class IllegalArgumentException extends Exception {}
