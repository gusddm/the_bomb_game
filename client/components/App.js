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
                <Link to="/">Bomb Game</Link>
                { React.cloneElement(this.props.children, this.props) }
            </div>    
        );
    }
};

const mapStateToProps = (state) => {
    return {
        bins : state.bins,
        bombs: state.bombs,
        liveBombs: state.liveBombs,
        binTimer: state.binTimer,
        bombTimer: state.bombTimer
    };
  }

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
  