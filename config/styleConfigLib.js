import postcss from 'rollup-plugin-postcss';
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const componentConfig = (moduleName, external, fileName) => ({
    input: `src/${fileName}/${moduleName}/index.js`,
    output: {
        file: `garbage/${moduleName}.js`,

        format: 'cjs',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**', // 只编译源代码
            runtimeHelpers: true
        }),
        resolve(),
        commonjs({ // 置于最前 ( 否则可能需要配置 namedExports 才能阻止保错 )
            namedExports: {
                'react': ['Component', 'createElement','PureComponent', 'cloneElement', 'Children'],
                'react-dom': ['findDOMNode',],
            },
        }),
        // css 处理，暂时没有加插件
        postcss({
            // modules: true, // 增加 css-module 功能
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
            // 样式输出到 createModuleConfig 创建的模块文件夹下
            extract: `lib/${moduleName}/style/index.css`
        }),
    ],
    external: id => external.some(e => id.indexOf(e) === 0),
});

export default componentConfig;
