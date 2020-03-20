import {hot} from 'react-hot-loader/root';
import React from 'react';
import {Router, Route, Redirect} from 'react-router';
import './app.scss';
import history from '../../history';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

const Axios = require('axios');

/**
 * App
 */
class App extends React.Component {

    state = {
        loading: false,
    };

    /**
     * lifecycle hook
     */
    componentDidMount() {
        //this.loadUserObject();
    }

    /**
     * load user object from backend
     * @return {array}
     */
    async loadUserObject() {
        const data = await Axios.get('/auth/user_object');
        const user_object = data.data.user_object;
        
        this.props.dispatch(saveUserObject(user_object));
        this.setState({loading: false});
    }

    /**
     * @return {null|*}
     */
    render() {
        if (this.state.loading === true) {
            return null;
        }

        return (
            <div>
                Hello World!!!
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_object: state.user_object
    };
};

export default hot(connect(mapStateToProps)(App));

App.propTypes = {
    dispatch: PropTypes.func,
    user_object: PropTypes.object
};

