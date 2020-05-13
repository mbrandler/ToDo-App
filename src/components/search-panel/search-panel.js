import React, { Component } from "react";
import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        inputValue: ''
    };

    onInputChange = (event) => {
        const inputValue = event.target.value;
        this.setState({ inputValue });
        this.props.onInputChange(inputValue);
    };

    render() {
        return (
            <input className="form-control search-input"
                   placeholder="type to search"
                   value={this.state.inputValue}
                   onChange={this.onInputChange}
            />
        );
    }
};

