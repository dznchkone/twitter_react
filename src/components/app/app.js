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
                {label : "Going to learn React", important: true, like: false, id: 'rtyfghvb'},
                {label : "That is so good", important: false,like: false, id: 'uiojklnm'},
                {label : "I need a break...", important: false, like: false, id: 'qazwsxed'}
            ],
            term:'',
            filter: 'all'
        }

        //TODO переделать на новый синтаксис class fields
        this.generateId = this.generateId.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

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

    toggleProperty (objArray, id, property) {
        const index = objArray.findIndex(elem => elem.id === id);
        const old = objArray[index];
        const newItem = {...old, [property]:!old[property]};
        return [...objArray.slice(0, index), newItem, ...objArray.slice(index + 1)];
    }

    onToggleImportant(id) {
        this.setState(({data})=>{
            const newArr = this.toggleProperty(data, id, 'important');
            return {
                data: newArr
            }
        });
    }


    onToggleLiked(id) {
        this.setState(({data})=>{
            const newArr = this.toggleProperty(data,id,'like')
            return {
                data: newArr
            }
        });
    }

    searchPost(items, term){
        if (term.length===0) {
            return items;
        }

        return items.filter(item => {
            return item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch(term){
        this.setState({term})
    }

    filterPost(items, filter){
        if (filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }

    onFilterSelect(filter){
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const  visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader liked={liked} allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                onAdd={this.addItem}/>
            </div>
        )}
}
