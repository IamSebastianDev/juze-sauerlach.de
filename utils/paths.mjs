/** @format */

// META!
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export { __dirname };

const _getPath = (pathFrag) => path.join(__dirname + pathFrag);

export { _getPath };
