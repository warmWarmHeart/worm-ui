#Loading加载组件

## 代码演示
```
    import { Loading } from 'car-mobile';
    const { show, hide } = Loading;
    
    componentDidMount() {
        show();
        setTimeout(() => {
            hide();
        }, 3000)
    }
```

## API

### 方法说明

| 方法 | 说明 | 参数说明 | 返回值 |
|------|------|------|------|
| show | 显示加载组件 |  | - |
| hide | 隐藏加载组件 | | - |
| config | 配置加载内容 | `object` | - |

####config方法具体说明
```
    import { Loading } from 'car-mobile';
    const { config } = Loading;
    config({
        content: (<div>loading</div>), // loading组件显示内容自定义
        // 样式自定义
        style: {
            color: 'red',
        },
        // 样式类自定义
        classname: 'self-classname'
    });
```
