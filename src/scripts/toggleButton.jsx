import React         from 'react';

export default class toogleButton extends React.Component {

	constructor() {
        super();
        this.state = {
            showWarning: false
        };
    }

	render () {
		let type = this.props.toggleType;
		let blocktype = (
			<span className="animated fadeIn">
				<button onClick={this.toggleButton.bind(this)}>no </button>
				<button  onClick={this.props.action}> yes</button>
			</span>
		);

		if(type === 'edit'){
			return (
				<div>
					<span className="snap-item">{this.state.showWarning ? this.props.toggleBlock : this.props.initialBlock}</span>
					{this.state.showWarning ? blocktype : <span onClick={this.toggleButton.bind(this)}>{this.props.btnValue}</span>}
				</div>
			);
		}else{
			return (
				<div>
					<span className='delete-snap'>
						{this.state.showWarning ? blocktype : <span onClick={this.toggleButton.bind(this)}>{this.props.btnValue}</span>}
					</span>
				</div>
				);
		}
	}

	toggleButton(){
		this.setState({showWarning: !this.state.showWarning});
	}
 }