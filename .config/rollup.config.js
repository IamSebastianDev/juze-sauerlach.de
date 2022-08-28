/** @format */

import 'dotenv/config';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: './site/src/frontend/index.mjs',
        output: {
            file: './site/public/scripts/dist/frontend.bundle.mjs',
            format: 'esm',
        },
        plugins: [nodeResolve(), commonjs(), cleanup(), process.env.NODE_ENV === 'production' && terser()],
    },
    {
        input: './site/src/dashboard/index.mjs',
        output: {
            file: './site/public/scripts/dist/dashboard.bundle.mjs',
            format: 'esm',
        },
        plugins: [nodeResolve(), commonjs(), cleanup(), process.env.NODE_ENV === 'production' && terser()],
    },
];