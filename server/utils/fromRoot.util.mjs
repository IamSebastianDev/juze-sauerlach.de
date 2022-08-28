/** @format */

import { resolve } from 'node:path';

export const fromRoot = (...fragments) => resolve(process.cwd(), ...fragments);
