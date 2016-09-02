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
            newSnapClass: '',
            blacklisted: false
        };
    },

    componentWillMount() {
        this.getSnaps();
    },

    render() {
        return (
            <div className="container">
                <h1 className="heading">Sippr</h1>
                <img className="logo" src="/snapstuff/images/sippr-logo.png" />
                <form onSubmit={this.addSnap}>
                    <input
                      type="text"
                      placeholder="Say something..."
                      value={this.state.newSnap}
                      onChange={this.handleSnapChange}
                    />
                    <input type="submit" value="Post" />
                </form>
                {this.state.snaps.length == 0 ? 'loading' :<ul className="kegs-list">{this._listSnaps(this.state.snaps)}</ul>}
            </div>
        );
    },


// template methods ---------------------------------------------------

    _listSnaps(snaps) {
        let snapsList = snaps.map((snaps) => {
            let snap = snaps.snap;
            let newSnapClass = this.props.newSnapClass;
            return (
                <li className="flipInX animated" key={snaps._id}>{snap}</li>
            );
        });
        snapsList.reverse();
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
        let newSnap = {snap: filter.clean(this.state.newSnap)}
        api.addSnap(newSnap, (err, res) =>{
            this.getSnaps();
            this.setState({newSnap: ''});
        });
    }

});



export default App;
