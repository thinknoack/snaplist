import React from 'react';
import { Link, hashHistory } from 'react-router';
import { version } from '../../package.json';
import ClickToEdit from './click-to-edit.jsx';
import Filter from 'bad-words';
import api from '../scripts/utils/api';

let filter = new Filter();

let Snaps = React.createClass({

    getInitialState() {
        return {
            contacts: [],
            snaps: [],
            loadingText: 'Loading Snaps',
            newSnap: '',
            parent: {}
        };
    },

    componentWillMount() {
        this.getSnaps();
    },

    render() {

        let loadingGif = (
            <div className="loader">
                <span>{'{'}</span> {this.state.loadingText} <span>{'}'}</span>
            </div>
        );

        let snapLists = (
            <ul className="snaps-list">{this._listSnaps(this.state.snaps)}</ul>
        );

        return (
            <div className="snap-wrap">
                <div className="container">
                    <form onSubmit={this.addSnap} className="add-snap">
                        <input
                        type="text"
                        placeholder="create a snap"
                        value={this.state.newSnap}
                        onChange={this.handleSnapChange}
                        />
                        <input type="submit" value="Add" className="btn btn-submit" />
                    </form>
                    {this.state.snaps.length == 0 ? loadingGif : snapLists}
                </div>
                <div className="frosted">
                    <div onClick={hashHistory.goBack} className="btn-back">Back to all lists</div>
                    <h1 className="heading">Snaplist : {this.state.parent.snapListName}</h1>
                </div>
            </div>
        );
    },


// template methods ---------------------------------------------------

    _listSnaps(snaps) {
        let snapsList = snaps.map((snaps) => {
            let snap = snaps.snap;
            let snap_id = snaps._id;
            return (
                <li className="animated bounceInDown snap-item" key={snap_id}>
                    <ClickToEdit
                        label='label'
                        onChange={this.editSnap.bind(this, snap_id)}
                        deleteThis={this.deleteSnap.bind(this, snap_id)}
                        type='string'
                        value={snap} />
                </li>
            );
        });
        snapsList.reverse();
        return snapsList;
    },

    getParent(parent_id){
        api.getParent(parent_id, (err, res) => {
            let newParent = res.body;
            this.setState({parent: newParent});
        });
    },
    getSnaps() {
        let list_id = this.props.params.id;
        api.getSnaps(list_id, (err, res) => {
            let newRes = res.body;
            this.setState({snaps: newRes, loadingText: 'Add Snaps Yo!'});
            this.getParent(list_id);
        });

    },



    handleSnapChange(e) {
        this.setState({newSnap: e.target.value});
    },

    addSnap(e){
        e.preventDefault();
        let newSnap;
        let parent_id = this.props.params.id;
        if(this.state.newSnap == ''){
            newSnap = {snap: 'new snap', parent_id: parent_id};
        }else{
            newSnap = {snap: filter.clean(this.state.newSnap), parent_id: parent_id}
        }
        api.addSnap(newSnap, (err, res) =>{
            if (res.status == 400){
               console.log("400");
            }else{
                this.getSnaps();
                this.setState({newSnap: ''});
            }
        });
    },

    editSnap(snap_id, e){
        //e.preventDefault();
        let newSnapEdit = {snap: filter.clean(e)}
        api.editSnap(newSnapEdit, snap_id, (err, res) =>{
                this.getSnaps();
        });
    },

    deleteSnap(snap_id, e){
        let self = this;
        e.preventDefault();
        let newSnapState = [];
        newSnapState = this.state.snaps.filter(function( obj ) {
            return obj._id !== snap_id;
        });
        self.setState({snaps: newSnapState});
        api.deleteSnap(snap_id, (err, res) =>{})
    }

});

export default Snaps;
