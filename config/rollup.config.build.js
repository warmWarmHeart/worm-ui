/*
    rollup 配置文件
*/
import pkg from '../package.json';
import styleConfig from './styleConfig';
import styleConfigLib from './styleConfigLib';
import map from './obtainComponentsName';
import createModuleConfig from "./moduleConfig";
import createStyleJsConfig from "./styleJsConfig";

const { cModuleMap, cStyleJsMap, containerModuleMap, containerStyleJsMap } = map;
const external = Object.keys(pkg.dependencies);
const rollupBuildConfig = [
    createModuleConfig({...cModuleMap, ...containerModuleMap}, external),
    createStyleJsConfig({...cStyleJsMap, ...containerStyleJsMap}, external),
].concat(
    Object.keys(cModuleMap).map(moduleName => styleConfig(moduleName, external, 'components')),
    Object.keys(containerModuleMap).map(moduleName => styleConfig(moduleName, external, 'container')),
    Object.keys(cModuleMap).map(moduleName => styleConfigLib(moduleName, external,  'components')),
    Object.keys(containerStyleJsMap).map(moduleName => styleConfigLib(moduleName, external,  'container')),
);

export default rollupBuildConfig;
