/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { type Exception, IllegalArgumentException } from '@domaincrafters/std/mod.ts';

/**
 * A utility class for guarding against invalid values.
 * Provides methods to validate values and throw exceptions if validations fail.
 *
 * @template T The type of the value to guard.
 */
export class Guard<T> {
    /**
     * The value to guard.
     * @private
     * @readonly
     * @type {T}
     */
    private readonly value: T;

    /**
     * The name of the parameter being guarded.
     * @private
     * @readonly
     * @type {string}
     */
    private readonly parameterName: string;

    /**
     * The type of exception to throw when validation fails.
     * @private
     * @readonly
     * @type {new (message: string) => Exception}
     */
    private readonly exceptionType: new (message: string) => Exception;

    /**
     * Creates an instance of Guard.
     *
     * @param {T} value The value to guard.
     * @param {string} parameterName The name of the parameter.
     * @param {new (message: string) => Exception} [exceptionType] The type of exception to throw if validation fails.
     */
    constructor(
        value: T,
        parameterName: string,
        exceptionType?: new (message: string) => Exception,
    ) {
        this.value = value;
        this.parameterName = parameterName;
        this.exceptionType = exceptionType || IllegalArgumentException;
    }

    /**
     * Creates a new Guard instance for the provided value.
     *
     * @static
     * @param {T} value The value to guard.
     * @param {string} [parameterName='value'] The name of the parameter.
     * @param {new (message: string) => Exception} [exceptionType] The type of exception to throw if validation fails.
     * @returns {Guard<T>} A new Guard instance.
     */
    static check<T>(
        value: T,
        parameterName?: string,
        exceptionType?: new (message: string) => Exception,
    ): Guard<T> {
        return new Guard<T>(value, parameterName || 'value', exceptionType);
    }

    /**
     * Throws an exception of the specified type with the given message.
     *
     * @private
     * @param {string} message The message for the exception.
     * @throws {Exception} The exception with the provided message.
     * @returns {never}
     */
    private throwException(message: string): never {
        throw new this.exceptionType(`${message} Actual value: ${JSON.stringify(this.value)}.`);
    }

    /**
     * Validates that the value is not null or undefined.
     *
     * @param {string} [message] Custom error message.
     * @returns {this}
     * @throws {Exception} If the value is null or undefined.
     */
    public againstNullOrUndefined(message?: string): this {
        if (this.value === null || this.value === undefined) {
            this.throwException(message || `${this.parameterName} cannot be null or undefined.`);
        }
        return this;
    }

    /**
     * Validates that the value is a non-whitespace string.
     *
     * @param {string} [message] Custom error message.
     * @returns {this}
     * @throws {Exception} If the value is null, undefined, not a string, or consists only of whitespace.
     */
    public againstWhitespace(message?: string): this {
        this.againstNullOrUndefined(message);
        if (typeof this.value !== 'string') {
            this.throwException(message || `${this.parameterName} must be a string.`);
        }
        if (this.value.trim().length === 0) {
            this.throwException(message || `${this.parameterName} cannot be empty or whitespace.`);
        }
        return this;
    }

    /**
     * Validates that the value is not empty.
     * Works for strings, arrays, and objects with a length property.
     *
     * @param {string} [message] Custom error message.
     * @returns {this}
     * @throws {Exception} If the value is null, undefined, or empty.
     */
    public againstEmpty(message?: string): this {
        this.againstNullOrUndefined(message);
        if (
            !(
                typeof this.value === 'string' ||
                Array.isArray(this.value) ||
                (this.value &&
                    typeof (this.value as unknown as { length: number }).length === 'number')
            )
        ) {
            this.throwException(
                message ||
                    `${this.parameterName} must be a string, array, or have a length property to check for empty.`,
            );
        }
        if ((this.value as unknown as { length: number }).length === 0) {
            this.throwException(message || `${this.parameterName} cannot be empty.`);
        }
        return this;
    }

    /**
     * Validates that the value is not a negative number.
     *
     * @param {string} [message] Custom error message.
     * @returns {this}
     * @throws {Exception} If the value is null, undefined, not a valid number, or negative.
     */
    public againstNegative(message?: string): this {
        this.againstNullOrUndefined(message);
        if (typeof this.value !== 'number' || Number.isNaN(this.value)) {
            this.throwException(message || `${this.parameterName} must be a valid number.`);
        }
        if (this.value < 0) {
            this.throwException(message || `${this.parameterName} cannot be negative.`);
        }
        return this;
    }

    /**
     * Validates that the value is not zero.
     *
     * @param {string} [message] Custom error message.
     * @returns {this}
     * @throws {Exception} If the value is null, undefined, not a valid number, or zero.
     */
    public againstZero(message?: string): this {
        this.againstNullOrUndefined(message);
        if (typeof this.value !== 'number' || Number.isNaN(this.value)) {
            this.throwException(message || `${this.parameterName} must be a valid number.`);
        }
        if (this.value === 0) {
            this.throwException(message || `${this.parameterName} cannot be zero.`);
        }
        return this;
    }

    /**
     * Validates that the value is within the specified range.
     *
     * @param {number} min The minimum allowed value.
     * @param {number} max The maximum allowed value.
     * @param {string} [message] Custom error message.
     * @returns {this}
     * @throws {Exception} If the value is null, undefined, not a valid number, or outside the specified range.
     */
    public isInRange(min: number, max: number, message?: string): this {
        this.againstNullOrUndefined(message);
        if (typeof this.value !== 'number' || Number.isNaN(this.value)) {
            this.throwException(message || `${this.parameterName} must be a valid number.`);
        }
        if (this.value < min || this.value > max) {
            this.throwException(
                message || `${this.parameterName} must be between ${min} and ${max}.`,
            );
        }
        return this;
    }

    /**
     * Validates that the string value matches the specified regular expression.
     *
     * @param {RegExp} regex The regular expression to test against.
     * @param {string} [message] Custom error message.
     * @returns {this}
     * @throws {Exception} If the value is null, undefined, not a string, or does not match the regex.
     */
    public matches(regex: RegExp, message?: string): this {
        this.againstNullOrUndefined(message);
        if (typeof this.value !== 'string') {
            this.throwException(message || `${this.parameterName} must be a string.`);
        }
        if (!regex.test(this.value)) {
            this.throwException(
                message || `${this.parameterName} does not match the required pattern.`,
            );
        }
        return this;
    }

    /**
     * Validates that the value is of the specified type.
     *
     * @param {'string' | 'number' | 'boolean' | 'object' | 'function' | 'symbol' | 'undefined' | 'bigint'} type The expected type.
     * @param {string} [message] Custom error message.
     * @returns {this}
     * @throws {Exception} If the value is not of the specified type.
     */
    public isType(
        type:
            | 'string'
            | 'number'
            | 'boolean'
            | 'object'
            | 'function'
            | 'symbol'
            | 'undefined'
            | 'bigint',
        message?: string,
    ): this {
        // The types in the type union are all valid JavaScript types.
        // deno-lint-ignore valid-typeof
        if (typeof this.value !== type) {
            this.throwException(message || `${this.parameterName} must be of type ${type}.`);
        }
        return this;
    }
}
