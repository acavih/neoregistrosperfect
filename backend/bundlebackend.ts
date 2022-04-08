import { buildSync } from 'esbuild'

buildSync({
  entryPoints: ['./src/server.ts'],
  outfile: './buildback.js',
  minify: true,
  bundle: true,
  external: ['node_modules'],
  target: 'node12',
  platform: 'node'
})

console.log('bundled')
