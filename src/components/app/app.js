import {hot} from 'react-hot-loader/root';
import React from 'react';
import {Router, Route, Redirect} from 'react-router';
import './app.scss';
import history from '../../history';
import InfoBox from '../info_box/info_box';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import SideBar from '../side_bar/side_bar';
import Theme from '../app_theme/app_theme';
import mapboxgl from 'mapbox-gl';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {IconButton} from '@material-ui/core';
import ReactMapGL, {Marker} from 'react-map-gl';
import {LocalHospital} from '@material-ui/icons';
import Impressum from "../impressum/impressum";
import HospitalMarker from "../hospital_marker/hospital_marker";

const Axios = require('axios');
const accessToken = 'pk.eyJ1Ijoic2NobWlka28iLCJhIjoiY2s4MWM2YjE3MG00dzNscnU2eW0zMGd0MyJ9.H2i8YL6U3FGHPfyaJCWyyQ';

/**
 * App
 */
class App extends React.PureComponent {

    state = {
        loading: true,
        isOpen: false,
        coords_bar: false,
        is_impressum_open: false,
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
        this.loadHospitals();
        // style: 'mapbox://styles/mapbox/light-v10',
        // mapbox://styles/schmidko/ck81smuov26lq1ipejf1oizd3
        this.point_x = 52.476656;
        this.point_y = 13.511840;

    }

    /**
     * load user object from backend
     * @return {array}
     */
    async loadHospitals() {
        const data = await Axios.get('/api/all-hospitals');
        const hospitals = data.data.hospitals;
        console.log(hospitals);
        
        this.setState({loading: false, hospitals: hospitals});
    }

    /**
     * handleToggle
     */
    handleToggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }
    
    handleImpressumOpen = () => {
        console.log('juu');
        
        this.setState({is_impressum_open: !this.state.is_impressum_open});
    }

    /**
     * @return {null|*}
     */
    render() {
        if (this.state.loading === true) {
            return null;
        }

        let hospitals = this.state.hospitals;

        return (
            <Theme>
                <div className="app--main">
                    <InfoBox 
                        handleToggle={this.handleToggle}
                        handleImpressumOpen={this.handleImpressumOpen}
                        hospitals={this.state.hospitals}
                    />
                    {this.state.isOpen ?
                        <SideBar isOpen={this.state.isOpen} handleClose={this.handleToggle}/>:
                        <div className={"app--switch"}>
                            <IconButton onClick={this.handleToggle}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
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
                        <HospitalMarker hospitals={hospitals} />
                    </ReactMapGL>
                    <Impressum is_impressum_open={this.state.is_impressum_open} open={true} handleImpressumOpen={this.handleImpressumOpen} />
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

