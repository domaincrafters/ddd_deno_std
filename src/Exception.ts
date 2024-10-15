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
 *
 * @example Usage
 * ```ts ignore
 * // Creating a custom exception by extending the abstract Exception class
 * class CustomException extends Exception {
 *     constructor(message: string) {
 *         super(message);
 *     }
 * }
 *
 * // Throwing and catching the custom exception
 * try {
 *     throw new CustomException('This is a custom exception.');
 * } catch (error) {
 *     if (error instanceof CustomException) {
 *         console.error(error.message); // 'This is a custom exception.'
 *     }
 * }
 * ```
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
 *
 * @example Usage
 * ```ts ignore
 * import { DomainException } from './Exception.ts';
 *
 * // Throwing and catching a DomainException
 * try {
 *     throw new DomainException('A domain-specific error occurred.');
 * } catch (error) {
 *     if (error instanceof DomainException) {
 *         console.error(error.message); // 'A domain-specific error occurred.'
 *     }
 * }
 * ```
 */
export class DomainException extends Exception {}

/**
 * Represents illegal state exceptions.
 *
 * @class IllegalStateException
 * @extends Exception
 *
 * @example Usage
 * ```ts ignore
 * import { IllegalStateException } from './Exception.ts';
 *
 * // Throwing and catching an IllegalStateException
 * try {
 *     throw new IllegalStateException('The system is in an illegal state.');
 * } catch (error) {
 *     if (error instanceof IllegalStateException) {
 *         console.error(error.message); // 'The system is in an illegal state.'
 *     }
 * }
 * ```
 */
export class IllegalStateException extends Exception {}

/**
 * Represents not found exceptions.
 *
 * @class NotFoundException
 * @extends Exception
 *
 * @example Usage
 * ```ts ignore
 * import { NotFoundException } from './Exception.ts';
 *
 * // Throwing and catching a NotFoundException
 * try {
 *     throw new NotFoundException('The requested resource was not found.');
 * } catch (error) {
 *     if (error instanceof NotFoundException) {
 *         console.error(error.message); // 'The requested resource was not found.'
 *     }
 * }
 * ```
 */
export class NotFoundException extends Exception {}

/**
 * Represents illegal argument exceptions.
 *
 * @class IllegalArgumentException
 * @extends Exception
 *
 * @example Usage
 * ```ts ignore
 * import { IllegalArgumentException } from './Exception.ts';
 *
 * // Throwing and catching an IllegalArgumentException
 * try {
 *     throw new IllegalArgumentException('An illegal argument was provided.');
 * } catch (error) {
 *     if (error instanceof IllegalArgumentException) {
 *         console.error(error.message); // 'An illegal argument was provided.'
 *     }
 * }
 * ```
 */
export class IllegalArgumentException extends Exception {}
