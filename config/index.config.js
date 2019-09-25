/*
    rollup build配置文件
*/
import postcss from 'rollup-plugin-postcss';
import clear from 'rollup-plugin-clear';
import builtins from 'rollup-plugin-node-builtins';
import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow'; // 此Rollup插件将在使用flow-remove-types捆绑期间删除Flow类型注释。
import scss from 'rollup-plugin-scss'


const createModuleConfig = {
    input: 'src/index.js',
    output: [
        {
            dir: 'es',
            format: 'es',
            sourceMap: true,
            entryFileNames: '[name]/index.js',
            exports: 'named'
        },
    ],
    context: 'window',
    plugins: [
        clear({
            targets: ['es', 'lib', 'garbage', 'dist']
        }),
        babel({
            exclude: 'node_modules/**', // 只编译源代码
            runtimeHelpers: true
        }),
        builtins(),
        postcss({
            modules: true, // 增加 css-module 功能
            extensions: ['.scss', '.css'],
            use: [
                ['sass', {
                    javascriptEnabled: true
                }]
            ],
            inject: false, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
            extract: true // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
        }),
        flow(),
    ],
    // 将模块视为外部模块，不会打包在库中
    external: ['antd-mobile'],
};

export default createModuleConfig;
