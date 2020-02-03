import React, {Component} from 'react';
import Combatant from "./Combatant";
import Moves from "./Moves";
import Feedback from "./Feedback";

export default class Combat extends Component {
    constructor(props) {
        super(props);
        this.state = {data: {}};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch('/combat/100')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({data: json});
            });
    }

    handleClick(index, e) {
        // if this breaks it's probably because we didn't clone state before resetting
        this.setState((state) => {
            state.data.feedback = null;
            return state;
        });

        fetch('/combat/100/move/' + index)
            .then(response => {
                return response.json()
            })
            .then(json => {
                this.setState({data: json})
            });
    }

    render() {
        if (typeof this.state.data.combatantOne == 'object') {
            return (
                <div>
                    <hr/>
                    <div className="columns">
                        <div className="column">
                            <Combatant combatant={this.state.data.combatantOne} color='warning'/>
                        </div>
                        <div className="column">
                            <Combatant combatant={this.state.data.combatantTwo} color='danger'/>
                        </div>
                    </div>
                    <hr/>
                    <div className="columns">
                        <div className="column"/>
                        <div className="column is-three-fifths">
                            <Moves moves={this.state.data.combatantOne.moves} handleClick={this.handleClick}/>
                        </div>
                        <div className="column"/>
                    </div>
                    <div className="columns">
                        <div className="column">
                            {this.state.data.feedback &&
                                <Feedback feedback={this.state.data.feedback}/>
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}
