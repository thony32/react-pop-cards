import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/lib/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    treeshake: true,
    minify: true
})
