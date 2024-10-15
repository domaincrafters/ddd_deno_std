/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * A container object which may or may not contain a non-null value.
 * If a value is present, `isPresent` will return `true` and `value` will return the value.
 * Additional methods that depend on the presence or absence of the contained value are provided,
 * such as `getOrElse` (return a default value if value not present) and `ifPresent` (execute a block of code if the value is present).
 *
 * @template T The type of the value.
 *
 * @example Usage
 * ```ts ignore
 * import { Optional } from './Optional.ts';
 *
 * // Creating an Optional with a value
 * const optionalWithValue = Optional.of('Hello, World!');
 * console.log(optionalWithValue.isPresent); // true
 * console.log(optionalWithValue.value); // 'Hello, World!'
 *
 * // Creating an Optional that may contain a value
 * const nullableValue: string | undefined = getNullableString();
 * const optionalNullable = Optional.ofNullable(nullableValue);
 * console.log(optionalNullable.isPresent); // Depends on getNullableString()
 *
 * // Creating an empty Optional
 * const emptyOptional = Optional.empty<string>();
 * console.log(emptyOptional.isPresent); // false
 *
 * // Using getOrElse to provide a default value
 * const result = emptyOptional.getOrElse('Default Value');
 * console.log(result); // 'Default Value'
 *
 * // Using ifPresent to execute a function if value is present
 * optionalWithValue.ifPresent(value => {
 *     console.log(`Value is present: ${value}`);
 * });
 *
 * // Mapping the value to another Optional
 * const mappedOptional = optionalWithValue.map(value => value.length);
 * console.log(mappedOptional.value); // 13
 *
 * // Flat mapping to another Optional
 * const flatMappedOptional = optionalWithValue.flatMap(value => Optional.of(value.toUpperCase()));
 * console.log(flatMappedOptional.value); // 'HELLO, WORLD!'
 *
 * // Filtering the Optional based on a predicate
 * const filteredOptional = optionalWithValue.filter(value => value.startsWith('Hello'));
 * console.log(filteredOptional.isPresent); // true
 *
 * // Using orElseThrow to throw an error if no value is present
 * try {
 *     const value = emptyOptional.orElseThrow(() => new Error('No value present'));
 * } catch (error) {
 *     console.error(error.message); // 'No value present'
 * }
 *
 * // Comparing two Optionals
 * const anotherOptional = Optional.of('Hello, World!');
 * console.log(optionalWithValue.equals(anotherOptional)); // true
 * ```
 */
export class Optional<T> {
    private readonly _value?: T;

    /**
     * Creates an Optional containing the provided value.
     *
     * @param {T} [value] - The value to be contained in the Optional.
     */
    public constructor(value?: T) {
        this._value = value;
    }

    /**
     * Returns an Optional describing the given non-null value.
     *
     * @template T
     * @param {T} value - The non-null value to describe.
     * @returns {Optional<T>} An Optional with the value present.
     * @throws {Error} If `value` is `undefined` or `null`.
     *
     * @example
     * const optional = Optional.of('Sample');
     * console.log(optional.isPresent); // true
     * console.log(optional.value); // 'Sample'
     */
    public static of<T>(
        this: new (value: T) => Optional<T>,
        value: T,
    ): Optional<T> {
        if (value === undefined || value === null) {
            throw new Error('Cannot create Optional.of with undefined or null');
        }
        return new this(value);
    }

    /**
     * Returns an Optional describing the given value, or an empty Optional if the value is `null` or `undefined`.
     *
     * @template T
     * @param {T} [value] - The value to describe.
     * @returns {Optional<T>} An Optional with a value present if `value` is not `null` or `undefined`, otherwise an empty Optional.
     *
     * @example
     * const optional = Optional.ofNullable(null);
     * console.log(optional.isPresent); // false
     */
    public static ofNullable<T>(
        this: new (value?: T) => Optional<T>,
        value?: T,
    ): Optional<T> {
        return new this(value);
    }

    /**
     * Returns an empty Optional instance. No value is present for this Optional.
     *
     * @template T
     * @returns {Optional<T>} An empty Optional.
     *
     * @example
     * const empty = Optional.empty<number>();
     * console.log(empty.isPresent); // false
     */
    public static empty<T>(this: new () => Optional<T>): Optional<T> {
        return new this();
    }

    /**
     * If a value is present, returns the value, otherwise throws an Error.
     *
     * @returns {T} The non-null value held by this Optional.
     * @throws {Error} If there is no value present.
     *
     * @example
     * const optional = Optional.of('Test');
     * console.log(optional.value); // 'Test'
     */
    public get value(): T {
        if (this._value === undefined) {
            throw new Error('Value is not present');
        }
        return this._value;
    }

    /**
     * Returns `true` if there is a value present, otherwise `false`.
     *
     * @returns {boolean} `true` if a value is present, otherwise `false`.
     *
     * @example
     * const optional = Optional.ofNullable(undefined);
     * console.log(optional.isPresent); // false
     */
    public get isPresent(): boolean {
        return this._value !== undefined;
    }

