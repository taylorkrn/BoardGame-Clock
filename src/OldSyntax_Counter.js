import {Component} from 'react';
import './App.css';
// Or import all of React and use React.Component

class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
        this.add = this.add.bind(this);
        this.minus = this.minus.bind(this);
    }
    add(){
        this.setState({
            count: this.state.count + 1
        });
    }
    minus(){
        this.setState({
            count: this.state.count - 1
        });
    }


    render(){
        return (
            <div className="App">
                <p>{this.state.count}</p>
                <button onClick={this.minus}>-</button>
                <button onClick={this.add}>+</button>
            </div>
        );
    };
}

export default Counter;
