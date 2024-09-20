import { resolve } from 'path';
import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
    input: 'index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        resolvePlugin(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        json()
    ],
};
