/** @format */

import 'dotenv/config';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-import-css';

export default [
    {
        input: './site/src/frontend/index.mjs',
        output: {
            file: './site/public/dist/frontend.bundle.mjs',
            format: 'esm',
            sourcemap: true,
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            cleanup(),
            css({ output: 'components.frontend.css', alwaysOutput: true }),
            process.env.NODE_ENV === 'production' && terser(),
        ],
    },
    {
        input: './site/src/dashboard/index.mjs',
        output: {
            file: './site/public/dist/dashboard.bundle.mjs',
            format: 'esm',
            sourcemap: true,
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            cleanup(),
            css({ output: 'components.dashboard.css', alwaysOutput: true }),
            process.env.NODE_ENV === 'production' && terser(),
        ],
    },
];
