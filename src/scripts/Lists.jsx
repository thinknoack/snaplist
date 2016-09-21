import React from 'react';
import { Link, hashHistory } from 'react-router';
import { version } from '../../package.json';
import ClickToEdit from './click-to-edit.jsx';
import Filter from 'bad-words';
import api from '../scripts/utils/api';

let filter = new Filter();

let Lists = React.createClass({

    getInitialState() {
        return {
            contacts: [],
            lists: [],
            loadingText: 'Loading Snaps',
            newList: '',
        };
    },

    componentWillMount() {
        this.getLists();
    },

    render() {

        let loadingGif = (
            <div className="loader">
                <span>{'{'}</span> {this.state.loadingText} <span>{'}'}</span>
            </div>
        );

        let snapLists = (
            <ul className="snaps-list">{this._listSnaps(this.state.lists)}</ul>
        );

        return (
            <div className="snap-wrap">
                <div className="container">
                    <form onSubmit={this.addList} className="add-snap">
                        <input
                        type="text"
                        placeholder="create a list"
                        value={this.state.newList}
                        onChange={this.handleSnapChange}
                        />
                        <input type="submit" value="Add" className="btn btn-submit" />
                    </form>
                    {this.state.lists.length == 0 ? loadingGif : snapLists}
                </div>
                <div className="frosted">
                    <h1 className="heading">Snaplist</h1>
                </div>
            </div>
        );
    },


// template methods ---------------------------------------------------

    _listSnaps(lists) {
        let snapsList = lists.map((lists) => {
            let list_id = lists._id;
            let listName = lists.snapListName;
            return (
                <li className="animated bounceInDown list-item" key={list_id}>
                    <ClickToEdit
                        label='label'
                        onChange={this.editList.bind(this, list_id)}
                        deleteThis={this.deleteList.bind(this, list_id)}
                        linkThis={this.linkThis.bind(this, list_id)}
                        type='string'
                        value={listName}
                     />
                </li>
            );
        });
        snapsList.reverse();
        return snapsList;
    },


    getLists() {
        api.getLists((err, res) => {
            let newRes = res.body;
            this.setState({lists: newRes, loadingText: 'Add Lists Yo!'});
        });
    },

    handleSnapChange(e) {
        this.setState({newList: e.target.value});
    },

    addList(e){
        e.preventDefault();
        let newList;
        if(this.state.newList == ''){
            newList = {snapListName: 'new list'};
        }else{
            newList = {snapListName: filter.clean(this.state.newList)}
        }
        api.addList(newList, (err, res) =>{
            if (res.status == 400){
               console.log("400");
            }else{
                this.getLists();
                this.setState({newList: ''});
            }
        });
    },

    editList(list_id, e){
        //e.preventDefault();
        let snapListName = {snapListName: filter.clean(e)}
        api.editList(snapListName, list_id, (err, res) =>{
                this.getLists();
        });
    },

    deleteList(list_id, e){
        let self = this;
        e.preventDefault();
        let newListState = [];
        newListState = this.state.lists.filter(function( obj ) {
            return obj._id !== list_id;
        });
        self.setState({lists: newListState});
        api.deleteList(list_id, (err, res) =>{})
    },

    linkThis(list_id, e){
        let self = this;
        e.preventDefault();
        hashHistory.push('/lists/'+list_id)

    }


});

export default Lists;
