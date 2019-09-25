// 通过 mode 接口拿到 src/components 下的所有文件夹名作为打包后的模块
const fs = require('fs');
const path = require('path');
const componentDir = 'src/components';
const containerDir = 'src/container';
const componentModuleNames = fs.readdirSync(path.resolve(componentDir));
const containerModuleNames = fs.readdirSync(path.resolve(containerDir));

const componentModuleMap = componentModuleNames.reduce((prev, name) => {
    try {
        fs.statSync(path.resolve(`${componentDir}/${name}/index.js`));
        prev[name] = `${componentDir}/${name}/index.js`;
    } catch (err) {
        // console.error('无权访问');
    }
    return prev;
}, {});
const componentStyleJsMap = componentModuleNames.reduce((prev, name) => {
    try {
        fs.statSync(path.resolve(`${componentDir}/${name}/style/index.js`));
        prev[name] = `${componentDir}/${name}/style/index.js`;
    } catch (err) {
        // console.error('无权访问');
    }
    return prev;
}, {});

const containerModuleMap = containerModuleNames.reduce((prev, name) => {
    try {
        fs.statSync(path.resolve(`${containerDir}/${name}/index.js`));
        prev[name] = `${containerDir}/${name}/index.js`;
    } catch (err) {
        // console.error('无权访问');
    }
    return prev;
}, {});
const containerStyleJsMap = containerModuleNames.reduce((prev, name) => {
    try {
        fs.statSync(path.resolve(`${containerDir}/${name}/style/index.js`));
        prev[name] = `${containerDir}/${name}/style/index.js`;
    } catch (err) {
        // console.error('无权访问');
    }
    return prev;
}, {});

export default {
    cModuleMap: componentModuleMap,
    cStyleJsMap: componentStyleJsMap,
    containerModuleMap,
    containerStyleJsMap,
};