    /**
     * Returns the value if present, otherwise returns `defaultValue`.
     *
     * @param {T} defaultValue - The value to return if there is no value present.
     * @returns {T} The value, if present, otherwise `defaultValue`.
     *
     * @example
     * const optional = Optional.empty<string>();
     * const value = optional.getOrElse('Default');
     * console.log(value); // 'Default'
     */
    public getOrElse(defaultValue: T): T {
        return this._value ?? defaultValue;
    }

    /**
     * If a value is present, apply the provided mapping function to it,
     * and if the result is non-null, return an Optional describing the result.
     * Otherwise return an empty Optional.
     *
     * @template U
     * @param {(value: T) => U | null | undefined} mapper - A mapping function to apply to the value, if present.
     * @returns {Optional<U>} An Optional describing the result of applying a mapping function to the value of this Optional, if a value is present, otherwise an empty Optional.
     *
     * @example
     * const optional = Optional.of(5);
     * const mapped = optional.map(value => value * 2);
     * console.log(mapped.value); // 10
     */
    public map<U>(mapper: (value: T) => U | null | undefined): Optional<U> {
        if (this._value === undefined) {
            return Optional.empty<U>();
        }
        const result = mapper(this._value);
        return result === undefined || result === null
            ? Optional.empty<U>()
            : Optional.of<U>(result as NonNullable<U>);
    }

    /**
     * If a value is present, apply the provided Optional-bearing mapping function to it,
     * return that result, otherwise return an empty Optional.
     *
     * @template U
     * @param {(value: T) => Optional<U> | null | undefined} mapper - A mapping function to apply to the value, if present.
     * @returns {Optional<U>} The result of applying an Optional-bearing mapping function to the value of this Optional, if a value is present, otherwise an empty Optional.
     *
     * @example
     * const optional = Optional.of('hello');
     * const flatMapped = optional.flatMap(value => Optional.of(value.toUpperCase()));
     * console.log(flatMapped.value); // 'HELLO'
     */
    public flatMap<U>(
        mapper: (value: T) => Optional<U> | null | undefined,
    ): Optional<U> {
        if (this._value === undefined) {
            return Optional.empty<U>();
        }
        const result = mapper(this._value);
        return result ?? Optional.empty<U>();
    }

    /**
     * If a value is present and matches the given predicate, return this Optional; otherwise, return an empty Optional.
     *
     * @param {(value: T) => boolean} predicate - A predicate to apply to the value, if present.
     * @returns {Optional<T>} This Optional if the value matches the predicate, otherwise an empty Optional.
     *
     * @example
     * const optional = Optional.of(10);
     * const filtered = optional.filter(value => value > 5);
     * console.log(filtered.isPresent); // true
     */
    public filter(predicate: (value: T) => boolean): Optional<T> {
        if (this._value === undefined) {
            return this;
        }
        return predicate(this._value) ? this : Optional.empty<T>();
    }

    /**
     * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
     *
     * @param {(value: T) => void} consumer - The action to be performed if a value is present.
     *
     * @example
     * const optional = Optional.of('Execute this');
     * optional.ifPresent(value => {
     *     console.log(value); // 'Execute this'
     * });
     */
    public ifPresent(consumer: (value: T) => void): void {
        if (this._value !== undefined) {
            consumer(this._value);
        }
    }

    /**
     * Returns the contained value if present, otherwise throws an exception provided by the exception supplier.
     *
     * @param {() => Error} errorSupplier - The function which returns the exception to be thrown.
     * @returns {T} The value, if present.
     * @throws {Error} If there is no value present.
     *
     * @example
     * const optional = Optional.empty<number>();
     * try {
     *     const value = optional.orElseThrow(() => new Error('No value present'));
     * } catch (error) {
     *     console.error(error.message); // 'No value present'
     * }
     */
    public orElseThrow(errorSupplier: () => Error): T {
        if (this._value !== undefined) {
            return this._value;
        }
        throw errorSupplier();
    }

    /**
     * Indicates whether some other Optional is "equal to" this Optional.
     * The other Optional is considered equal if both are empty or if the contained values are equal.
     *
     * @param {Optional<T>} other - The other Optional to compare with.
     * @returns {boolean} `true` if the other Optional is equal to this Optional, otherwise `false`.
     *
     * @example
     * const optional1 = Optional.of('test');
     * const optional2 = Optional.of('test');
     * console.log(optional1.equals(optional2)); // true
     */
    public equals(other: Optional<T>): boolean {
        if (this._value === other._value) {
            return true;
        }
        return false;
    }

    /**
     * Returns a string representation of this Optional suitable for debugging.
     *
     * @returns {string} A string representation of this Optional.
     *
     * @example
     * const optional = Optional.of('debug');
     * console.log(optional.toString()); // 'Optional(debug)'
     * const empty = Optional.empty();
     * console.log(empty.toString()); // 'Optional.empty'
     */
    public toString(): string {
        return this._value !== undefined ? `Optional(${this._value})` : 'Optional.empty';
    }
}
