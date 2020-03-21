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
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapboxgl from 'mapbox-gl';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {IconButton} from '@material-ui/core';


const Axios = require('axios');

mapboxgl.accessToken = 'pk.eyJ1Ijoic2NobWlka28iLCJhIjoiY2s4MWM2YjE3MG00dzNscnU2eW0zMGd0MyJ9.H2i8YL6U3FGHPfyaJCWyyQ';

/**
 * App
 */
class App extends React.Component {

    state = {
        loading: false,
        isOpen: false,
        lng: 13.2706,
        lat: 52.5223,
        zoom: 10,
        coords_bar: false
    };

    /**
     * lifecycle hook
     */
    componentDidMount() {
        //this.loadUserObject();

        const map = new mapboxgl.Map({ 
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
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

        let coords_bar = "";
        if (this.state.coords_bar) { 
            coords_bar = <div className='sidebarStyle'>
                <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
            </div>;
        }

        return (
            <Theme>
                <div>
                    {coords_bar}
                    <div ref={el => this.mapContainer = el} className='mapContainer' />
                    <InfoBox handleToggle={this.handleToggle} />
                    {this.state.isOpen ?
                        <SideBar isOpen={this.state.isOpen} handleClose={this.handleToggle}/> :
                        <div className={"app--switch"}>
                            <IconButton onClick={this.handleToggle}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                    }
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

