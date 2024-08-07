// rollup.config.js
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.ts', // Entry point of your library
  output: {
    file: 'dist/index.js',
    format: 'cjs', // CommonJS format
    sourcemap: true,
  },
  external: ['react', 'react-dom'],
  plugins: [
    postcss({
      modules: true, // Enable CSS Modules
      extensions: ['.scss'], // Process SCSS files
      use: ['sass'], // Use the sass compiler
      extract: true, // Extract CSS to a separate file
      minimize: true, // Minify the CSS
      plugins: [
        autoprefixer(), // Add vendor prefixes
      ],
    }),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
  ],
};
