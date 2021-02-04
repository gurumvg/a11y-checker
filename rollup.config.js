import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'build/a11y-checker.js',
      name: 'A11yChecker',
      format: 'iife'
    },
    {
      file: 'build/a11y-checker.min.js',
      format: 'iife',
      name: 'A11yChecker',
      plugins: [terser()]
    }
  ],
  sourceMap: 'inline',
  plugins: [nodeResolve(), commonjs()]
};