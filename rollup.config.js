import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: './src/index.js',
    inlineDynamicImports: true,
    output: {
        file: './dist/bundle.js',
        format: 'iife',
        name: 'bundle',
    },
    plugins: [
        babel({
            //exclude: 'node_modules/**'
            include: 'node_modules/complex-engine'
        }),
        resolve({
            browser: true,
        }),
    ]
}
