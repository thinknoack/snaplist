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
            newSnap: '',
            blacklisted: false
        };
    },

    componentWillMount() {
        this.getSnaps();
    },

    render() {

        let loadingGif = (
            <div className="loader">
                <span>{'{'}</span> LOADING <span>{'}'}</span>
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
                <li className="fadeInDown animated" key={snap_id}>{snap}<span onClick={this.removeSnap.bind(this, snap_id)}>xx</span></li>
            );
        }, this);
        snapsList.reverse();
        return snapsList;
    },

    getSnaps() {
        api.getSnaps((err, res) => {
            let i = 0;
            let newRes = [];
            while (i < 50) {
                let snapPop = res.body.pop()
                newRes.unshift(snapPop);
                i++;
            }
            this.setState({snaps: newRes});
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
