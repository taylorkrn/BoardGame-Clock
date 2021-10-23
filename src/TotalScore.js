import {Component} from 'react';
import Counter from './Counter';

class TotalScore extends Component{
    constructor(props){
        super(props);

        this.state={
            behinds: props.Behinds,
            goals: props.Goals
        };
    };

    increaseBehinds = () => {
        this.setState({
            behinds: this.state.behinds + 1
        });
    }
    decreaseBehinds = () => {
        this.setState({
            behinds: this.state.behinds - 1
        });
    }
    increaseGoals = () => {
        this.setState({
            goals: this.state.goals + 1
        });
    }
    decreaseGoals = () => {
        this.setState({
            goals: this.state.goals - 1
        });
    }

    render(){
        return(
            <div className="Count-Flex">
                <Counter
                    count = {this.state.goals}
                    increase = {this.increaseGoals}
                    decrease = {this.decreaseGoals}
                />
                <Counter
                    count = {this.state.behinds}
                    increase = {this.increaseBehinds}
                    decrease = {this.decreaseBehinds}
                />
                <p>{this.state.behinds + this.state.goals * 6}</p>
            </div>
        );
    }
}

export default TotalScore;
