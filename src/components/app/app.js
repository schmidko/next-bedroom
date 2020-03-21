import {hot} from 'react-hot-loader/root';
import React from 'react';
import {Router, Route, Redirect} from 'react-router';
import './app.scss';
import history from '../../history';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Capacity from '../capacity/capacity';
import Theme from '../app_theme/app_theme';

const Axios = require('axios');

/**
 * App
 */
class App extends React.Component {

    state = {
        loading: false,
        isOpen: false
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
     * handleOpen
     */
    handleOpen = () => {
        this.setState({isOpen: true});
    }
    /**
     * handleClose
     */
    handleClose = () => {
        this.setState({isOpen: false});
    }
    /**
     * @return {null|*}
     */
    render() {
        if (this.state.loading === true) {
            return null;
        }

        return (
            <Theme>
                <div>
                    Hello World!!!
                    &nbsp;<Fab size="small" variant="round" color="primary" onClick={this.handleOpen}>
                        <AddIcon  />
                    </Fab>
                    {this.state.isOpen && <Capacity isOpen={this.state.isOpen} handleClose={this.handleClose}/>}
                </div>
            </Theme>
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

