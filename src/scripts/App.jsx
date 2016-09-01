import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';
import api from '../scripts/utils/api';

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
        return (
            <div>
                <h1 className="heading">Sippr</h1>
                <img className="logo" src="../images/sippr-logo.png" />
                <form onSubmit={this.addSnap}>
                    <input
                      type="text"
                      placeholder="Say something..."
                      value={this.state.newSnap}
                      onChange={this.handleSnapChange}
                    />
                    <input type="submit" value="Post" />
                </form>
                <h1>{this.state.blacklisted ? 'this snap contains innapropriate content' : null}</h1>
                <ul className="kegs-list">{this._listSnaps(this.state.snaps)}</ul>
            </div>
        );
    },


// template methods ---------------------------------------------------

    _listSnaps(snaps) {
        let snapsList = snaps.map((snaps) => {
            let snap = snaps.snap;
            return (
                <li key={snaps._id}>{snap}</li>
            );
        });

        return snapsList;
    },

    getSnaps() {
        api.getSnaps((err, res) => {
            this.setState({snaps: res.body});
        });
    },

    handleSnapChange(e) {
        this.setState({newSnap: e.target.value});
    },
    addSnap(e){
        e.preventDefault();
        let newSnap = {snap: this.state.newSnap}
        api.addSnap(newSnap, (err, res) =>{
            this.getSnaps();
            this.setState({newSnap: ''});
        });
    }

});



export default App;
