import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: './libs/index.ts',
    output: {
      file: './dist/index.js',
      format: 'cjs',
    },
  
    plugins: [
      typescript(),
      commonjs(),
    ]
}