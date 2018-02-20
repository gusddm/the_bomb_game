import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import { Link } from 'react-router';

class App extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <Link to="/">Circle Game</Link>
                { React.cloneElement(this.props.children, this.props) }
            </div>    
        );
    }
};

const mapStateToProps = (state) => {
    return {
        bins : state.bins,
        bombs: state.bombs,
        circles: state.circles
    };
  }

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
  