import React, { Component } from 'react';

import TodoList from "../todo-list";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item/add-item";

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {

        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            // const before = todoData.slice(0, idx);
            // const after = todoData.slice(idx + 1);
            //
            // const newArray = [ ...before, ...after ];

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newArray
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        //add element in array
        this.setState(({ todoData }) => {
            const newArr = [ ...todoData, newItem ];

            return{
                todoData: newArr
            }
        })
    };

    toggleProperty(arr, id, propName) {
            const idx = arr.findIndex((el) => el.id === id);

            // 1. update object
            const oldItem = arr[idx];
            const newItem = { ...oldItem, [propName]: !oldItem[propName] };

            // 2. construct new array
        return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ]
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    render() {
        const { todoData } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>

                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <AddItem addItem={this.addItem}/>
            </div>
        )
    }
}
