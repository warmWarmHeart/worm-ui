import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Loading extends Component {
    render() {
        const { classname, style, content, ...other } = Loading.defaultConfig;
        return (<div className={`loading-container ${classname}`} style={style} {...other}>
            {
                content
            }
        </div>);

    };
}
Loading.defaultConfig = {
    content: ('loading'),
    style: {},
    classname: '',
};
Loading.node = null;
Loading.loadingNum = 0;
Loading.show = () => {
    // 通过loadingNum控制loading组件的显示和node是否要添加到body中 避免重复添加
    if (!Loading.loadingNum) {
        Loading.node = document.createElement('div');
        document.body.appendChild(Loading.node);
        ReactDOM.render(<Loading/>, Loading.node)
    }
    Loading.loadingNum++;
};
Loading.config = (config) => {
    Loading.defaultConfig = {
        ...Loading.defaultConfig,
        ...config,
    }
};
Loading.hide = () => {
    if (Loading.loadingNum) return;
    Loading.loadingNum--;
    if (Loading.node && !Loading.loadingNum) {
        ReactDOM.unmountComponentAtNode(Loading.node);
        document.body.removeChild(Loading.node);
    }
};
export default Loading;
