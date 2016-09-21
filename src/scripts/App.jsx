import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';
import api from '../scripts/utils/api';


let App = React.createClass({


    render() {

        return (
            <div>
               <Link to="/lists">Lists</Link>
            </div>
        );
    },


});



export default App;
