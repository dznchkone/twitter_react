import React, {Component} from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import './app.css';

export default class App  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label : "React", important: true, id: 'qweasdzx'},
                {label : "Going to learn React", important: true, id: 'rtyfghvb'},
                {label : "That is so good", important: false, id: 'uiojklnm'},
                {label : "I need a break...", important: false, id: 'qazwsxed'}
            ]
        }

        this.generateId = this.generateId.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);

    }

    generateId() {
        let id = ''
        for (let i = 0; i < 8; i++) {
            id += String.fromCharCode(Math.floor(Math.random() * 25 + 97))
        }
        return id;
    }

    deleteItem (id) {
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0,index), ...data.slice(index+1)];
            return {
                data: newArr
            }
        });
    }

    addItem (body) {
        const newItem = {
                label: body,
                important: false,
                id: this.generateId()
            }


        this.setState(({data})=>{
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList posts={this.state.data}
                onDelete={this.deleteItem}/>
                <PostAddForm
                onAdd={this.addItem}/>
            </div>
        )}
}
