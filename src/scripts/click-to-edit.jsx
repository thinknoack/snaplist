/*eslint react/no-danger: 0 */

// dependencies -------------------------------------------------------

import React          from 'react';

let ClickToEdit = React.createClass({

// life cycle events --------------------------------------------------

    getDefaultProps () {
        return {
            editable: true,
            type: 'string',
            value: ''
        };
    },

    getInitialState() {
        return {
            value: this.props.value,
            initialValue: JSON.stringify(this.props.value),
            loading: false,
            edit: false
        };
    },

    componentWillReceiveProps(nextProps) {
        // display edit when error is triggered
        if (nextProps.error) {
            this.setState({edit: true});
        } else {
            this.setState({value: nextProps.value});
        }
    },

    propTypes: {
        value: React.PropTypes.any,
        type: React.PropTypes.any,
        label: React.PropTypes.any,
        error: React.PropTypes.string,
        editable: React.PropTypes.bool,
        onDismissIssue: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onFileClick: React.PropTypes.func,
        onChange: React.PropTypes.func
    },

    render() {
        let type = this.props.type;
        let value = this.state.value
        let input = (
                <div className="animated fadeIn snap-input">
                    <input className="edit-snap" type="text" value={value} onChange={this._handleChange.bind(null, type)} />
                    <div className="btn-wrapper">
                        <button className="btn-save" onClick={this._save}>save</button>
                    </div>
                </div>
        );
        let valuewrap = <div className="snap-value" onClick={this.props.linkThis} >{value}</div>

        return (
            <div className="form-cte clearfix">
                {this.state.edit ? input : valuewrap}<div className="snap-toggle">{this._editBtn()}</div>
            </div>
        );
    },

// template methods ---------------------------------------------------


    _editBtn() {
        let edit = this.state.edit;
        if (this.props.editable) {
            return (
                <span>
                    <button onClick={this._toggleEdit} className="btn-toggle" >
                        <span>{edit ? 'Hide' : 'Edit'}</span>
                    </button>
                    <button className="btn-remove" onClick={this.props.deleteThis}> remove</button>
                </span>
            );
        }
    },



// custom methods -----------------------------------------------------

    _display() {
        this.setState({edit: false});
    },

    _toggleEdit() {
        this.setState({edit: !this.state.edit});
    },


    _handleChange(type, event) {
        this.setState({value: event.target.value}, () => {
        });
    },

    _handleDelete(filename, index) {
        if (this.props.onDelete) {
            this.props.onDelete(filename, index);
        }
    },

    _save(type) {
        let self = this;
        this.setState({loading: true});
        if (this.props.onChange) {
            this.props.onChange(this.state.value, () => {
                let initialValue = JSON.stringify(this.state.value);
                self.setState({loading: false, edit: edit, initialValue: initialValue});
            });
        }
        this._toggleEdit();
    },

    _cancel() {
        let value = JSON.parse(this.state.initialValue);
        this.setState({edit: false, value: value});
    }

});

export default ClickToEdit;