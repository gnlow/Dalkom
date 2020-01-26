import React, {Component} from "react";
import ReactDOM from "react-dom"

class Block extends Component<
    {
        content: string;
    }
> {
    //text: SVGTextElement;
    textRef: React.RefObject<SVGTextElement>;
    state;
    constructor(props){
        super(props);
        this.textRef = React.createRef();
        this.state = {
            textWidth: 40
        }
    }
    componentDidMount() {
        this.setState({
            textWidth: this.textRef.current?.getBBox().width || 40
        });
    }
    render(){
        const text = <text x="7" y="6.5" style={{fontSize: "5px", fill: "white"}} ref={this.textRef}>
            {this.props.content}
        </text>;
        const blockPath = `M 0 0 
        l 5 5 
        v -3 
        a 2 2 90 0 1 2 -2
        h ${this.state.textWidth - 2}
        a 5 5 180 0 1 0 10 
        h ${-this.state.textWidth + 2} 
        a 2 2 90 0 0 -2 2
        v 4 
        l -5 -5
        z`;        
        return <g transform="translate(200, 100) scale(5)">
            <path d={blockPath} fill="black" />
            {text}
        </g>;
    }
    
}
var element = <Block content="콘솔에 (text) 찍기"/>;
ReactDOM.render(
    element,
    document.getElementById("editor")
);