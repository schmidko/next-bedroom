import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import './info_box.scss';
import history from '../../history';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Button, Typography} from '@material-ui/core';

const Axios = require('axios');

/**
 * App
 */
class InfoBox extends React.Component {

    state = {
        loading: false
    };

    /**
     * lifecycle hook
     */
    componentDidMount() {
        //this.loadUserObject();

        
    }

    /**
     * @return {null|*}
     */
    render() {
        if (this.state.loading === true) {
            return null;
        }


        return (
            <div className="ib--main">
                <Typography className="title" variant="h6" gutterBottom>Bed Capacity</Typography>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_object: state.user_object
    };
};

export default hot(connect(mapStateToProps)(InfoBox));

InfoBox.propTypes = {
    dispatch: PropTypes.func,
    user_object: PropTypes.object
};

