import { readdirSync } from 'fs';
import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const CODES = [
  'THIS_IS_UNDEFINED',
  'MISSING_GLOBAL_NAME',
  'CIRCULAR_DEPENDENCY',
];

const getChunks = (URI, prefix = '') =>
  readdirSync(path.resolve(URI))
    .filter(x => x.includes('.ts'))
    .reduce((a, c) => ({ ...a, [c.replace(/.tsx?/, prefix)]: `src/${c}` }), {});

const discardWarning = warning => {
  if (CODES.includes(warning.code)) {
    return;
  }

  console.error(warning);
};

const env = process.env.NODE_ENV;

const commonPlugins = () => [
  resolve({
    browser: true,
    extensions: EXTENSIONS,
    preferBuiltins: false,
  }),
  external({
    includeDependencies: true,
  }),
  typescript(),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    extensions: EXTENSIONS,
    exclude: 'node_modules/**',
    babelHelpers: 'bundled'
  }),
  commonjs({
    include: /node_modules/,
  }),
  replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
];

export default [
  {
    onwarn: discardWarning,
    input: getChunks('src', '.es'),
    output: [
      { dir: 'build', format: 'esm', sourcemap: true }
    ],
    plugins: commonPlugins(),
  },
  {
    onwarn: discardWarning,
    input: getChunks('src'),
    output: [
      { dir: 'build', format: 'cjs', exports: 'named', sourcemap: true },
    ],
    plugins: commonPlugins(),
  },
];