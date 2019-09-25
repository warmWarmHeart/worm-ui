import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style/index.js';

class Canvas extends Component {
    state = {
        children: [],
        ctx: null,
    };
    static childContextTypes = {
        ctx: PropTypes.object,
    };
    getChildContext() {
        return {
            ctx: this.state.ctx,
        }
    };
    componentDidMount() {
        this.setState({
            children: this.props.children,
            ctx: ReactDOM.findDOMNode(this).getContext('2d'),
        })
    }

    render() {
        return (
            <canvas>
                {
                    this.state.children
                }
            </canvas>
        )
    }
}

class ContextComp extends Component {
    static ContextTypes = {
        ctx: PropTypes.object,
    }
}

/*矩形*/
Canvas.Rect = class Rect extends ContextComp {
    render() {
        const { ctx } = this.context;
        const {
            x,
            y,
            width,
            height,
        } = this.props;
        ctx.strokeRect(x, y, width, height);
        return null;
    }
};
/*形状*/
Canvas.Path = class Path extends ContextComp {
    render() {
        const { ctx } = this.context;
        const {
            x,
            y,
            width,
            height,
        } = this.props;
        ctx.beginPath();
        this.props.children.forEach((item) => {
            if(item.type === Point) {
                ctx.lineTo(item.props.x, item.props.y);
            }
            if(item.type === Arc) {
                const { props: { x, y, r, from, to } } = item;
                ctx.arc(x, y, r, from, to, false);
            }
        });
        ctx.closePath();
        ctx.stroke();
        return this.props.children;
    }
};
Canvas.Point = class Point extends ContextComp {
    render() {
        return null;
    }
};
Canvas.Arc = class Arc extends ContextComp {
    render() {
        return null;
    }
};

export default Canvas
