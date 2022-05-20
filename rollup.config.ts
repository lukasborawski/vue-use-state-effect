import pkg from './package.json'
import dts from 'rollup-plugin-dts'
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      uglify({
        mangle: false,
      }),
      typescript({
        // eslint-disable-next-line global-require
        typescript: require('typescript'),
      }),
    ],
  },
  {
    input: 'src/types.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]
