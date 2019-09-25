import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style/index.js';

class Svg extends Component {
    static propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
        version: PropTypes.string,
        xmlns: PropTypes.string,
    };
    static defaultProps = {
        width: '100%',
        height: '100%',
        version: '1.1',
        xmlns: 'http//www.w3.org/2000/svg',
    };

    render() {
        const {children, ...otherProps} = this.props;
        return (
            <svg
                {...otherProps}
            >
                {
                    children
                }
            </svg>
        )
    }
}

class ContextComp extends Component {

}

/*圆*/
Svg.Circle = class Circle extends ContextComp {
    render() {
        return (
            <circle {...this.props}/>
        );
    }
};
/*椭圆*/
Svg.Ellipse = class Ellipse extends ContextComp {
    render() {
        return (
            <ellipse {...this.props}/>
        );
    }
};
/*线*/
Svg.Line = class Line extends ContextComp {
    get start() {
        return this.props.children[0].props;
    }

    get end() {
        return this.props.children[1].props;
    }

    render() {
        const {children, ...otherProps} = this.props;
        return (
            <line
                x1={this.start.x}
                y1={this.start.y}
                x2={this.end.x}
                y2={this.end.y}
                {...otherProps}
            >
                {children}
            </line>
        );
    }
};
/*多边形*/
Svg.PolyLine = class PolyLine extends ContextComp {
    get start() {
        return this.props.children[0].props;
    }

    get end() {
        return this.props.children[1].props;
    }

    render() {
        const {children, ...otherProps} = this.props;
        const points = this.props.children.map((item) => {
            return `${item.props.x},${item.props.y}`
        }).join(' ');
        return (
            <polyline
                points={points}
                {...otherProps}
            >
                {children}
            </polyline>
        );
    }
};
/*x点*/
Svg.Point = class Point extends ContextComp {
    render() {
        return null;
    }
};
/*x点*/
Svg.Text = class Text extends ContextComp {
    static defaultProps = {
        x: "250",
        y: "150",
        'font-family': "Verdana",
        'font-size': "55",
    };
    render() {
        const { children, ...otherProps } = this.props;
        const initProps = {
            ...otherProps,
        }
        return (
            <text
                {...initProps}
            >
                {
                    children
                }
            </text>
        );
    }
};
export default Svg
