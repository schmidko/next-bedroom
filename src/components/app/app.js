import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import './app.scss';
import history from '../../history';
import InfoBox from '../info_box/info_box';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import SideBar from '../side_bar/side_bar';
import Theme from '../app_theme/app_theme';
import mapboxgl from 'mapbox-gl';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {IconButton} from '@material-ui/core';
import ReactMapGL, {Marker} from 'react-map-gl';
import {LocalHospital} from '@material-ui/icons';

const Axios = require('axios');
const accessToken = 'pk.eyJ1Ijoic2NobWlka28iLCJhIjoiY2s4MWM2YjE3MG00dzNscnU2eW0zMGd0MyJ9.H2i8YL6U3FGHPfyaJCWyyQ';

/**
 * App
 */
class App extends React.Component {

    state = {
        loading: false,
        isOpen: false,
        coords_bar: false,
        viewport: {
            latitude: 52.5223,
            longitude: 13.2706,
            zoom: 10,
            bearing: 0,
            pitch: 0
        }
    };

    /**
     * lifecycle hook
     */
    componentDidMount() {
        // this.loadUserObject();
        // style: 'mapbox://styles/mapbox/light-v10',
        // mapbox://styles/schmidko/ck81smuov26lq1ipejf1oizd3
        this.point_x = 52.476656;
        this.point_y = 13.511840;

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
     * handleToggle
     */
    handleToggle = () => {
        this.setState({isOpen: !this.state.isOpen});
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
                <div className="app--main">
                    <InfoBox handleToggle={this.handleToggle} />
                    {this.state.isOpen &&
                        <SideBar isOpen={this.state.isOpen} handleClose={this.handleToggle}/>
                    }
                    <ReactMapGL
                        className="app--map"
                        {...this.state.viewport}
                        width="100%"
                        height="100vh"
                        mapStyle="mapbox://styles/mapbox/light-v10"
                        onViewportChange={viewport => this.setState({viewport})}
                        mapboxApiAccessToken={accessToken}
                    >    
                        <Marker latitude={this.point_x} longitude={this.point_y} offsetLeft={-20} offsetTop={-10}>
                            <div
                                className="app--hospital-box"
                            >
                                <LocalHospital style={{color: "#4caf50"}} />
                                <div>202</div>
                            </div>
                        </Marker>
                    </ReactMapGL>
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

