import typescript from 'rollup-plugin-typescript2'
import ignore from 'rollup-plugin-ignore'
import { dts } from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      ignore(['demo/**']),
      terser({
        mangle: false,
      }),
      typescript(),
    ],
  },
  {
    input: 'src/types.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]
