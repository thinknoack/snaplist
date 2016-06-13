import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';
import kegbot from '../scripts/utils/kegbot';

let App = React.createClass({

    getInitialState() {
        return {
            taps: {
                objects: []
            }
        };
    },

    componentWillMount() {
        this.getTaps();
    },

    render() {
        return (
            <div>
                <h1 className="heading">Sippr</h1>
                <ul className="kegs-list">{this._listTaps(this.state.taps.objects)}</ul>
                <img className="logo" src="../dist/images/sippr-logo.png" />
            </div>
        );
    },


// template methods ---------------------------------------------------

    _listTaps(taps) {

        let tapsList = taps.map((taps) => {
            let keg = taps.current_keg;
            let percentFull = Math.round(keg.percent_full);
            let pct = (percentFull/100) * 630;
            let kegStyle = {strokeDashoffset: pct};

            return (
                <li className="keg pouring" key={taps.id} id={'keg'+taps.id}>
                    <ul className="progress">
                        <li data-name={keg.type.name} data-percent={percentFull}>
							<svg viewBox="-10 -10 220 220">
								<g fill="none" strokeWidth="9" transform="translate(100,100)">
									<path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)"/>
									<path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)"/>
									<path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)"/>
									<path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)"/>
									<path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)"/>
									<path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)"/>
								</g>
                            </svg>
                            <svg viewBox="-10 -10 220 220">
                                <path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" strokeDashoffset="0" style={kegStyle}></path>
                            </svg>
                        </li>
                    </ul>
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="cl1" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1">
                                <stop stopColor="#618099"/>
                                <stop offset="100%" stopColor="#8e6677"/>
                            </linearGradient>
                            <linearGradient id="cl2" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1">
                                <stop stopColor="#8e6677"/>
                                <stop offset="100%" stopColor="#9b5e67"/>
                            </linearGradient>
                            <linearGradient id="cl3" gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="1">
                                <stop stopColor="#9b5e67"/>
                                <stop offset="100%" stopColor="#9c787a"/>
                            </linearGradient>
                            <linearGradient id="cl4" gradientUnits="objectBoundingBox" x1="1" y1="1" x2="0" y2="0">
                                <stop stopColor="#9c787a"/>
                                <stop offset="100%" stopColor="#817a94"/>
                            </linearGradient>
                            <linearGradient id="cl5" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0">
                                <stop stopColor="#817a94"/>
                                <stop offset="100%" stopColor="#498a98"/>
                            </linearGradient>
                            <linearGradient id="cl6" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="1" y2="0">
                                <stop stopColor="#498a98"/>
                                <stop offset="100%" stopColor="#618099"/>
                            </linearGradient>
                        </defs>
                    </svg>
 					<div className="pouring-display"></div>
                     <div className="keg-info">
                     	<div className="percent-full">{percentFull + '%'}</div>
                    	{keg.type.name}
                    	<span className="tap-number">{'Tap '+ taps.id}</span>
                    </div>
                    <span></span>
                </li>
            );
        });

        return tapsList;
    },

    getTaps() {
        kegbot.getTaps((err, res) => {this.setState({taps: res.body});});

        //testData
        let fakeTAPS = {
            objects: [
	            {
	                meter_name: "kegboard.flow0",
	                name: "Main Tap",
	                ml_per_tick: 0.185185185185185,
	                relay_name: "",
	                current_keg: {
	                    volume_ml_remain: 15109.900000000001,
	                    type_id: "1",
	                    url: "/kegs/9",
	                    spilled_ml: 0,
	                    start_time: "2015-06-26T20:32:49+00:00",
	                    percent_full: 25.752336217636806,
	                    size_id: 0,
	                    size_name: "half-barrel",
	                    end_time: "2015-06-26T20:32:49+00:00",
	                    online: true,
	                    type: {
	                        name: "Anchor Steam",
	                        style_id: "0",
	                        image: {
	                            url: "/media/CACHE/images/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0/c7a226b5122af9ea4c3b9d72cdc4c46d.jpg",
	                            thumbnail_url: "/media/CACHE/images/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0/704675543d5b73232c8a51f16435ea9d.jpg",
	                            original_url: "/media/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0.e",
	                            time: "2014-01-31T23:10:53+00:00"
	                        },
	                        abv: 0,
	                        brewer_id: "1",
	                        id: "1"
	                    },
	                    id: 9,
	                    size_volume_ml: 58673.9,
	                    size: {
	                        volume_ml: 58673.9,
	                        id: 0,
	                        name: "half-barrel"
	                    }
	                },
	                current_keg_id: 9,
	                id: 1
	            },
	            {
	                meter_name: "kegboard.flow0",
	                name: "Main Tap",
	                ml_per_tick: 0.185185185185185,
	                relay_name: "",
	                current_keg: {
	                    volume_ml_remain: 15109.900000000001,
	                    type_id: "1",
	                    url: "/kegs/9",
	                    spilled_ml: 0,
	                    start_time: "2015-06-26T20:32:49+00:00",
	                    percent_full: 67,
	                    size_id: 0,
	                    size_name: "half-barrel",
	                    end_time: "2015-06-26T20:32:49+00:00",
	                    online: false,
	                    type: {
	                        name: "TESTING",
	                        style_id: "0",
	                        image: {
	                            url: "/media/CACHE/images/pics/20140131231053-5b277158667f4f34a63b6a4d627fbc02/50783fc343a86611edcea5ff3e196f8f.jpg",
	                            thumbnail_url: "/media/CACHE/images/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0/704675543d5b73232c8a51f16435ea9d.jpg",
	                            original_url: "/media/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0.e",
	                            time: "2014-01-31T23:10:53+00:00"
	                        },
	                        abv: 0,
	                        brewer_id: "1",
	                        id: "1"
	                    },
	                    id: 9,
	                    size_volume_ml: 58673.9,
	                    size: {
	                        volume_ml: 58673.9,
	                        id: 0,
	                        name: "half-barrel"
	                    }
	                },
	                current_keg_id: 9,
	                id: 2
	            },
	            {
	                meter_name: "kegboard.flow1",
	                name: "Second Tap",
	                ml_per_tick: 0.185185185185185,
	                relay_name: "",
	                current_keg: {
	                    volume_ml_remain: 24271.9,
	                    type_id: "1",
	                    url: "/kegs/10",
	                    spilled_ml: 0,
	                    start_time: "2015-08-30T18:31:57+00:00",
	                    percent_full: 100,
	                    size_id: 0,
	                    size_name: "half-barrel",
	                    end_time: "2015-08-30T18:31:57+00:00",
	                    online: true,
	                    type: {
	                        name: "SomebeerSteam",
	                        style_id: "0",
	                        image: {
	                            url: "/media/CACHE/images/pics/20140131231053-e6ce61eda0a841edad856fe2679c8f90/0d8521a4eef37663218db5aef284089e.jpg",
	                            thumbnail_url: "/media/CACHE/images/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0/704675543d5b73232c8a51f16435ea9d.jpg",
	                            original_url: "/media/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0.e",
	                            time: "2014-01-31T23:10:53+00:00"
	                        },
	                        abv: 0,
	                        brewer_id: "1",
	                        id: "1"
	                    },
	                    id: 10,
	                    size_volume_ml: 58673.9,
	                    size: {
	                        volume_ml: 58673.9,
	                        id: 0,
	                        name: "half-barrel"
	                    }
	                },
	                current_keg_id: 10,
	                id: 3
	            },
	            {
	                meter_name: "kegboard.flow1",
	                name: "Second Tap",
	                ml_per_tick: 0.185185185185185,
	                relay_name: "",
	                current_keg: {
	                    volume_ml_remain: 24271.9,
	                    type_id: "1",
	                    url: "/kegs/10",
	                    spilled_ml: 0,
	                    start_time: "2015-08-30T18:31:57+00:00",
	                    percent_full: 50,
	                    size_id: 0,
	                    size_name: "half-barrel",
	                    end_time: "2015-08-30T18:31:57+00:00",
	                    online: true,
	                    type: {
	                        name: "SomebeerSteam",
	                        style_id: "0",
	                        image: {
	                            url: "/media/CACHE/images/pics/20140131231053-e6ce61eda0a841edad856fe2679c8f90/0d8521a4eef37663218db5aef284089e.jpg",
	                            thumbnail_url: "/media/CACHE/images/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0/704675543d5b73232c8a51f16435ea9d.jpg",
	                            original_url: "/media/pics/20140131231053-a36a6b7cd54d461c97c63339c6762bf0.e",
	                            time: "2014-01-31T23:10:53+00:00"
	                        },
	                        abv: 0,
	                        brewer_id: "1",
	                        id: "1"
	                    },
	                    id: 10,
	                    size_volume_ml: 58673.9,
	                    size: {
	                        volume_ml: 58673.9,
	                        id: 0,
	                        name: "half-barrel"
	                    }
	                },
	                current_keg_id: 10,
	                id: 4
	            }
            ],
            meta: {
                result: "ok"
            }
        }
        this.setState({taps: fakeTAPS});
    },

});



export default App;
