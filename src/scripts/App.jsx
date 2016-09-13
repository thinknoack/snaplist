import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';
import Filter from 'bad-words';
import api from '../scripts/utils/api';

let filter = new Filter();

let App = React.createClass({

    getInitialState() {
        return {
            contacts: [],
            snaps: [],
            loadingText: 'Loading Snaps',
            newSnap: '',
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
                    <form onSubmit={this.addSnap}>
                        <input
                          type="text"
                          placeholder="Say something..."
                          value={this.state.newSnap}
                          onChange={this.handleSnapChange}
                          className="add-snap"
                        />
                        <input type="submit" value="Post" className="btn btn-submit" />
                    </form>
                    {this.state.snaps.length == 0 ? loadingGif : snapLists}
                </div>
                <div className="frosted">
                    <h1 className="heading">Snaplist</h1>
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
                <li className="bounceInDown animated" key={snap_id}><span className="snap-item">{snap}</span><span className="delete-snap"><span onClick={this.removeSnap.bind(this, snap_id)}>x</span></span></li>
            );
        }, this);
        snapsList.reverse();
        return snapsList;
    },


// request methods
    getSnaps() {
        api.getSnaps((err, res) => {
            let i = 0;
            let newRes;
            if(res.body.length > 50){
                newRes = res.body.slice(0, 50);
            }else{
                newRes = res.body;
            }
            this.setState({snaps: newRes, loadingText: 'Add Snaps Yo!'});
        });
    },

    handleSnapChange(e) {
        this.setState({newSnap: e.target.value});
    },

    addSnap(e){
        e.preventDefault();
        let newSnap = {snap: filter.clean(this.state.newSnap)}
        api.addSnap(newSnap, (err, res) =>{
            if (res.statusCode == 400){
                //do stuff
            }else{
                this.getSnaps();
                this.setState({newSnap: ''});
            }
        });
    },

    removeSnap(snapId, e){
        e.preventDefault();
        //console.log(id);
        let newSnapState = [];
        newSnapState = this.state.snaps.filter(function( obj ) {
            return obj._id !== snapId;
        });
        this.setState({snaps: newSnapState});

        api.removeSnap(snapId, (err, res) =>{});
    }

});



export default App;
