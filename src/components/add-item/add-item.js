import React, { Component } from "react";

import './add-item.css'

export default class AddItem extends Component {


    render() {
        return(
            <div className="add-item">
                <button className="btn btn-outline-secondary"
                        onClick={ () => this.props.addItem('Hello world') }>
                    Add Item
                </button>
            </div>
        )
    }
};
