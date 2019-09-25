import postcss from 'rollup-plugin-postcss';
import babel from "rollup-plugin-babel";

const componentConfig = (moduleName) => ({
    input: `src/components/${moduleName}/index.js`,
    output: {
        file: `es/${moduleName}/index.js`,

        format: 'es',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**', // 只编译源代码
            runtimeHelpers: true
        }),
        // css 处理，暂时没有加插件
        postcss({
            modules: true, // 增加 css-module 功能
            extensions: ['.scss', '.css'],
            use: [
                ['sass', {
                    javascriptEnabled: true
                }]
            ],
            // 样式输出到 createModuleConfig 创建的模块文件夹下
            extract: `es/${moduleName}/index.css`
        }),
    ],
    external: ['antd-mobile'],
});

export default componentConfig;
