/*
    rollup 开发环境配置文件
*/
import resolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload';
import builtins from 'rollup-plugin-node-builtins';
import babel from "rollup-plugin-babel";

const servePlugin = [
    serve({
        open: true, // 是否打开浏览器
        contentBase: './', // 入口HTML 文件位置
        historyApiFallback: true, // Set to true to return index.html instead of 404
        host: 'localhost',
        port: 9999,
    }),
    livereload(),
]

export default {
    input: 'demo/index.js',
    output: {
        file: 'dist/index.js',
        format: 'iife',
        globals: {
            'react': '_react', //(!) Missing global variable names
            'react-dom': 'ReactDom',
            'rmc-steps': 'RcSteps',
        },
        sourcemap: true
    },
    context: 'window',
    moduleContext: 'window',
    plugins: [
        babel({
            exclude: 'node_modules/**', // 只编译源代码
            runtimeHelpers: true
        }),
        resolve({
            browser: true,
            main: true
        }),
        cjs({
            namedExports: {
                'react-is': [ 'isValidElementType' ],
                'react': ['Component', 'createElement','PureComponent', 'cloneElement', 'Children', 'isValidElement'],
                'react-dom': ['findDOMNode','unmountComponentAtNode','createPortal','unstable_renderSubtreeIntoContainer','render', ],
                'prop-types': ['object','any','bool','string','number','array', 'oneOf', 'func','oneOfType',],
                'rmc-steps': ['RcSteps',],
            },
        }),
        postcss({
            extensions: ['scss', '.less', '.css'],
            use: [
                [
                    'sass',
                    'less',
                    {
                        javascriptEnabled: true
                    },
                ]
            ],
        }),
        globals(), //Uncaught ReferenceError: process is not defined

        ...servePlugin,
    ],
}
