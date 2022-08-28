/** @format */

import { wrapAsyncSafely } from './wrapAsyncSafely.util.mjs';
import bcrypt from 'bcrypt';

/**
 * Utility function to hash a password string safely.
 *
 * @param { string } password - the plaintext password to hash.
 * @returns { Promise<string> } A Promise containing the hashed string.
 *
 * @example
 * ```js
 * const hashed = await hashPassword('password');
 * // returns the hashed password
 * ```
 */

export const hashPassword = async (password) => {
    const { result, error } = await wrapAsyncSafely(async () => await bcrypt.hash(password, 10));

    if (error) throw error;
    return result;
};

/**
 * Method to compare a plaintext password with a stored hash. Will return a Promise containing true
 * if the hash matches and false if they do not.
 *
 * @param { string } posted - the plaintext string to compare against the hashed string.
 * @param { string } stored - the stored, hashed string.
 * @returns { Promise<boolean> } A Promise containing a boolean indicating the result of the comparison.
 *
 * @example
 * ```js
 * const matched = await comparePassword('plaintextPassword', hashedPassword)
 * if(matched) {
 *  // do something
 * }
 * ```
 */

export const comparePassword = async (posted, stored) => {
    const { result, error } = await wrapAsyncSafely(async () => await bcrypt.compare(posted, stored));

    if (error) throw error;
    return result;
};

export const assertHash = (string) => string.length === 60 && string.startsWith('$2b$');
