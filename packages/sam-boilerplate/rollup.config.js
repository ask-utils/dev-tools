import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: './libs/index.ts',
    output: {
      file: './dist/index.js',
      format: 'cjs',
    },
  
    plugins: [
      nodeResolve({ jsnext: true }),
      typescript(),
      commonjs(),
    ]
}